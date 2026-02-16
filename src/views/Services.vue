<template>
  <div class="services-page">
    <!-- Page Header Section -->
    <section class="page-header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <span class="section-badge">{{ $t("services.badge") }}</span>
            <h1 class="page-title">
              {{ $t("services.title")
              }}<span class="highlight">{{
                $t("services.titleHighlight")
              }}</span>
            </h1>
            <p class="page-description">
              {{ $t("services.pageDescription") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Services Section -->
    <section class="section">
      <div class="container">
        <div class="row g-4">
          <div
            class="col-md-6"
            v-for="service in mainServices"
            :key="service.id"
          >
            <div class="glass-card service-detail-card h-100">
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

    <!-- Technology Stack Section -->
    <section class="section" style="background: rgba(30, 41, 59, 0.3)">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">{{ $t("services.techBadge") }}</span>
          <h2 class="section-title">
            {{ $t("services.techTitle")
            }}<span class="highlight">{{
              $t("services.techTitleHighlight")
            }}</span>
          </h2>
          <p class="section-description">
            {{ $t("services.techDescription") }}
          </p>
        </div>

        <div class="tech-logos">
          <div
            class="tech-logo-item"
            v-for="tech in technologies"
            :key="tech.name"
          >
            <div class="tech-logo">
              <img v-if="tech.img" :src="tech.img" :alt="tech.name" class="tech-logo-img" />
              <i v-else :class="tech.icon"></i>
            </div>
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Plans Section -->
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
              class="glass-card pricing-card h-100"
              :class="{ featured: plan.featured }"
            >
              <div class="pricing-badge" v-if="plan.featured">
                {{ $t("services.pricing.popular") }}
              </div>
              <h3 class="pricing-title">{{ plan.title }}</h3>
              <p class="pricing-description">{{ plan.description }}</p>

              <div class="pricing-price">
                <span class="currency">NT$</span>
                <span class="amount">{{ plan.price.toLocaleString() }}</span>
                <span class="period">{{ $t("services.pricing.from") }}</span>
              </div>

              <ul class="pricing-features">
                <li v-for="feature in plan.features" :key="feature">
                  <i class="bi bi-check2"></i>
                  {{ feature }}
                </li>
              </ul>
              <router-link
                to="/contact"
                class="btn w-100"
                :class="
                  plan.featured ? 'btn-primary-custom' : 'btn-outline-custom'
                "
              >
                {{ $t("services.pricing.contact") }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section" style="background: rgba(30, 41, 59, 0.3)">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">{{ $t("services.faqBadge") }}</span>
          <h2 class="section-title">
            {{ $t("services.faqTitle")
            }}<span class="highlight">{{
              $t("services.faqTitleHighlight")
            }}</span>
          </h2>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="accordion" id="faqAccordion">
              <div
                class="accordion-item"
                v-for="(faq, index) in faqs"
                :key="faq.id"
              >
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    :class="{ collapsed: index !== 0 }"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#faq' + faq.id"
                  >
                    {{ faq.question }}
                  </button>
                </h2>
                <div
                  :id="'faq' + faq.id"
                  class="accordion-collapse collapse"
                  :class="{ show: index === 0 }"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();

const mainServices = computed(() => [
  {
    id: 1,
    icon: "bi bi-globe",
    title: t("services.mainServices.webDev"),
    subtitle: t("services.mainServices.webDevSubtitle"),
    description: t("services.mainServices.webDevDesc"),
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    features: tm("services.mainServices.webDevFeatures"),
  },
  {
    id: 2,
    icon: "bi bi-code-square",
    title: t("services.mainServices.frontendDev"),
    subtitle: t("services.mainServices.frontendDevSubtitle"),
    description: t("services.mainServices.frontendDevDesc"),
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    features: tm("services.mainServices.frontendDevFeatures"),
  },
  {
    id: 3,
    icon: "bi bi-server",
    title: t("services.mainServices.backendDev"),
    subtitle: t("services.mainServices.backendDevSubtitle"),
    description: t("services.mainServices.backendDevDesc"),
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    features: tm("services.mainServices.backendDevFeatures"),
  },
  {
    id: 4,
    icon: "bi bi-gear-wide-connected",
    title: t("services.mainServices.integration"),
    subtitle: t("services.mainServices.integrationSubtitle"),
    description: t("services.mainServices.integrationDesc"),
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    features: tm("services.mainServices.integrationFeatures"),
  },
]);

const technologies = [
  { name: "Vue.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
  { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "C", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "PHP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Zeabur", icon: "bi bi-cloud" },
];

const pricingPlans = computed(() => [
  {
    id: 1,
    title: t("services.pricing.basic"),
    description: t("services.pricing.basicDesc"),
    price: 30000,
    featured: false,
    features: tm("services.pricing.basicFeatures"),
  },
  {
    id: 2,
    title: t("services.pricing.pro"),
    description: t("services.pricing.proDesc"),
    price: 80000,
    featured: true,
    features: tm("services.pricing.proFeatures"),
  },
  {
    id: 3,
    title: t("services.pricing.enterprise"),
    description: t("services.pricing.enterpriseDesc"),
    price: 150000,
    featured: false,
    features: tm("services.pricing.enterpriseFeatures"),
  },
]);

const faqs = computed(() => [
  {
    id: 1,
    question: t("services.faqs.q1"),
    answer: t("services.faqs.a1"),
  },
  {
    id: 2,
    question: t("services.faqs.q2"),
    answer: t("services.faqs.a2"),
  },
  {
    id: 3,
    question: t("services.faqs.q3"),
    answer: t("services.faqs.a3"),
  },
  {
    id: 4,
    question: t("services.faqs.q4"),
    answer: t("services.faqs.a4"),
  },
  {
    id: 5,
    question: t("services.faqs.q5"),
    answer: t("services.faqs.a5"),
  },
]);
</script>

<style scoped>
/* Service Detail Card */
.service-detail-card {
  padding: 2rem;
}

.service-detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.service-detail-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
}

.service-detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.service-detail-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
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

/* Tech Logos */
.tech-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.tech-logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100px;
}

.tech-logo {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 150, 105, 0.1);
  border: 1px solid rgba(5, 150, 105, 0.2);
  border-radius: 16px;
  font-size: 2rem;
  color: var(--primary-light);
  transition: var(--transition-base);
}

.tech-logo-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.tech-logo-item:hover .tech-logo {
  background: var(--primary-gradient);
  border-color: transparent;
  color: white;
  transform: translateY(-5px);
}

.tech-name {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Pricing Card */
.pricing-card {
  padding: 2rem;
  text-align: center;
  position: relative;
  border: 1px solid transparent;
}

.pricing-card.featured {
  border-color: var(--primary-color);
  background: linear-gradient(
    180deg,
    rgba(5, 150, 105, 0.1) 0%,
    rgba(30, 41, 59, 0.5) 100%
  );
}

.pricing-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-gradient);
  padding: 0.25rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.pricing-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.pricing-description {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.pricing-price {
  margin-bottom: 1.5rem;
}

.pricing-price .currency {
  font-size: 1rem;
  color: var(--text-secondary);
  vertical-align: top;
}

.pricing-price .amount {
  font-size: 3rem;
  font-weight: 900;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pricing-price .period {
  font-size: 1rem;
  color: var(--text-muted);
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

/* Accordion */
.accordion-item {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid var(--dark-border);
  border-radius: 12px !important;
  margin-bottom: 1rem;
  overflow: hidden;
}

.accordion-button {
  background: transparent;
  color: var(--text-primary);
  font-weight: 600;
  padding: 1.25rem;
  box-shadow: none !important;
}

.accordion-button:not(.collapsed) {
  background: rgba(5, 150, 105, 0.1);
  color: var(--primary-light);
}

.accordion-button::after {
  filter: brightness(0) invert(1);
}

.accordion-body {
  color: var(--text-secondary);
  padding: 0 1.25rem 1.25rem;
  line-height: 1.8;
}
</style>
