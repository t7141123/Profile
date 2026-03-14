<template>
  <div id="app">
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Navigation Bar -->
    <Navbar />

    <!-- Main Content -->
    <main id="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Back to Top Button -->
    <BackToTop />
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { isLocale } from './router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import BackToTop from './components/common/BackToTop.vue'

const { t, locale } = useI18n()
const route = useRoute()

// Function to update locale from route
const updateLocaleFromRoute = () => {
  const routeLocale = route.params.locale
  if (routeLocale && isLocale(routeLocale)) {
    locale.value = routeLocale
  }
}

// Update locale when route changes
watch(() => route.params.locale, () => {
  updateLocaleFromRoute()
})

// Update SEO Meta Tags and html lang when language changes
watch(locale, (newLocale) => {
  // Update html lang attribute for accessibility and SEO
  document.documentElement.lang = newLocale

  // Update Title
  document.title = t('meta.title')

  // Update generic meta
  const metas = [
    { selector: 'meta[name="description"]', content: t('meta.description') },
    { selector: 'meta[name="keywords"]', content: t('meta.keywords') },
    { selector: 'meta[property="og:title"]', content: t('meta.title') },
    { selector: 'meta[property="og:description"]', content: t('meta.description') },
    { selector: 'meta[name="twitter:title"]', content: t('meta.title') },
    { selector: 'meta[name="twitter:description"]', content: t('meta.description') }
  ]

  metas.forEach(meta => {
    const element = document.querySelector(meta.selector)
    if (element) {
      element.setAttribute('content', meta.content)
    }
  })

  // Update canonical URL (remove locale prefix for canonical)
  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    const pathWithoutLocale = route.path.replace(/^\/[^/]+/, '')
    canonical.href = `${import.meta.env.VITE_APP_URL || 'https://davidliu.studio'}${pathWithoutLocale || '/'}`
  }
}, { immediate: true })

// Initialize locale from route on mount
onMounted(() => {
  updateLocaleFromRoute()
})
</script>

<style>
/* Global styles are defined in main.css */

/* Skip Link for Accessibility */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-color);
  color: white;
  padding: 12px 24px;
  z-index: 9999;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0 0 var(--radius-md) 0;
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid var(--primary-light);
  outline-offset: 2px;
}
</style>
