import { createI18n } from 'vue-i18n'
import zhTW from './locales/zh-TW.json'
import zhCN from './locales/zh-CN.json'
import en from './locales/en.json'

// Default locale
const defaultLocale = 'zh-TW'

// Get stored locale from localStorage or default
const savedLocale = localStorage.getItem('locale') || defaultLocale

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: defaultLocale,
  messages: {
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    'en': en
  }
})

export { defaultLocale }
export default i18n
