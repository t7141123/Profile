import { ref, onMounted, watch, computed } from 'vue';

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light');

  const updateTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('theme', theme.value);
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    updateTheme();
  };

  onMounted(() => {
    // Check for system preference if no saved theme
    if (!localStorage.getItem('theme')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.value = prefersDark ? 'dark' : 'light';
    }
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
