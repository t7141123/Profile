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
          <label class="mobile-lang-label" for="mobile-lang-select">{{ $t("a11y.languageLabel") }}</label>
          <div class="lang-select-wrap">
            <select
              id="mobile-lang-select"
              class="lang-select"
              :value="currentLocale"
              @change="$emit('change-language', $event.target.value)"
            >
              <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                {{ lang.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useLocale } from "@/composables/useLocale";

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
  padding: calc(env(safe-area-inset-top, 0px) + 6rem) 1.5rem
    calc(env(safe-area-inset-bottom, 0px) + 2rem);
  overflow-y: auto; /* safety on short screens */
}

.mobile-menu-container {
  width: 100%;
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: auto; /* centers when there is room, never clips the top when tall */
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
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.lang-select-wrap {
  position: relative;
  max-width: 320px;
  margin: 0 auto;
}

.lang-select-wrap::after {
  content: "";
  position: absolute;
  right: 1.1rem;
  top: 50%;
  width: 0.55rem;
  height: 0.55rem;
  border-right: 2px solid var(--text-secondary);
  border-bottom: 2px solid var(--text-secondary);
  transform: translateY(-70%) rotate(45deg);
  pointer-events: none;
}

.lang-select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  min-height: 48px;
  padding: 0.6rem 2.6rem 0.6rem 1.1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem; /* 16px keeps iOS Safari from zooming on focus */
  text-align: center;
  text-align-last: center;
}

.lang-select:focus-visible {
  outline: 2px solid var(--primary-light);
  outline-offset: 2px;
}

.lang-select option {
  color: #1a140f;
  background: #fff;
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
  .mobile-menu-overlay {
    padding-top: calc(env(safe-area-inset-top, 0px) + 4.5rem);
  }
}

@media (max-width: 359.98px) {
  .mobile-nav-link {
    font-size: 1.6rem;
  }
}
</style>
