// Post-build prerender: render every route x locale in headless Chromium and
// write the resulting HTML into dist/, so crawlers (including AI crawlers that
// do not run JavaScript) receive full content, titles, hreflang and JSON-LD.
//
// Usage: npm run build && node scripts/prerender.mjs
import { createServer } from 'node:http'
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SITE = 'https://ark-studio.app'
const LOCALES = ['zh-tw', 'zh-cn', 'en']
const DEFAULT_LOCALE = 'zh-tw'
// '' = locale home page
const PAGES = [
  { slug: '', priority: '1.0', changefreq: 'weekly' },
  { slug: 'services', priority: '0.9', changefreq: 'monthly' },
  { slug: 'portfolio', priority: '0.9', changefreq: 'weekly' },
  { slug: 'about', priority: '0.7', changefreq: 'monthly' },
  { slug: 'contact', priority: '0.6', changefreq: 'monthly' }
]
const CONCURRENCY = 4

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml'
}

function findChromium() {
  if (process.env.PLAYWRIGHT_CHROMIUM_PATH) return process.env.PLAYWRIGHT_CHROMIUM_PATH
  const cache = join(homedir(), 'Library/Caches/ms-playwright')
  const linuxCache = join(homedir(), '.cache/ms-playwright')
  for (const base of [cache, linuxCache]) {
    if (!existsSync(base)) continue
    const dirs = execSync(`ls "${base}"`).toString().split('\n').filter(d => d.startsWith('chromium-')).sort().reverse()
    for (const d of dirs) {
      const candidates = [
        join(base, d, 'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'),
        join(base, d, 'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'),
        join(base, d, 'chrome-linux/chrome')
      ]
      const hit = candidates.find(existsSync)
      if (hit) return hit
    }
  }
  return undefined // fall back to playwright default lookup
}

// Static server: exact files only; anything else falls back to the SPA shell
function startServer(indexHtml) {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
    const file = join(DIST, urlPath)
    if (file.startsWith(DIST) && existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' })
      res.end(readFileSync(file))
      return
    }
    res.writeHead(200, { 'Content-Type': MIME['.html'] })
    res.end(indexHtml)
  })
  return new Promise(ok => server.listen(0, '127.0.0.1', () => ok(server)))
}

async function renderPage(browser, base, path) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'zh-TW' })
  const page = await context.newPage()
  // Block third-party requests (fonts, analytics) so the build is deterministic and offline-safe
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, route => route.abort())
  await page.addInitScript(() => {
    try { localStorage.setItem('theme', 'light') } catch { /* ignore */ }
  })
  await page.goto(`${base}${path}`, { waitUntil: 'load' })
  await page.waitForSelector('main#main-content h1', { timeout: 15000 })

  // Scroll through the page so scroll-triggered reveals and counters finish
  await page.evaluate(async () => {
    const step = Math.max(300, window.innerHeight * 0.8)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise(r => setTimeout(r, 120))
    }
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise(r => setTimeout(r, 1800))
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(300)

  // Strip runtime-only state so the snapshot is a clean first paint
  await page.evaluate(() => {
    document.getElementById('nprogress')?.remove()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('style')
    document.body.removeAttribute('style')
    document.body.removeAttribute('class')
    // v-reveal wraps every character in its own <span>; flatten so crawlers read plain text
    document.querySelectorAll('.reveal-word').forEach(el => el.replaceWith(document.createTextNode(el.textContent)))
    document.querySelectorAll('[data-reveal-ready]').forEach(el => {
      el.normalize()
      el.removeAttribute('data-reveal-ready')
      el.classList.remove('is-revealed')
    })
    const bar = document.getElementById('scroll-progress')
    if (bar) bar.removeAttribute('style')
  })

  // Asset URLs resolved by Vite carry the capture server origin; make them root-relative
  const html = (await page.content()).split(`${base}/`).join('/')
  const info = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelectorAll('main h1').length,
    text: (document.querySelector('main')?.innerText || '').length,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
    robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || ''
  }))
  await context.close()
  return { html, info }
}

function pageUrl(locale, slug) {
  return slug ? `/${locale}/${slug}` : `/${locale}/`
}

// zh-tw/ -> zh-tw/index.html ; zh-tw/about -> zh-tw/about.html (served at the extensionless URL)
function outFile(locale, slug) {
  return slug ? join(DIST, locale, `${slug}.html`) : join(DIST, locale, 'index.html')
}

function buildSitemap(lastmod) {
  const alt = slug => [
    ...LOCALES.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${pageUrl(l, slug)}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pageUrl(DEFAULT_LOCALE, slug)}" />`
  ].join('\n')
  const urls = []
  for (const p of PAGES) {
    for (const l of LOCALES) {
      urls.push(
        `  <url>\n    <loc>${SITE}${pageUrl(l, p.slug)}</loc>\n${alt(p.slug)}\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
      )
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
}

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) throw new Error('dist/index.html not found. Run `npm run build` first.')
  const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf8')
  const server = await startServer(indexHtml)
  const base = `http://127.0.0.1:${server.address().port}`
  const browser = await chromium.launch({ executablePath: findChromium() })

  const jobs = []
  for (const l of LOCALES) for (const p of PAGES) jobs.push({ locale: l, slug: p.slug, path: pageUrl(l, p.slug) })
  jobs.push({ notFound: true, path: `/${DEFAULT_LOCALE}/__not-found__` })

  const results = []
  const queue = [...jobs]
  const errors = []
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const job = queue.shift()
        try {
          const { html, info } = await renderPage(browser, base, job.path)
          const expected = job.notFound ? null : `${SITE}${job.path}`
          if (!job.notFound) {
            if (info.canonical !== expected) errors.push(`${job.path}: canonical "${info.canonical}" != "${expected}"`)
            if (info.h1 < 1) errors.push(`${job.path}: no <h1>`)
            if (info.text < 200) errors.push(`${job.path}: too little text (${info.text})`)
          } else if (!/noindex/.test(info.robots)) {
            errors.push(`404 page must be noindex (got "${info.robots}")`)
          }
          if (/https?:\/\/(127\.0\.0\.1|localhost)/.test(html)) errors.push(`${job.path}: snapshot contains a local server URL`)
          results.push({ job, html, info })
          console.log(`ok  ${job.path}  [${info.title.slice(0, 50)}]`)
        } catch (e) {
          errors.push(`${job.path}: ${e.message}`)
        }
      }
    })
  )
  await browser.close()
  server.close()

  if (errors.length) {
    console.error('\nPrerender failed:\n' + errors.map(e => ` - ${e}`).join('\n'))
    process.exit(1)
  }

  // Titles must be unique per page (duplicate titles are an SEO defect)
  const titles = new Map()
  for (const r of results.filter(r => !r.job.notFound)) {
    const dup = titles.get(r.info.title)
    if (dup) errors.push(`duplicate title "${r.info.title}": ${dup} and ${r.job.path}`)
    titles.set(r.info.title, r.job.path)
  }
  if (errors.length) {
    console.error('\nPrerender failed:\n' + errors.map(e => ` - ${e}`).join('\n'))
    process.exit(1)
  }

  // Write only after all pages are captured, so the capture server never saw them
  for (const { job, html } of results) {
    if (job.notFound) {
      await writeFile(join(DIST, '404.html'), html)
    } else {
      const file = outFile(job.locale, job.slug)
      await mkdir(dirname(file), { recursive: true })
      await writeFile(file, html)
      // Site root serves the default-locale home (crawler fallback; browsers get routed by the SPA)
      if (job.locale === DEFAULT_LOCALE && job.slug === '') await writeFile(join(DIST, 'index.html'), html)
    }
  }

  let lastmod = new Date().toISOString().slice(0, 10)
  try {
    lastmod = execSync('git log -1 --format=%cs -- src public index.html', { cwd: ROOT }).toString().trim() || lastmod
  } catch { /* not a git checkout */ }
  await writeFile(join(DIST, 'sitemap.xml'), buildSitemap(lastmod))

  console.log(`\nPrerendered ${results.length - 1} pages + 404.html + sitemap.xml (lastmod ${lastmod})`)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
