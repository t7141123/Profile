<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <div class="toggle-track">
      <div class="toggle-thumb" :class="{ 'is-dark': isDark }">
        <i v-if="isDark" class="bi bi-moon-stars-fill"></i>
        <i v-else class="bi bi-sun-fill"></i>
      </div>
    </div>
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

.toggle-track {
  width: 56px;
  height: 28px;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 50px;
  position: relative;
  transition: all 0.3s ease;
}

[data-theme='dark'] .toggle-track {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 2px 5px rgba(37, 99, 235, 0.3);
}

.toggle-thumb.is-dark {
  left: 30px;
  background: linear-gradient(135deg, #1E293B 0%, #334155 100%);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.theme-toggle:hover .toggle-track {
  border-color: var(--primary-color);
}
</style>
