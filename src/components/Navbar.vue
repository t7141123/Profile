<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container d-flex align-items-center justify-content-between">
      <!-- Brand -->
      <router-link class="navbar-brand" :to="localePath('/')" @click="closeMenu">
        <i class="bi bi-code-slash me-2"></i>David Liu
      </router-link>

      <!-- Desktop Menu -->
      <div class="d-none d-lg-flex align-items-center gap-4">
        <ul class="navbar-nav d-flex flex-row gap-4">
          <li class="nav-item">
            <router-link class="nav-link" :to="localePath('/')">{{ $t("nav.home") }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="localePath('/services')">{{
              $t("nav.services")
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="localePath('/portfolio')">{{
              $t("nav.portfolio")
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="localePath('/about')">{{
              $t("nav.about")
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="localePath('/contact')">{{
              $t("nav.contact")
            }}</router-link>
          </li>
        </ul>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <!-- Mobile Menu Toggle Button -->
      <div class="d-flex d-lg-none align-items-center gap-3">
        <ThemeToggle />
        <button
          class="menu-toggle"
          :class="{ 'is-active': isMenuOpen }"
          @click="toggleMenu"
          aria-label="Toggle navigation"
        >
          <div class="hamburger-box">
            <div class="hamburger-inner"></div>
          </div>
        </button>
      </div>

      <!-- Mobile Menu Component -->
      <MobileMenu
        :is-open="isMenuOpen"
        :menu-items="menuItems"
        :languages="languages"
        :current-locale="currentLocale"
        @close="closeMenu"
        @change-language="changeLanguage"
      />
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useLocale } from "@/composables/useLocale";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import MobileMenu from "./navbar/MobileMenu.vue";
import ThemeToggle from "./common/ThemeToggle.vue";

const isScrolled = ref(false);
const isMenuOpen = ref(false);
const route = useRoute();
const { changeLocale, localePath, currentLocale } = useLocale();

const menuItems = [
  { path: "/", label: "nav.home" },
  { path: "/services", label: "nav.services" },
  { path: "/portfolio", label: "nav.portfolio" },
  { path: "/about", label: "nav.about" },
  { path: "/contact", label: "nav.contact" },
];

const languages = [
  { code: "zh-tw", name: "繁體" },
  { code: "zh-cn", name: "简体" },
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
  changeLocale(langCode);
  closeMenu();
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
/* =========================================
   Navbar Styles - Clean & Modern
   ========================================= */
.navbar {
  padding: 1rem 0;
  transition: all 0.4s ease;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.navbar.scrolled {
  padding: 0.75rem 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(37, 99, 235, 0.1);
  box-shadow: var(--shadow-soft);
}

[data-theme='dark'] .navbar.scrolled {
  background: rgba(15, 23, 42, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Ensure visibility when transparent over dark hero sections */
.navbar:not(.scrolled) .nav-link,
.navbar:not(.scrolled) .navbar-brand {
  color: #FFFFFF !important;
}

[data-theme='dark'] .navbar:not(.scrolled) .nav-link {
  color: var(--text-secondary) !important;
}

.navbar:not(.scrolled) .hamburger-inner,
.navbar:not(.scrolled) .hamburger-inner::before,
.navbar:not(.scrolled) .hamburger-inner::after {
  background-color: #FFFFFF;
}

[data-theme='dark'] .navbar:not(.scrolled) .hamburger-inner,
[data-theme='dark'] .navbar:not(.scrolled) .hamburger-inner::before,
[data-theme='dark'] .navbar:not(.scrolled) .hamburger-inner::after {
  background-color: var(--text-primary);
}

.navbar:not(.scrolled) :deep(.btn-language) {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
}

[data-theme='dark'] .navbar:not(.scrolled) :deep(.btn-language) {
  background: var(--bg-accent);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.navbar-brand {
  font-weight: 800;
  font-size: 1.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1002;
}

/* =========================================
   Desktop Nav Link Styles
   ========================================= */
@media (min-width: 992px) {
  .navbar-nav {
    gap: 1.5rem !important;
  }

  .nav-link {
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 1.05rem;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-link:hover {
    color: var(--primary-color);
    transform: translateY(-1px);
  }

  .nav-link.router-link-active {
    color: var(--primary-color);
    font-weight: 700;
  }

  .nav-link.router-link-active::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 3px;
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
    animation: expandLine 0.3s ease forwards;
  }

  @keyframes expandLine {
    from {
      width: 0;
      opacity: 0;
    }
    to {
      width: 20px;
      opacity: 1;
    }
  }
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
