import { ref, onMounted, watch, computed } from 'vue';

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'dark');
  let transitionTimer = null;

  const updateTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('theme', theme.value);
  };

  // Temporarily enable the smooth cross-fade transition during the switch
  const enableTransition = () => {
    document.documentElement.classList.add('theme-transition');
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 450);
  };

  const toggleTheme = () => {
    enableTransition();
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
