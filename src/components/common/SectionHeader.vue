<template>
  <div class="section-header">
    <span v-if="badge" class="glow-badge"><span class="badge-dot"></span>{{ badge }}</span>
    <h2 class="section-title" v-reveal>
      {{ title }}<span v-if="highlight" class="highlight">{{ highlight }}</span>
    </h2>
    <p v-if="description" class="section-description" v-reveal>
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  badge: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  highlight: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
/* These styles were originally scattered across pages, now centralized here */
.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.section-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  line-height: 1.8;
}
</style>
