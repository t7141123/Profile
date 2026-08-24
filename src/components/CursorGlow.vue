<template>
  <div ref="glow" class="cursor-glow" aria-hidden="true"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const glow = ref(null)
let raf = 0
let tx = 0, ty = 0, cx = 0, cy = 0
let enabled = false

const onMove = (e) => {
  tx = e.clientX
  ty = e.clientY
}

const loop = () => {
  cx += (tx - cx) * 0.08
  cy += (ty - cy) * 0.08
  if (glow.value) {
    glow.value.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`
  }
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduce) return
  enabled = true
  window.addEventListener('mousemove', onMove, { passive: true })
  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  if (!enabled) return
  window.removeEventListener('mousemove', onMove)
  cancelAnimationFrame(raf)
})
</script>

<style scoped>
.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(
    closest-side,
    rgba(37, 99, 235, 0.09),
    rgba(59, 130, 246, 0.045) 45%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 3;
  mix-blend-mode: screen;
  will-change: transform;
}

:global([data-theme='light']) .cursor-glow {
  background: radial-gradient(
    closest-side,
    rgba(37, 99, 235, 0.07),
    rgba(59, 130, 246, 0.035) 45%,
    transparent 70%
  );
  mix-blend-mode: multiply;
}
</style>
