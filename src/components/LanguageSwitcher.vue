<template>
  <div class="language-switcher dropdown">
    <button
      class="btn btn-language dropdown-toggle"
      type="button"
      id="languageDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="bi bi-globe2 me-1"></i>
      <span class="lang-text">{{ currentLangName }}</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
      <li v-for="lang in languages" :key="lang.code">
        <a
          class="dropdown-item"
          :class="{ active: locale === lang.code }"
          href="#"
          @click.prevent="changeLanguage(lang.code)"
        >
          {{ lang.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const languages = [
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'en', name: 'English' }
]

const currentLangName = computed(() => {
  const lang = languages.find(l => l.code === locale.value)
  return lang ? lang.name : '繁體中文'
})

const changeLanguage = (langCode) => {
  locale.value = langCode
  localStorage.setItem('locale', langCode)
}
</script>

<style scoped>
.btn-language {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-language:hover,
.btn-language:focus {
  background: rgba(99, 102, 241, 0.2);
  border-color: var(--primary-color);
  color: var(--primary-light);
}

.btn-language::after {
  margin-left: 0.5rem;
}

.dropdown-menu {
  background: rgba(30, 41, 59, 0.98);
  border: 1px solid var(--dark-border);
  border-radius: 12px;
  padding: 0.5rem;
  min-width: 160px;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.dropdown-item {
  color: var(--text-secondary);
  padding: 0.625rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-light);
}

.dropdown-item.active {
  background: rgba(99, 102, 241, 0.2);
  color: var(--primary-light);
}



.lang-text {
  display: none;
}

@media (min-width: 768px) {
  .lang-text {
    display: inline;
  }
}
</style>
