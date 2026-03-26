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
  { code: 'en', name: 'English' }
]

const currentLangName = computed(() => {
  const lang = languages.find(l => l.code === currentLocale.value)
  return lang ? lang.name : '繁體中文'
})
</script>

<style scoped>
.btn-language {
  background: var(--bg-accent);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: var(--shadow-sm);
}

.btn-language:hover,
.btn-language:focus {
  background: var(--bg-secondary);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-language::after {
  margin-left: 0.5rem;
}

.dropdown-menu {
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(37, 99, 235, 0.1);
  border-radius: var(--radius-lg);
  padding: 0.5rem;
  min-width: 160px;
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-xl);
}

.dropdown-item {
  color: var(--text-secondary);
  padding: 0.625rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary-color);
}

.dropdown-item.active {
  background: rgba(37, 99, 235, 0.15);
  color: var(--primary-color);
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
