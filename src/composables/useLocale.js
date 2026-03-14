import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { locales, defaultLocale, isLocale } from '@/router'

/**
 * Composable for handling locale changes with URL synchronization
 * @returns {Object} Locale management utilities
 */
export function useLocale() {
  const router = useRouter()
  const route = useRoute()
  const { locale } = useI18n()

  /**
   * Change locale and navigate to the same path with new locale
   * @param {string} langCode - Target locale code (e.g., 'zh-tw', 'en')
   */
  const changeLocale = (langCode) => {
    if (!isLocale(langCode)) {
      console.warn(`Invalid locale: ${langCode}`)
      return
    }

    const currentPath = route.path
    const newPath = currentPath.replace(/^\/[^/]+/, `/${langCode}`)
    router.push(newPath)
  }

  /**
   * Generate localized path for current locale
   * @param {string} path - Path without locale prefix
   * @returns {string} Path with current locale prefix
   */
  const localePath = (path) => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `/${locale.value}/${cleanPath}`
  }

  return {
    changeLocale,
    localePath,
    currentLocale: locale,
    locales,
    defaultLocale
  }
}
