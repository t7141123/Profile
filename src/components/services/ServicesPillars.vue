<template>
  <div class="hero-pillars">
      <div
        v-for="(s, i) in mainServices"
        :key="s.title"
        class="pillar-row"
        v-inview="{ delay: i * 90 }"
      >
        <span class="pillar-num">0{{ i + 1 }}</span>
        <span class="pillar-name">{{ s.title }}</span>
        <i class="bi bi-arrow-up-right pillar-arrow" aria-hidden="true"></i>
      </div>
  </div>
</template>

<script setup>
import { useMainServices } from "@/composables/useMainServices";

const { mainServices } = useMainServices();
</script>

<style scoped>
.hero-pillars {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 380px;
  margin-left: auto;
}

.pillar-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.05rem 1.3rem;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease, background 0.25s ease;
}

.pillar-row:hover {
  transform: translateX(6px);
  border-color: rgba(200, 155, 109, 0.45);
  background: rgba(255, 255, 255, 0.08);
}

.pillar-num {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: #E3C9A8;
  min-width: 1.9rem;
}

.pillar-name {
  flex: 1;
  color: #F7F4EF;
  font-weight: 600;
  font-size: 0.98rem;
}

.pillar-arrow {
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.9rem;
  transition: transform 0.25s ease, color 0.25s ease;
}

.pillar-row:hover .pillar-arrow {
  transform: translate(3px, -3px);
  color: #E3C9A8;
}

@media (max-width: 991.98px) {
  .hero-pillars { max-width: 460px; margin: 2rem auto 0; }
}
</style>
