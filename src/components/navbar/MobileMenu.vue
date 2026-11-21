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

        <!-- Mobile Language Switcher: one-tap segmented control (only three languages) -->
        <div
          class="mobile-lang-switcher"
          :class="{ 'slide-in': isOpen }"
          :style="{ transitionDelay: '0.5s' }"
        >
          <span id="mobile-lang-label" class="mobile-lang-label">
            <i class="bi bi-globe2" aria-hidden="true"></i>{{ $t("a11y.languageLabel") }}
          </span>
          <div class="lang-segment" role="group" aria-labelledby="mobile-lang-label">
            <button
              v-for="lang in languageOptions"
              :key="lang.code"
              type="button"
              class="lang-seg-btn"
              :class="{ active: currentLocale === lang.code }"
              :aria-pressed="currentLocale === lang.code"
              :lang="lang.code"
              @click="pick(lang.code)"
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
import { useRoute } from "vue-router";
import { useLocale } from "@/composables/useLocale";
import { languageOptions } from "@/config/languages";

const props = defineProps({
  isOpen: Boolean,
  menuItems: Array,
  languages: Array,
  currentLocale: String
});

const emit = defineEmits(['close', 'change-language']);

const pick = (code) => {
  if (code !== props.currentLocale) emit('change-language', code);
  else emit('close');
};

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
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;
}

.mobile-lang-switcher.slide-in {
  opacity: 1;
  transform: translateY(0);
}

.mobile-lang-label {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  margin-bottom: 0.85rem;
}

.lang-segment {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  max-width: 340px;
  margin: 0 auto;
  padding: 4px;
  background: rgba(255, 244, 224, 0.06);
  border: 1px solid rgba(233, 213, 172, 0.2);
  border-radius: 999px;
}

.lang-seg-btn {
  min-height: 44px;
  padding: 0.4rem 0.5rem;
  background: transparent;
  border: 0;
  border-radius: 999px;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease;
}

.lang-seg-btn:active {
  background: rgba(255, 244, 224, 0.08);
}

.lang-seg-btn.active {
  background: var(--primary-color);
  color: #fff;
}

.lang-seg-btn:focus-visible {
  outline: 2px solid var(--primary-light);
  outline-offset: 2px;
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
