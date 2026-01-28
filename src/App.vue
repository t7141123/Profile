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
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const { t, locale } = useI18n()

// Watch for language changes and update SEO Meta Tags
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
</script>

<style>
/* Global styles are defined in main.css */
</style>
