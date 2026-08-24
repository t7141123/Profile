import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { locales } from '@/router'

const SITE_URL = 'https://ark-studio.app'
const SITE_NAME = 'Ark Studio'
const OG_IMAGE = `${SITE_URL}/og-image.png`
const OG_IMAGE_ALT = 'Ark Studio — 客製化軟體開發'

const ROUTE_META = {
  Home: { navKey: null, titleKey: 'meta.title', descKey: 'meta.description' },
  About: { navKey: 'nav.about', titleSuffix: true, descKey: 'about.pageDescription' },
  Portfolio: { navKey: 'nav.portfolio', titleSuffix: true, descKey: 'portfolio.pageDescription' },
  Services: { navKey: 'nav.services', titleSuffix: true, descKey: 'services.pageDescription' },
  Contact: { navKey: 'nav.contact', titleSuffix: true, descKey: 'contact.pageDescription' },
  NotFound: { title: 'Page Not Found | Ark Studio', desc: 'Page not found' }
}

function setMeta(selector, content) {
  if (!content) return
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    if (selector.includes('property')) {
      const prop = selector.match(/property="([^"]+)"/)?.[1]
      if (prop) el.setAttribute('property', prop)
    } else {
      const name = selector.match(/name="([^"]+)"/)?.[1]
      if (name) el.setAttribute('name', name)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href, hreflang) {
  const key = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let el = document.querySelector(key)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function removeHreflangs() {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => {
    // keep x-default? we recreate all each time
    el.remove()
  })
}

function ensureJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function useSeo() {
  const route = useRoute()
  const { t, locale } = useI18n()

  const update = () => {
    const routeName = route.name
    const path = route.path // e.g. /zh-tw/about
    const currentLocale = route.params.locale || locale.value
    const loc = locales.includes(currentLocale) ? currentLocale : 'zh-tw'

    // lang attr
    document.documentElement.lang = loc

    // title / description
    const cfg = ROUTE_META[routeName] || ROUTE_META.Home
    let title, description, keywords

    if (cfg.title) {
      title = cfg.title
    } else if (cfg.titleSuffix && cfg.navKey) {
      title = `${t(cfg.navKey)} | ${t('meta.title')}`
    } else {
      title = t(cfg.titleKey || 'meta.title')
    }

    if (cfg.desc) {
      description = cfg.desc
    } else {
      // try locale key, fallback to meta.description
      try {
        const d = t(cfg.descKey)
        description = d && d !== cfg.descKey ? d : t('meta.description')
      } catch {
        description = t('meta.description')
      }
    }

    try {
      keywords = t('meta.keywords')
    } catch {
      keywords = ''
    }

    document.title = title

    setMeta('meta[name="description"]', description)
    if (keywords) setMeta('meta[name="keywords"]', keywords)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)

    // canonical — keep locale prefix (SEO-friendly, matches actual URL)
    const canonicalUrl = `${SITE_URL}${path}`
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    setMeta('meta[property="og:url"]', canonicalUrl)

    // og:image stays site-wide, but ensure it exists
    setMeta('meta[property="og:image"]', OG_IMAGE)
    setMeta('meta[property="og:image:width"]', '1200')
    setMeta('meta[property="og:image:height"]', '630')
    setMeta('meta[property="og:image:alt"]', OG_IMAGE_ALT)
    setMeta('meta[property="og:site_name"]', SITE_NAME)
    setMeta('meta[property="og:type"]', 'website')
    setMeta('meta[property="og:locale"]', loc.replace('-', '_'))
    setMeta('meta[name="twitter:card"]', 'summary_large_image')
    setMeta('meta[name="twitter:image"]', OG_IMAGE)

    // hreflang — one per locale + x-default
    removeHreflangs()
    const basePath = path.replace(/^\/[^/]+/, '') || '/'
    // root "/" case: basePath "/" -> "/"
    locales.forEach(l => {
      const href = `${SITE_URL}/${l}${basePath === '/' ? '/' : basePath}`
      setLink('alternate', href, l)
    })
    setLink('alternate', `${SITE_URL}/zh-tw${basePath === '/' ? '/' : basePath}`, 'x-default')

    // JSON-LD Breadcrumb
    const segments = path.split('/').filter(Boolean) // ['zh-tw','about']
    const breadcrumbItems = [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${SITE_URL}/${loc}/` }
    ]
    if (segments.length > 1) {
      const pageKey = segments[1] // about, portfolio...
      const labelMap = { about: t('nav.about'), portfolio: t('nav.portfolio'), services: t('nav.services'), contact: t('nav.contact') }
      const label = labelMap[pageKey] || pageKey
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: label,
        item: canonicalUrl
      })
    }
    ensureJsonLd('jsonld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    })

    // FAQ JSON-LD on Services
    if (routeName === 'Services') {
      try {
        const faqs = []
        for (let i = 1; i <= 5; i++) {
          const q = t(`services.faqs.q${i}`)
          const a = t(`services.faqs.a${i}`)
          if (q && a && q !== `services.faqs.q${i}`) {
            faqs.push({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a }
            })
          }
        }
        if (faqs.length) {
          ensureJsonLd('jsonld-faq', {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs
          })
        }
      } catch {}
    } else {
      const el = document.getElementById('jsonld-faq')
      if (el) el.remove()
    }
  }

  watch(() => [route.path, route.name, locale.value], update, { immediate: true })

  return { update }
}
