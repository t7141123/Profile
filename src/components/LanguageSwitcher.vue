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
          <span class="item-dot" aria-hidden="true"></span>
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
/* ── Button ── */
.btn-language {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px 0 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  box-shadow: var(--shadow-sm);
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.btn-language:hover,
.btn-language:focus,
.show > .btn-language {
  background: var(--bg-accent);
  border-color: rgba(37, 99, 235, 0.18);
  color: var(--text-primary);
  box-shadow: var(--shadow-md);
}

.btn-language:active {
  transform: scale(0.97);
}

.btn-language.dropdown-toggle::after {
  display: none;
}

.lang-icon {
  font-size: 13px;
  opacity: 0.7;
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

.lang-text {
  display: none;
}

@media (min-width: 768px) {
  .lang-text {
    display: inline;
  }
}

/* ── Dropdown — project glass card ── */
:deep(.dropdown-menu) {
  --dropdown-bg: rgba(255, 255, 255, 0.96);
  --dropdown-border: var(--border-color);
  --dropdown-shadow: var(--shadow-xl);
  --item-color: var(--text-secondary);
  --item-hover-bg: var(--bg-accent);
  --item-hover-color: var(--text-primary);
  --item-active-bg: rgba(37, 99, 235, 0.08);
  --item-active-color: var(--primary-color);
  --_thumb: rgba(15, 23, 42, 0.14);
  --_thumb-hover: rgba(37, 99, 235, 0.45);

  min-width: 184px;
  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 6px;
  margin-top: 8px !important;
  background: var(--dropdown-bg);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid var(--dropdown-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--dropdown-shadow);
  scrollbar-width: thin;
  scrollbar-color: var(--_thumb) transparent;
  scrollbar-gutter: stable;
}

/* dark theme overrides — keep dropdown premium dark */
:global([data-theme='dark']) .language-switcher :deep(.dropdown-menu) {
  --dropdown-bg: rgba(30, 41, 59, 0.98);
  --dropdown-border: rgba(255, 255, 255, 0.08);
  --dropdown-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  --item-color: rgba(255, 255, 255, 0.7);
  --item-hover-bg: rgba(255, 255, 255, 0.07);
  --item-hover-color: #fff;
  --item-active-bg: rgba(37, 99, 235, 0.18);
  --item-active-color: #93c5fd;
  --_thumb: rgba(255, 255, 255, 0.16);
  --_thumb-hover: rgba(59, 130, 246, 0.55);
}

:deep(.dropdown-menu::-webkit-scrollbar) {
  width: 4px;
}

:deep(.dropdown-menu::-webkit-scrollbar-track) {
  background: transparent;
  margin: 10px 0;
}

:deep(.dropdown-menu::-webkit-scrollbar-thumb) {
  background: var(--_thumb);
  border-radius: 999px;
  border: 1px solid transparent;
  background-clip: padding-box;
}

:deep(.dropdown-menu::-webkit-scrollbar-thumb:hover) {
  background: var(--_thumb-hover);
  background-clip: padding-box;
}

/* ── Items ── */
:deep(.dropdown-item) {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.6rem 0.85rem;
  border-radius: 10px;
  color: var(--item-color);
  transition: all 0.18s ease;
  margin-bottom: 2px;
  letter-spacing: 0.01em;
}

:deep(.dropdown-item:last-child) {
  margin-bottom: 0;
}

:deep(.dropdown-item:hover),
:deep(.dropdown-item:focus) {
  background: var(--item-hover-bg);
  color: var(--item-hover-color);
}

:deep(.dropdown-item.active) {
  background: var(--item-active-bg);
  color: var(--item-active-color);
  font-weight: 600;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.12) inset;
}

:global([data-theme='dark']) .language-switcher :deep(.dropdown-item.active) {
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.22) inset;
}

/* active dot */
.item-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--item-active-color);
  opacity: 0;
  transform: scale(0.6);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

:deep(.dropdown-item.active) .item-dot {
  opacity: 1;
  transform: scale(1);
}

:deep(.dropdown-item:not(.active)) .item-dot {
  background: transparent;
}
</style>
