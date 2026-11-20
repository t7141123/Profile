// Blank-screen smoke test: serve the exported web build, open it in Chrome,
// and fail if the page throws or renders nothing.
// Usage: node scripts/smoke-web.mjs [distDir] [rootSelector]   (defaults: apps/mobile/dist, #root)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const distArg = process.argv[2];
const root = distArg
  ? fileURLToPath(new URL(distArg.replace(/\/?$/, '/'), pathToFileURL(process.cwd() + '/')))
  : fileURLToPath(new URL('../apps/mobile/dist/', import.meta.url));
const rootSelector = process.argv[3] ?? '#root';
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json', '.ttf': 'font/ttf', '.woff': 'font/woff',
};

const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = normalize(join(root, urlPath));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
  } catch {
    file = join(root, 'index.html'); // SPA fallback
  }
  try {
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

const errors = [];
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  await page.goto(base, { waitUntil: 'load' });
  // The app is a client-rendered SPA: wait until #root has visible text.
  await page.waitForFunction(
    (sel) => (document.querySelector(sel)?.innerText ?? '').trim().length > 0,
    rootSelector,
    { timeout: 20000 },
  ).catch(() => errors.push(`blank: ${rootSelector} stayed empty for 20s`));
  const text = (await page.locator(rootSelector).innerText().catch(() => '')).trim();
  if (/Something went wrong/.test(text)) errors.push(`error boundary shown: ${text.slice(0, 200)}`);
} catch (e) {
  errors.push(`smoke test could not run: ${e.message}`);
} finally {
  await browser?.close();
  server.close();
}

if (errors.length) {
  console.error('FAIL web smoke test:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log('ok: web build renders and has no uncaught errors');
