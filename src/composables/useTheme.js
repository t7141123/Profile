import { ref, onMounted, watch, computed } from 'vue';

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'dark');

  const updateTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('theme', theme.value);
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    updateTheme();
  };

  onMounted(() => {
    updateTheme();
  });

  // Watch for changes (e.g. from other tabs)
  watch(theme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
  });

  return {
    theme,
    toggleTheme,
    isDark: computed(() => theme.value === 'dark')
  };
}
