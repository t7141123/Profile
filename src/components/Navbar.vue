<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container d-flex align-items-center justify-content-between">
      <!-- Brand -->
      <router-link class="navbar-brand" to="/" @click="closeMenu">
        <i class="bi bi-code-slash me-2"></i>David Liu
      </router-link>

      <!-- Desktop Menu -->
      <div class="d-none d-lg-flex align-items-center gap-4">
        <ul class="navbar-nav d-flex flex-row gap-4">
          <li class="nav-item">
            <router-link class="nav-link" to="/">{{ $t("nav.home") }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/services">{{
              $t("nav.services")
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/portfolio">{{
              $t("nav.portfolio")
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">{{
              $t("nav.about")
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">{{
              $t("nav.contact")
            }}</router-link>
          </li>
        </ul>
        <LanguageSwitcher />
      </div>

      <!-- Mobile Menu Toggle Button -->
      <button
        class="menu-toggle d-lg-none"
        :class="{ 'is-active': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Toggle navigation"
      >
        <div class="hamburger-box">
          <div class="hamburger-inner"></div>
        </div>
      </button>

      <!-- Mobile Menu Overlay -->
      <Transition name="fade">
        <div v-show="isMenuOpen" class="mobile-menu-overlay">
          <div class="mobile-menu-container">
            <ul class="mobile-nav-list">
              <li
                v-for="(item, index) in menuItems"
                :key="index"
                :class="{ 'slide-in': isMenuOpen }"
                :style="{ transitionDelay: `${index * 0.1}s` }"
              >
                <router-link
                  :to="item.path"
                  class="mobile-nav-link"
                  @click="closeMenu"
                >
                  {{ $t(item.label) }}
                </router-link>
              </li>
            </ul>

            <!-- Mobile Language Switcher -->
            <div
              class="mobile-lang-switcher"
              :class="{ 'slide-in': isMenuOpen }"
              :style="{ transitionDelay: '0.5s' }"
            >
              <span class="mobile-lang-label">Language</span>
              <div class="lang-options">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  class="lang-btn"
                  :class="{ active: locale === lang.code }"
                  @click="changeLanguage(lang.code)"
                >
                  {{ lang.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const isScrolled = ref(false);
const isMenuOpen = ref(false);
const route = useRoute();
const { locale } = useI18n();

const menuItems = [
  { path: "/", label: "nav.home" },
  { path: "/services", label: "nav.services" },
  { path: "/portfolio", label: "nav.portfolio" },
  { path: "/about", label: "nav.about" },
  { path: "/contact", label: "nav.contact" },
];

const languages = [
  { code: "zh-TW", name: "繁體" },
  { code: "zh-CN", name: "简体" },
  { code: "en", name: "EN" },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  updateBodyScroll();
};

const closeMenu = () => {
  isMenuOpen.value = false;
  updateBodyScroll();
};

const updateBodyScroll = () => {
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const changeLanguage = (langCode) => {
  locale.value = langCode;
  localStorage.setItem("locale", langCode);
};

// Route change closes menu
watch(
  () => route.path,
  () => {
    closeMenu();
  },
);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = ""; // Ensure scroll is restored
});
</script>

<style scoped>
/* Standard Navbar Styles */
.navbar {
  padding: 1.25rem 0;
  transition: all 0.4s ease;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.navbar.scrolled {
  padding: 0.75rem 0;
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.navbar-brand {
  font-weight: 800;
  font-size: 1.5rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1002; /* Above overlay */
}

/* Desktop Nav Link Styles */
.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-light);
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-gradient);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

/* =========================================
   Mobile Menu & Hamburger
   ========================================= */

/* Hamburger Button */
.menu-toggle {
  display: block;
  position: relative;
  z-index: 1002; /* Above overlay */
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 10px;
  margin-right: -10px;
}

.hamburger-box {
  width: 24px;
  height: 24px;
  display: inline-block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -1px;
}

.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 24px;
  height: 2px;
  background-color: var(--text-primary);
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}

.hamburger-inner::before,
.hamburger-inner::after {
  content: "";
  display: block;
}

.hamburger-inner::before {
  top: -8px;
}

.hamburger-inner::after {
  bottom: -8px;
}

/* Hamburger Animation */
.menu-toggle.is-active .hamburger-inner {
  transform: rotate(45deg);
}

.menu-toggle.is-active .hamburger-inner::before {
  top: 0;
  opacity: 0;
}

.menu-toggle.is-active .hamburger-inner::after {
  bottom: 0;
  transform: rotate(-90deg);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.mobile-menu-container {
  width: 100%;
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-nav-link {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  color: var(--primary-light);
  transform: scale(1.05);
}

/* Slide-in Animation for Items */
.mobile-nav-list li {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;
}

.mobile-nav-list li.slide-in {
  opacity: 1;
  transform: translateY(0);
}

/* Mobile Language Switcher */
.mobile-lang-switcher {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;
}

.mobile-lang-switcher.slide-in {
  opacity: 1;
  transform: translateY(0);
}

.mobile-lang-label {
  display: block;
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.lang-options {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.lang-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.lang-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Vue Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
