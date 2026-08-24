import { createI18n } from 'vue-i18n'
import zhTW from './locales/zh-TW.json'
import en from './locales/en.json'

const locales = ['zh-tw', 'zh-cn', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'vi', 'th']
const defaultLocale = 'zh-tw'

function detectBrowserLocale() {
  const raw = (navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || '']).map(l => l.toLowerCase())

  // helper: try to find exact or prefix match
  const tryMatch = (lang) => {
    if (locales.includes(lang)) return lang
    const base = lang.split('-')[0]
    if (locales.includes(base)) return base
    // zh special handling
    if (base === 'zh') {
      if (lang.includes('tw') || lang.includes('hk') || lang.includes('mo') || lang.includes('hant')) return 'zh-tw'
      if (lang.includes('cn') || lang.includes('sg') || lang.includes('hans')) return 'zh-cn'
      return 'zh-tw'
    }
    // pt variants
    if (base === 'pt') return 'pt'
    return null
  }

  for (const lang of raw) {
    const hit = tryMatch(lang)
    if (hit) return hit
  }
  return defaultLocale
}

const savedLocale = localStorage.getItem('locale')
const initialLocale = (savedLocale && locales.includes(savedLocale))
  ? savedLocale
  : detectBrowserLocale()

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: defaultLocale,
  messages: {
    'zh-tw': zhTW,
    'en': en
  }
})

const fileMap = {
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
  'en': 'en',
  'ja': 'ja',
  'ko': 'ko',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'pt': 'pt',
  'vi': 'vi',
  'th': 'th'
}

async function loadLocaleMessages(locale) {
  if (!locales.includes(locale)) return
  if (i18n.global.getLocaleMessage(locale) && Object.keys(i18n.global.getLocaleMessage(locale)).length > 0) return
  const file = fileMap[locale] || locale
  try {
    const m = await import(`./locales/${file}.json`)
    i18n.global.setLocaleMessage(locale, m.default)
  } catch (e) {
    console.warn(`Failed to load locale ${locale}`, e)
  }
}

// preload initial locale if not already bundled
if (initialLocale !== 'zh-tw' && initialLocale !== 'en') {
  loadLocaleMessages(initialLocale)
  // persist auto-detected locale so back button keeps it
  if (!savedLocale) localStorage.setItem('locale', initialLocale)
}

export { defaultLocale, locales, loadLocaleMessages }
export default i18n
