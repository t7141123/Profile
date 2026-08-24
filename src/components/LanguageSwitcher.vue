<template>
  <div class="language-switcher dropdown">
    <button
      class="btn btn-language dropdown-toggle"
      type="button"
      id="languageDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="lang-icon-wrap" aria-hidden="true">{{ currentFlag }}</span>
      <span class="lang-text">{{ currentLangName }}</span>
      <span class="lang-chevron"><i class="bi bi-chevron-down"></i></span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
      <li class="dropdown-header">
        <i class="bi bi-translate me-1"></i> Language
      </li>
      <li v-for="lang in languages" :key="lang.code">
        <a
          class="dropdown-item"
          :class="{ active: currentLocale === lang.code }"
          href="#"
          @click.prevent="changeLocale(lang.code)"
        >
          <span class="item-flag" aria-hidden="true">{{ lang.flag }}</span>
          <span class="item-name">{{ lang.name }}</span>
          <i v-if="currentLocale === lang.code" class="bi bi-check-lg item-check" aria-hidden="true"></i>
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
  { code: 'zh-tw', name: '繁體中文', flag: '🇹🇼' },
  { code: 'zh-cn', name: '简体中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' }
]

const currentLangName = computed(() => {
  const lang = languages.find(l => l.code === currentLocale.value)
  return lang ? lang.name : '繁體中文'
})

const currentFlag = computed(() => {
  const lang = languages.find(l => l.code === currentLocale.value)
  return lang ? lang.flag : '🌐'
})
</script>

<style scoped>
/* ── Button — pill with flag capsule ── */
.btn-language {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 4px 14px 4px 4px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: var(--shadow-sm);
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.btn-language:hover,
.btn-language:focus,
.show > .btn-language {
  background: var(--bg-secondary);
  border-color: rgba(37, 99, 235, 0.22);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-language:active {
  transform: scale(0.97) translateY(0);
}

.btn-language.dropdown-toggle::after {
  display: none;
}

.lang-icon-wrap {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 1;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
  flex-shrink: 0;
}

.lang-text {
  display: none;
}

@media (min-width: 768px) {
  .lang-text {
    display: inline;
  }
}

.lang-chevron {
  font-size: 11px;
  opacity: 0.45;
  display: flex;
  align-items: center;
  margin-left: 2px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
  color: var(--text-muted);
}

.show .lang-chevron {
  transform: rotate(180deg);
  opacity: 0.8;
}

/* ── Dropdown — premium card ── */
:deep(.dropdown-menu) {
  --dropdown-bg: rgba(255, 255, 255, 0.97);
  --dropdown-border: var(--border-color);
  --dropdown-shadow: var(--shadow-xl);
  --item-color: var(--text-secondary);
  --item-hover-bg: var(--bg-accent);
  --item-hover-color: var(--text-primary);
  --item-active-bg: var(--gradient-primary);
  --item-active-shadow: var(--shadow-md);
  --_thumb: rgba(15, 23, 42, 0.14);
  --_thumb-hover: rgba(37, 99, 235, 0.45);

  min-width: 210px;
  max-height: 340px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 6px;
  margin-top: 10px !important;
  background: var(--dropdown-bg);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid var(--dropdown-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--dropdown-shadow);
  scrollbar-width: thin;
  scrollbar-color: var(--_thumb) transparent;
  scrollbar-gutter: stable;
}

:global([data-theme='dark']) .language-switcher :deep(.dropdown-menu) {
  --dropdown-bg: rgba(30, 41, 59, 0.98);
  --dropdown-border: rgba(255, 255, 255, 0.08);
  --dropdown-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  --item-color: rgba(255, 255, 255, 0.72);
  --item-hover-bg: rgba(255, 255, 255, 0.07);
  --item-hover-color: #fff;
  --item-active-bg: var(--gradient-primary);
  --item-active-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
  --_thumb: rgba(255, 255, 255, 0.16);
  --_thumb-hover: rgba(59, 130, 246, 0.55);
}

:deep(.dropdown-menu::-webkit-scrollbar) {
  width: 5px;
}

:deep(.dropdown-menu::-webkit-scrollbar-track) {
  background: transparent;
  margin: 12px 0;
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

/* header */
:deep(.dropdown-header) {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 6px 10px 8px;
  margin-bottom: 4px;
  border-bottom: 1px solid var(--border-color);
}

:global([data-theme='dark']) .language-switcher :deep(.dropdown-header) {
  color: rgba(255, 255, 255, 0.4);
  border-bottom-color: rgba(255, 255, 255, 0.06);
}

/* items */
:deep(.dropdown-item) {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.65rem 0.85rem;
  border-radius: 12px;
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
  transform: translateX(2px);
}

:deep(.dropdown-item.active) {
  background: var(--item-active-bg);
  color: #fff;
  font-weight: 600;
  box-shadow: var(--item-active-shadow);
}

.item-flag {
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
  width: 22px;
  text-align: center;
}

.item-name {
  flex: 1;
}

.item-check {
  font-size: 14px;
  flex-shrink: 0;
  color: currentColor;
}
</style>
