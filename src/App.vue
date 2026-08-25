<template>
  <div id="app">
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">{{ $t("a11y.skipToContent") }}</a>

    <!-- Scroll Progress Bar -->
    <div id="scroll-progress"></div>

    <!-- Cursor Glow -->
    <CursorGlow />

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
import { watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { isLocale } from './router'
import { useSeo } from './composables/useSeo'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import BackToTop from './components/common/BackToTop.vue'
import CursorGlow from './components/CursorGlow.vue'

const { locale } = useI18n()
const route = useRoute()

// dynamic SEO per route + locale (title, desc, hreflang, og, canonical, JSON-LD)
useSeo()

watch(() => route.params.locale, (newLocale) => {
  if (newLocale && isLocale(newLocale)) {
    locale.value = newLocale
  }
})

onMounted(() => {
  const routeLocale = route.params.locale
  if (routeLocale && isLocale(routeLocale)) {
    locale.value = routeLocale
  }

  /* Scroll Progress Bar */
  const bar = document.getElementById('scroll-progress')
  if (!bar) return
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight
    bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%'
  }
  window.addEventListener('scroll', update, { passive: true })
  update()

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })
})
</script>

<style>
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 10000;
  padding: 0.5rem 1rem;
  background: var(--primary-color);
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
