<template>
  <div class="portfolio-card h-100">
    <div class="portfolio-image">
      <img :src="project.image" :alt="project.title" loading="lazy" decoding="async" width="400" height="250" />
      <div class="portfolio-overlay">
        <a
          :href="project.url"
          target="_blank"
          class="btn btn-primary-custom"
        >
          <i class="bi bi-box-arrow-up-right me-2"></i>
          {{ $t("portfolio.viewSite") }}
        </a>
      </div>
    </div>
    <div class="portfolio-content">
      <span class="portfolio-category">{{ project.category }}</span>
      <h3 class="portfolio-title">{{ project.title }}</h3>
      <p class="portfolio-description">{{ project.description }}</p>

      <div v-if="showTech && project.technologies" class="portfolio-tech">
        <span
          class="tech-tag"
          v-for="tech in project.technologies"
          :key="tech"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  },
  showTech: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.portfolio-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid rgba(37, 99, 235, 0.1);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  height: 100%;
  display: flex;
  flex-direction: column;
}

[data-theme='dark'] .portfolio-card {
  background: var(--glass-bg);
  border-color: var(--glass-border);
}

.portfolio-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-color);
}

.portfolio-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.portfolio-card:hover .portfolio-image img {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
}

.portfolio-card:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-content {
  padding: 1.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.portfolio-category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.portfolio-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  line-height: 1.4;
  word-break: break-word;
}

.portfolio-description {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.portfolio-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(37, 99, 235, 0.08);
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(37, 99, 235, 0.08);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: all var(--transition-base);
}

.tech-tag:hover {
  background: rgba(37, 99, 235, 0.15);
  color: var(--primary-color);
  transform: translateY(-2px);
}
</style>
