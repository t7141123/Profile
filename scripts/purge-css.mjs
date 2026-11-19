// Post-build CSS purge: remove selectors that no class/id string in the built
// JS bundles or index.html can ever match (Bootstrap + bootstrap-icons ship ~90% unused).
// Dynamic classes are safe because every Vue template/class literal lives in the JS bundles.
// Runs between `vite build` and the prerender step.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PurgeCSS } from 'purgecss'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ASSETS = join(ROOT, 'dist/assets')
const cssFiles = readdirSync(ASSETS).filter(f => f.endsWith('.css')).map(f => join(ASSETS, f))
const jsFiles = readdirSync(ASSETS).filter(f => f.endsWith('.js')).map(f => join(ASSETS, f))

const result = await new PurgeCSS().purge({
  content: [join(ROOT, 'dist/index.html'), ...jsFiles],
  css: cssFiles,
  // Classes toggled by Bootstrap JS, vue-router and our directives at runtime
  safelist: {
    standard: [
      'show', 'showing', 'hide', 'hiding', 'active', 'disabled', 'collapse', 'collapsing', 'collapsed', 'fade',
      'open', 'dropup', 'dropdown-menu-end', 'modal-open', 'modal-backdrop', 'offcanvas-backdrop',
      'router-link-active', 'router-link-exact-active', 'nprogress-busy', 'dark', 'light'
    ],
    greedy: [/^variant-/, /^cta-/, /^is-/, /^has-/, /^v-/, /^page-/, /^bs-/, /^data-bs/, /^reveal/, /^inview/, /nprogress/, /^aria-/, /^tooltip/, /^popover/, /^toast/]
  },
  variables: false,
  keyframes: false,
  fontFace: false
})

let before = 0
let after = 0
for (const r of result) {
  before += readFileSync(r.file).length
  after += Buffer.byteLength(r.css)
  writeFileSync(r.file, r.css)
}
console.log(`purge-css: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB across ${result.length} files`)
