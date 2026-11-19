// One-off helper: render public/favicon.svg onto a solid brand background and
// export PNG icons (apple-touch-icon 180x180, logo 512x512) for search engines.
// Usage: node scripts/make-icons.mjs
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { chromium } from 'playwright-core'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const svg = readFileSync(join(ROOT, 'public/favicon.svg'), 'utf8')
const cache = join(homedir(), 'Library/Caches/ms-playwright')
const dir = execSync(`ls "${cache}"`).toString().split('\n').filter(d => d.startsWith('chromium-')).sort().pop()
const exe = join(cache, dir, 'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing')

const browser = await chromium.launch({ executablePath: exe })
for (const [size, file] of [[180, 'apple-touch-icon.png'], [512, 'logo-512.png']]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } })
  const pad = Math.round(size * 0.14)
  await page.setContent(
    `<body style="margin:0;background:#191310;display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px">` +
      `<div style="width:${size - pad * 2}px">${svg.replace('<svg', '<svg style="width:100%;height:auto;display:block"')}</div></body>`
  )
  await page.screenshot({ path: join(ROOT, 'public', file) })
  await page.close()
}
await browser.close()
console.log('icons written')
