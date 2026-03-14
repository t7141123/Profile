<template>
  <div id="app">
    <!-- Navigation Bar -->
    <Navbar />

    <!-- Main Content -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { isLocale } from './router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

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

// Update SEO Meta Tags when language changes
watch(locale, () => {
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
}, { immediate: true })

// Initialize locale from route on mount
onMounted(() => {
  updateLocaleFromRoute()
})
</script>

<style>
/* Global styles are defined in main.css */
</style>
