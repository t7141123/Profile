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
          <span id="mobile-lang-label" class="mobile-lang-label">{{ $t("a11y.languageLabel") }}</span>
          <div ref="langRoot" class="lang-dropdown" :class="{ open: langOpen, 'open-up': openUp }">
            <button
              type="button"
              class="lang-trigger"
              aria-haspopup="listbox"
              aria-labelledby="mobile-lang-label"
              :aria-expanded="langOpen.toString()"
              @click="toggleLang"
              @keydown.esc.stop="langOpen = false"
            >
              <span>{{ currentName }}</span>
              <span class="lang-caret" aria-hidden="true"></span>
            </button>
            <ul
              v-show="langOpen"
              class="lang-list"
              :style="{ maxHeight: listMaxHeight + 'px' }"
              role="listbox"
              aria-labelledby="mobile-lang-label"
              @keydown.esc.stop="langOpen = false"
            >
              <li
                v-for="lang in languageOptions"
                :key="lang.code"
                role="option"
                :aria-selected="currentLocale === lang.code"
              >
                <button
                  type="button"
                  class="lang-item"
                  :class="{ active: currentLocale === lang.code }"
                  @click="pick(lang.code)"
                >
                  {{ lang.name }}
                  <i v-if="currentLocale === lang.code" class="bi bi-check-lg" aria-hidden="true"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
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

const langOpen = ref(false);
const openUp = ref(false);
const listMaxHeight = ref(260);
const langRoot = ref(null);

// Open the list on whichever side of the button has room (the button sits near the screen bottom)
const toggleLang = () => {
  if (langOpen.value) {
    langOpen.value = false;
    return;
  }
  const rect = langRoot.value.getBoundingClientRect();
  const viewH = window.visualViewport?.height ?? window.innerHeight;
  const below = viewH - rect.bottom - 24;
  const above = rect.top - 88; // keep clear of the top bar
  openUp.value = below < 220 && above > below;
  listMaxHeight.value = Math.max(140, Math.min(260, openUp.value ? above : below));
  langOpen.value = true;
};

const currentName = computed(
  () => languageOptions.find((l) => l.code === props.currentLocale)?.name ?? props.currentLocale
);

const pick = (code) => {
  langOpen.value = false;
  emit('change-language', code);
};

// Close the language list when tapping elsewhere or when the menu closes
const onOutside = (e) => {
  if (langOpen.value && langRoot.value && !langRoot.value.contains(e.target)) langOpen.value = false;
};
onMounted(() => document.addEventListener('pointerdown', onOutside));
onUnmounted(() => document.removeEventListener('pointerdown', onOutside));
watch(() => props.isOpen, (open) => { if (!open) langOpen.value = false; });

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

.lang-dropdown {
  position: relative;
  max-width: 320px;
  margin: 0 auto;
}

.lang-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: 48px;
  padding: 0.6rem 2.6rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.lang-trigger:focus-visible,
.lang-item:focus-visible {
  outline: 2px solid var(--primary-light);
  outline-offset: 2px;
}

.lang-dropdown.open .lang-trigger {
  border-color: var(--primary-light);
  background: rgba(255, 255, 255, 0.1);
}

.lang-caret {
  position: absolute;
  right: 1.1rem;
  top: 50%;
  width: 0.55rem;
  height: 0.55rem;
  border-right: 2px solid var(--text-secondary);
  border-bottom: 2px solid var(--text-secondary);
  transform: translateY(-70%) rotate(45deg);
  transition: transform 0.25s ease;
}

.lang-dropdown.open .lang-caret {
  transform: translateY(-30%) rotate(225deg);
}

.lang-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  z-index: 5;
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0.35rem;
  max-height: 260px;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: #231a14;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
}

.lang-dropdown.open-up .lang-list {
  top: auto;
  bottom: 100%;
  margin: 0 0 0.5rem;
}

.lang-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 44px;
  padding: 0.5rem 0.9rem;
  background: transparent;
  border: 0;
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 1rem;
  text-align: left;
}

.lang-item:active {
  background: rgba(255, 255, 255, 0.08);
}

.lang-item.active {
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
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
