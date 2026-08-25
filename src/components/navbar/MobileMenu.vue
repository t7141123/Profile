<template>
  <Transition name="fade">
    <div v-show="isOpen" class="mobile-menu-overlay">
      <div class="mobile-menu-container">
        <ul class="mobile-nav-list">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            :class="{ 'slide-in': isOpen }"
            :style="{ transitionDelay: `${index * 0.1}s` }"
          >
            <router-link
              :to="localePath(item.path)"
              class="mobile-nav-link"
              :aria-current="route.path === `/${currentLocale}${item.path}` ? 'page' : undefined"
              @click="$emit('close')"
            >
              {{ $t(item.label) }}
            </router-link>
          </li>
        </ul>

        <!-- Mobile Language Switcher -->
        <div
          class="mobile-lang-switcher"
          :class="{ 'slide-in': isOpen }"
          :style="{ transitionDelay: '0.5s' }"
        >
          <span class="mobile-lang-label">{{ $t("a11y.languageLabel") }}</span>
          <div class="lang-options">
            <button
              v-for="lang in languages"
              :key="lang.code"
              class="lang-btn"
              :class="{ active: currentLocale === lang.code }"
              @click="$emit('change-language', lang.code)"
            >
              {{ lang.name }}
            </button>
          </div>
        </div>

        <!-- Mobile Theme Switcher -->
        <div
          class="mobile-theme-switcher"
          :class="{ 'slide-in': isOpen }"
          :style="{ transitionDelay: '0.6s' }"
        >
          <span class="mobile-lang-label">{{ $t("a11y.themeLabel") }}</span>
          <div class="theme-options">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useLocale } from "@/composables/useLocale";
import ThemeToggle from "@/components/common/ThemeToggle.vue";

defineProps({
  isOpen: Boolean,
  menuItems: Array,
  languages: Array,
  currentLocale: String
});

defineEmits(['close', 'change-language']);

const route = useRoute();
const { localePath } = useLocale();
</script>

<style scoped>
/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh; /* handles mobile browser address bar */
  min-height: -webkit-fill-available;
  background: rgba(26, 20, 15, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  overflow-y: auto; /* safety on short screens */
}

.mobile-menu-container {
  width: 100%;
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem 0;
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
  min-height: 44px; /* comfortable touch target */
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
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
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 320px;
  margin: 0 auto;
}

.lang-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  padding: 0.5rem 0.9rem;
  border-radius: 50px;
  font-size: 0.8rem;
  min-height: 36px;
  min-width: 52px;
  transition: all 0.3s ease;
}

.lang-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Mobile Theme Switcher */
.mobile-theme-switcher {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.75rem;
  margin-top: 0.25rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;
}

.mobile-theme-switcher.slide-in {
  opacity: 1;
  transform: translateY(0);
}

.theme-options {
  display: flex;
  justify-content: center;
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

/* Compact layout on short / narrow screens */
@media (max-height: 600px) {
  .mobile-menu-container {
    gap: 1.5rem;
  }
  .mobile-nav-list {
    gap: 0.5rem;
  }
  .mobile-nav-link {
    font-size: 1.5rem;
    min-height: 38px;
  }
  .mobile-lang-switcher {
    padding-top: 1rem;
    margin-top: 0.5rem;
  }
}

@media (max-width: 359.98px) {
  .mobile-nav-link {
    font-size: 1.6rem;
  }
}
</style>
