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

const updateMetaTags = (newLocale) => {
  document.documentElement.lang = newLocale
  document.title = t('meta.title')
  const desc = t('meta.description')
  const keywords = t('meta.keywords')

  const metas = [
    { selector: 'meta[name="description"]', content: desc },
    { selector: 'meta[name="keywords"]', content: keywords },
    { selector: 'meta[property="og:title"]', content: t('meta.title') },
    { selector: 'meta[property="og:description"]', content: desc },
    { selector: 'meta[name="twitter:title"]', content: t('meta.title') },
    { selector: 'meta[name="twitter:description"]', content: desc }
  ]

  metas.forEach(meta => {
    const element = document.querySelector(meta.selector)
    if (element) {
      element.setAttribute('content', meta.content)
    }
  })

  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    const pathWithoutLocale = route.path.replace(/^\/[^/]+/, '')
    canonical.href = `${import.meta.env.VITE_APP_URL || 'https://david-liu.pages.dev'}${pathWithoutLocale || '/'}`
  }
}

watch(() => route.params.locale, (newLocale) => {
  if (newLocale && isLocale(newLocale)) {
    locale.value = newLocale
  }
})

watch(locale, updateMetaTags, { immediate: true })

onMounted(() => {
  const routeLocale = route.params.locale
  if (routeLocale && isLocale(routeLocale)) {
    locale.value = routeLocale
  }
})
</script>

<style>
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 10000;
  padding: 0.5rem 1rem;
  background: #059669;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  outline: none;
  transition: top 0.15s ease;
}

.skip-link:focus {
  top: 0;
}
</style>
