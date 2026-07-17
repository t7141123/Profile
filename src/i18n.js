import { createI18n } from 'vue-i18n'

const defaultLocale = 'zh-tw'
const savedLocale = localStorage.getItem('locale') || defaultLocale

const localeMap = {
  'zh-tw': () => import('./locales/zh-TW.json'),
  'zh-cn': () => import('./locales/zh-CN.json'),
  'en': () => import('./locales/en.json')
}

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: defaultLocale,
  messages: {}
})

function loadLocaleMessages(locale) {
  return localeMap[locale]().then(m => {
    i18n.global.setLocaleMessage(locale, m.default)
  })
}

loadLocaleMessages('zh-tw')

if (savedLocale !== 'zh-tw') {
  loadLocaleMessages(savedLocale)
}

export { defaultLocale, loadLocaleMessages }
export default i18n
