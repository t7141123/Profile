<template>
  <div class="section-header">
    <span v-if="badge" class="section-badge">{{ badge }}</span>
    <h2 class="section-title">
      {{ title }}<span v-if="highlight" class="highlight">{{ highlight }}</span>
    </h2>
    <p v-if="description" class="section-description">
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

.section-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(5, 150, 105, 0.1);
  color: var(--primary-light);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
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
