import { createI18n } from 'vue-i18n'
import zhTW from './locales/zh-TW.json'
import zhCN from './locales/zh-CN.json'
import en from './locales/en.json'

// Default locale
const defaultLocale = 'zh-tw'

// Get stored locale from localStorage or default
const savedLocale = localStorage.getItem('locale') || defaultLocale

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: defaultLocale,
  messages: {
    'zh-tw': zhTW,
    'zh-cn': zhCN,
    'en': en
  }
})

export { defaultLocale }
export default i18n
