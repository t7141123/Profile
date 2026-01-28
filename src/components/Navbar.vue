<template>
  <nav class="navbar navbar-expand-lg fixed-top" :class="{ scrolled: isScrolled }">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="bi bi-code-slash me-2"></i>David Liu
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto me-3">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/' }"
              to="/"
            >
              {{ $t('nav.home') }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/about' }"
              to="/about"
            >
              {{ $t('nav.about') }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/portfolio' }"
              to="/portfolio"
            >
              {{ $t('nav.portfolio') }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/services' }"
              to="/services"
            >
              {{ $t('nav.services') }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/contact' }"
              to="/contact"
            >
              {{ $t('nav.contact') }}
            </router-link>
          </li>
        </ul>
        <LanguageSwitcher />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

