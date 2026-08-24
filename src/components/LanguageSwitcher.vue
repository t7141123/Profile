<template>
  <div class="language-switcher dropdown">
    <button
      class="btn btn-language dropdown-toggle"
      type="button"
      id="languageDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="lang-icon"><i class="bi bi-globe2"></i></span>
      <span class="lang-text">{{ currentLangName }}</span>
      <span class="lang-chevron"><i class="bi bi-chevron-down"></i></span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
      <li v-for="lang in languages" :key="lang.code">
        <a
          class="dropdown-item"
          :class="{ active: currentLocale === lang.code }"
          href="#"
          @click.prevent="changeLocale(lang.code)"
        >
          {{ lang.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { currentLocale, changeLocale } = useLocale()

const languages = [
  { code: 'zh-tw', name: '繁體中文' },
  { code: 'zh-cn', name: '简体中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'th', name: 'ไทย' }
]

const currentLangName = computed(() => {
  const lang = languages.find(l => l.code === currentLocale.value)
  return lang ? lang.name : '繁體中文'
})
</script>

<style scoped>
.btn-language {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px 0 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.btn-language:hover,
.btn-language:focus,
.show > .btn-language {
  background: var(--bg-accent);
  border-color: rgba(37, 99, 235, 0.18);
  color: var(--text-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.btn-language:active {
  transform: scale(0.97);
}

/* hide Bootstrap default caret */
.btn-language.dropdown-toggle::after {
  display: none;
}

.lang-icon {
  font-size: 13px;
  opacity: 0.65;
  display: flex;
  align-items: center;
}

.lang-chevron {
  font-size: 10px;
  opacity: 0.4;
  display: flex;
  align-items: center;
  margin-left: 1px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
}

.show .lang-chevron {
  transform: rotate(180deg);
  opacity: 0.7;
}

.btn-language:hover .lang-icon,
.show > .btn-language .lang-icon {
  opacity: 1;
}

.btn-language:hover .lang-chevron,
.show > .btn-language .lang-chevron {
  opacity: 0.7;
}

.lang-text {
  display: none;
}

@media (min-width: 768px) {
  .lang-text {
    display: inline;
  }
}

/* ── Premium dropdown ── */
:deep(.dropdown-menu) {
  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 176px;
  padding: 6px;
  background: rgba(30, 41, 59, 0.97);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  /* hide native scrollbar, show custom */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
  scrollbar-gutter: stable;
}

/* ── Custom scrollbar (WebKit) ── */
:deep(.dropdown-menu::-webkit-scrollbar) {
  width: 4px;
}

:deep(.dropdown-menu::-webkit-scrollbar-track) {
  background: transparent;
  margin: 10px 0;
}

:deep(.dropdown-menu::-webkit-scrollbar-thumb) {
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.55), rgba(59, 130, 246, 0.45));
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background-clip: padding-box;
}

:deep(.dropdown-menu::-webkit-scrollbar-thumb:hover) {
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.85), rgba(59, 130, 246, 0.75));
}

:deep(.dropdown-menu::-webkit-scrollbar-thumb:active) {
  background: #2563eb;
}

:deep(.dropdown-item) {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.6rem 0.85rem;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 2px;
}

:deep(.dropdown-item:last-child) {
  margin-bottom: 0;
}

:deep(.dropdown-item:hover),
:deep(.dropdown-item:focus) {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}

:deep(.dropdown-item.active) {
  background: rgba(37, 99, 235, 0.18);
  color: #93c5fd;
  font-weight: 600;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2) inset;
}

:deep(.dropdown-item.active:hover) {
  background: rgba(37, 99, 235, 0.28);
  color: #bfdbfe;
}
</style>
