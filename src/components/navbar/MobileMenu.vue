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
          <span class="mobile-lang-label">Language</span>
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
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useLocale } from "@/composables/useLocale";

defineProps({
  isOpen: Boolean,
  menuItems: Array,
  languages: Array,
  currentLocale: String
});

defineEmits(['close', 'change-language']);

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
