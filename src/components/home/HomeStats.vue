<template>
  <section class="section stats-section" id="home-stats">
    <div class="container">
      <div class="stats-panel border-beam" v-inview="{ variant: 'scale' }">
        <div class="row g-0">
          <div class="col-6 col-lg-3 stat-cell" v-for="s in stats" :key="s.id">
            <div class="stat-value" v-count="{ value: s.value, suffix: s.suffix }"></div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const stats = computed(() => [
  { id: 1, value: 9, suffix: "+", label: t("home.stats.years") },
  { id: 2, value: 14, suffix: "+", label: t("home.stats.projects") },
  { id: 3, value: 11, suffix: "", label: t("home.stats.langs") },
  { id: 4, value: 100, suffix: "%", label: t("home.stats.tailored") },
]);
</script>

<style scoped>
.stats-section {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: -1rem;
}

.stats-panel {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.stat-cell {
  padding: 2rem 1rem;
  text-align: center;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.stat-cell:nth-child(2n) { border-right: none; }
.stat-cell:nth-last-child(-n + 2) { border-bottom: none; }

@media (min-width: 992px) {
  .stat-cell { border-bottom: none; }
  .stat-cell:last-child { border-right: none; }
}

.stat-value {
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 4vw, 2.9rem);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.35rem;
}
</style>
