<template>
  <section class="section">
    <div class="container">
      <div class="row g-4">
      <div
        class="col-md-6"
        v-for="service in mainServices"
        :key="service.id"
      >
        <div class="glass-card service-detail-card h-100 border-beam spotlight-card" v-spotlight>
          <div class="service-detail-header">
            <div
              class="service-detail-icon"
              :style="{ background: service.gradient }"
            >
              <i :class="service.icon"></i>
            </div>
            <div>
              <h3 class="service-detail-title">{{ service.title }}</h3>
              <span class="service-detail-subtitle">{{
                service.subtitle
              }}</span>
            </div>
          </div>
          <p class="service-detail-description">
            {{ service.description }}
          </p>
          <ul class="service-features">
            <li v-for="feature in service.features" :key="feature">
              <i class="bi bi-check-circle-fill"></i>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useMainServices } from "@/composables/useMainServices";

const { mainServices } = useMainServices();
</script>

<style scoped>
/* Service Detail Card */
.service-detail-card {
  padding: 2.5rem;
}

.service-detail-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.service-detail-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  font-size: 1.75rem;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 16px -4px rgba(139, 94, 60, 0.2);
}

.service-detail-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  line-height: 1.3;
}

.service-detail-subtitle {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.service-detail-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: var(--text-secondary);
}

.service-features li i {
  color: var(--success-color);
}
</style>
