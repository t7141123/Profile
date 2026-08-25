<template>
  <div class="section-header">
    <span v-if="index" class="header-index" aria-hidden="true">{{ index }}</span>
    <span v-if="badge" class="glow-badge"><span class="badge-dot"></span>{{ badge }}</span>
    <h2 class="section-title" v-reveal>
      {{ title }}<span v-if="highlight" class="highlight">{{ highlight }}</span>
    </h2>
    <div class="title-bar" aria-hidden="true"></div>
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
  index: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.section-header {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 4rem;
  position: relative;
}

.header-index {
  position: absolute;
  top: -3.2rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-display);
  font-size: clamp(5rem, 12vw, 9rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.08;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.section-title {
  font-size: clamp(2.25rem, 5.5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 1;
}

.title-bar {
  width: 72px;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, #2563EB 0%, #8B5CF6 45%, #F59E0B 100%);
  margin: 0 auto 1.5rem;
  position: relative;
}

.title-bar::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
  filter: blur(6px);
  opacity: 0.5;
}

.section-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  line-height: 1.8;
  max-width: 640px;
  margin: 0 auto;
}
</style>
