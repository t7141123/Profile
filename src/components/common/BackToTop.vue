<template>
  <button
    v-show="showButton"
    @click="scrollToTop"
    class="back-to-top"
    :aria-label="$t('a11y.backToTop')"
  >
    <svg class="progress-ring" viewBox="0 0 50 50" aria-hidden="true">
      <circle class="ring-track" cx="25" cy="25" r="22" />
      <circle
        class="ring-progress"
        cx="25"
        cy="25"
        r="22"
        :style="{ strokeDashoffset: ringOffset }"
      />
    </svg>
    <i class="bi bi-arrow-up"></i>
  </button>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)
const progress = ref(0)

const CIRCUMFERENCE = 2 * Math.PI * 22
const ringOffset = computed(
  () => CIRCUMFERENCE * (1 - progress.value)
)

const handleScroll = () => {
  const h = document.documentElement.scrollHeight - window.innerHeight
  showButton.value = window.scrollY > 500
  progress.value = h > 0 ? Math.min(window.scrollY / h, 1) : 0
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: var(--bg-secondary);
  border: none;
  border-radius: var(--radius-full);
  color: var(--primary-color);
  font-size: 1.15rem;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-to-top:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.back-to-top:active {
  transform: scale(0.95);
}

.progress-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  pointer-events: none;
}

.ring-track {
  fill: none;
  stroke: var(--border-color);
  stroke-width: 2.5;
}

.ring-progress {
  fill: none;
  stroke: var(--primary-color);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 138.23;
  transition: stroke-dashoffset 0.15s linear;
}

.back-to-top i {
  position: relative;
  z-index: 1;
}

@media (max-width: 575.98px) {
  .back-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 44px;
    height: 44px;
    font-size: 1rem;
  }
}
</style>
