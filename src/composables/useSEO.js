import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

/**
 * Composable for managing SEO meta tags
 * Automatically updates meta tags based on route and locale
 */
export function useSEO() {
  const route = useRoute()
  const { t } = useI18n()

  const updateMetaTags = () => {
    // Update title
    document.title = `${t('meta.title')} | David Liu Studio`

    // Update meta description
    updateMetaTag('name', 'description', t('meta.description'))

    // Update meta keywords
    updateMetaTag('name', 'keywords', t('meta.keywords'))

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', t('meta.title'))
    updateMetaTag('property', 'og:description', t('meta.description'))
    updateMetaTag('property', 'og:type', 'website')
    updateMetaTag('property', 'og:locale', route.params.locale || 'zh-TW')

    // Update Twitter cards
    updateMetaTag('name', 'twitter:title', t('meta.title'))
    updateMetaTag('name', 'twitter:description', t('meta.description'))
    updateMetaTag('name', 'twitter:card', 'summary_large_image')

    // Update canonical URL
    updateCanonical()

    // Update html lang attribute
    document.documentElement.lang = route.params.locale || 'zh-TW'
  }

  const updateMetaTag = (attrType, attrValue, content) => {
    const element = document.querySelector(`meta[${attrType}="${attrValue}"]`)
    if (element) {
      element.setAttribute('content', content)
    }
  }

  const updateCanonical = () => {
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      const pathWithoutLocale = route.path.replace(/^\/[^/]+/, '')
      const baseUrl = import.meta.env.VITE_APP_URL || 'https://davidliu.studio'
      canonical.href = `${baseUrl}${pathWithoutLocale || '/'}`
    }
  }

  // Watch for route changes and update meta tags
  watch(
    () => [route.path, route.params.locale],
    () => {
      updateMetaTags()
    },
    { immediate: true }
  )

  return {
    updateMetaTags
  }
}
