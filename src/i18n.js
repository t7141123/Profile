import { createI18n } from 'vue-i18n'
import zhTW from './locales/zh-TW.json'
import en from './locales/en.json'

const defaultLocale = 'zh-tw'
const savedLocale = localStorage.getItem('locale') || defaultLocale

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: defaultLocale,
  messages: {
    'zh-tw': zhTW,
    'en': en
  }
})

async function loadLocaleMessages(locale) {
  if (locale === 'zh-tw' || locale === 'en') return
  const m = await import('./locales/zh-CN.json')
  i18n.global.setLocaleMessage(locale, m.default)
}

if (savedLocale === 'zh-cn') {
  loadLocaleMessages(savedLocale)
}

export { defaultLocale, loadLocaleMessages }
export default i18n
