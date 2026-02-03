import { createI18n } from 'vue-i18n'
import zhTW from './locales/zh-TW.json'
import zhCN from './locales/zh-CN.json'
import en from './locales/en.json'

// Get stored locale from localStorage, default to Traditional Chinese
const savedLocale = localStorage.getItem('locale') || 'zh-TW'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'zh-TW',
  messages: {
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    'en': en
  }
})

export default i18n
