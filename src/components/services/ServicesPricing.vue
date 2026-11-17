<template>
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">{{ $t("services.pricingBadge") }}</span>
        <h2 class="section-title">
          {{ $t("services.pricingTitle")
          }}<span class="highlight">{{
            $t("services.pricingTitleHighlight")
          }}</span>
        </h2>
        <p class="section-description">
          {{ $t("services.pricingDescription") }}
        </p>
      </div>

      <div class="row g-4 justify-content-center">
        <div
          class="col-md-6 col-lg-4"
          v-for="plan in pricingPlans"
          :key="plan.id"
        >
          <div
            class="glass-card pricing-card h-100 border-beam spotlight-card"
            :class="{ featured: plan.featured }"
            v-spotlight
          >
            <div class="pricing-badge" v-if="plan.featured">
              {{ $t("services.pricing.popular") }}
            </div>
            <h3 class="pricing-title">{{ plan.title }}</h3>
            <p class="pricing-description">{{ plan.description }}</p>

            <ul class="pricing-features">
              <li v-for="feature in plan.features" :key="feature">
                <i class="bi bi-check2"></i>
                {{ feature }}
              </li>
            </ul>
            <a
              :href="contact.line"
              target="_blank" rel="noopener noreferrer"
              class="btn btn-line w-100"
              v-ripple
            >
              <i class="bi bi-line me-3"></i>{{ $t("services.pricing.contact") }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { contact } from "@/config/contact";

const { t, tm } = useI18n();

const pricingPlans = computed(() => [
  {
    id: 1,
    title: t("services.pricing.basic"),
    description: t("services.pricing.basicDesc"),
    featured: false,
    features: tm("services.pricing.basicFeatures"),
  },
  {
    id: 2,
    title: t("services.pricing.pro"),
    description: t("services.pricing.proDesc"),
    featured: true,
    features: tm("services.pricing.proFeatures"),
  },
  {
    id: 3,
    title: t("services.pricing.enterprise"),
    description: t("services.pricing.enterpriseDesc"),
    featured: false,
    features: tm("services.pricing.enterpriseFeatures"),
  },
]);
</script>

<style scoped>
.pricing-card {
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
  border: 1px solid rgba(139, 94, 60, 0.1);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-base);
  overflow: visible !important; /* Prevent badge clipping */
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.pricing-card.featured {
  border-color: var(--primary-color);
  background: linear-gradient(
    180deg,
    rgba(139, 94, 60, 0.05) 0%,
    var(--bg-secondary) 100%
  );
  box-shadow: var(--shadow-glow);
}

.pricing-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-gradient);
  padding: 0.35rem 1.25rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(139, 94, 60, 0.3);
  white-space: nowrap;
}

.pricing-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.pricing-description {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-bottom: 2rem;
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  text-align: left;
}

.pricing-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: var(--text-secondary);
}

.pricing-features li i {
  color: var(--primary-light);
}
</style>
