<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>

      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="hero-title">
                {{ $t("home.title") }}<br />
                <span class="highlight">David Liu</span>
              </h1>

              <p class="hero-subtitle">
                {{ $t("home.subtitle") }}<br />
                {{ $t("home.subtitle2") }}
              </p>

              <div class="hero-buttons">
                <router-link to="/portfolio" class="btn btn-primary-custom">
                  <i class="bi bi-collection me-2"></i
                  >{{ $t("home.viewWorks") }}
                </router-link>
                <a
                  href="https://line.me/ti/p/2w7bwfksdF"
                  target="_blank"
                  class="btn btn-outline-custom"
                >
                  <i class="bi bi-line me-2"></i>{{ $t("home.addLine") }}
                </a>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="hero-image text-center">
              <div class="code-preview">
                <div class="code-header">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                  <span class="filename">david_profile.js</span>
                </div>
                <pre
                  class="code-content"
                ><code><span class="keyword">const</span> <span class="variable">yourProject</span> = {
  <span class="property">{{ $t('home.businessPreview.target') }}</span>: <span class="string">"{{ $t('home.businessPreview.targetValue') }}"</span>,
  <span class="property">{{ $t('home.businessPreview.budget') }}</span>: <span class="string">"{{ $t('home.businessPreview.budgetValue') }}"</span>,
  <span class="property">{{ $t('home.businessPreview.timeline') }}</span>: <span class="string">"{{ $t('home.businessPreview.timelineValue') }}"</span>,
  <span class="property">{{ $t('home.businessPreview.result') }}</span>: <span class="string">"{{ $t('home.businessPreview.resultValue') }}"</span>
};</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Preview Section -->
    <section class="section">
      <div class="container">
        <SectionHeader
          :badge="$t('home.servicesBadge')"
          :title="$t('home.servicesTitle')"
          :highlight="$t('home.servicesTitleHighlight')"
          :description="$t('home.servicesDescription')"
        />

        <div class="row g-4">
          <div
            class="col-md-6 col-lg-3"
            v-for="service in services"
            :key="service.id"
          >
            <router-link
              to="/services"
              class="glass-card service-card h-100 text-decoration-none"
            >
              <div
                class="service-icon"
                :style="{ background: service.gradient }"
              >
                <i :class="service.icon"></i>
              </div>
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <span class="service-link">
                {{ $t("home.learnMore") }} <i class="bi bi-arrow-right"></i>
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="section">
      <div class="container">
        <SectionHeader
          :badge="$t('home.featuredBadge')"
          :title="$t('home.featuredTitle')"
          :highlight="$t('home.featuredTitleHighlight')"
        />

        <div class="row g-4">
          <div
            class="col-md-6 col-lg-4"
            v-for="project in featuredProjects"
            :key="project.id"
          >
            <div class="portfolio-card h-100">
              <div class="portfolio-image">
                <img :src="project.image" :alt="project.title" loading="lazy" decoding="async" width="400" height="250" />
                <div class="portfolio-overlay">
                  <a
                    :href="project.url"
                    target="_blank"
                    class="btn btn-primary-custom btn-sm"
                  >
                    <i class="bi bi-box-arrow-up-right me-1"></i
                    >{{ $t("home.viewSite") }}
                  </a>
                </div>
              </div>
              <div class="portfolio-content">
                <span class="portfolio-category">{{ project.category }}</span>
                <h3 class="portfolio-title">{{ project.title }}</h3>
                <p class="portfolio-description">{{ project.description }}</p>
                <a :href="project.url" target="_blank" class="portfolio-link">
                  {{ $t("home.visitSite") }} <i class="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <router-link to="/portfolio" class="btn btn-outline-custom">
            {{ $t("home.viewAll") }} <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section no-divider">
      <div class="container">
        <div class="cta-content text-center">
          <h2 class="cta-title">{{ $t("home.ctaTitle") }}</h2>
          <p class="cta-description">
            {{ $t("home.ctaDescription") }}<br />
            {{ $t("home.ctaDescription2") }}
          </p>
          <a
            href="https://line.me/ti/p/2w7bwfksdF"
            target="_blank"
            class="btn btn-primary-custom btn-lg"
          >
            <i class="bi bi-line me-2"></i>{{ $t("home.ctaButton") }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import SectionHeader from "@/components/common/SectionHeader.vue";
import { useProjects } from "@/composables/useProjects";

const { t } = useI18n();
const { getFeaturedProjects } = useProjects();

const services = computed(() => [
  {
    id: 1,
    icon: "bi bi-globe",
    title: t("home.services.corporate"),
    description: t("home.services.corporateDesc"),
    gradient: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
  },
  {
    id: 2,
    icon: "bi bi-speedometer2",
    title: t("home.services.operations"),
    description: t("home.services.operationsDesc"),
    gradient: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
  },
  {
    id: 3,
    icon: "bi bi-calendar-event",
    title: t("home.services.events"),
    description: t("home.services.eventsDesc"),
    gradient: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
  },
  {
    id: 4,
    icon: "bi bi-code-square",
    title: t("home.services.custom"),
    description: t("home.services.customDesc"),
    gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
  },
]);

const featuredProjects = computed(() => getFeaturedProjects().slice(0, 3));
</script>

<style scoped>
/* Code Preview Styles - Modern & Clean */
.code-preview {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid rgba(37, 99, 235, 0.1);
  box-shadow: var(--shadow-xl);
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
}

.code-header {
  background: var(--bg-accent);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(37, 99, 235, 0.05);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red {
  background: #FF5F57;
}
.dot.yellow {
  background: #FEBC2E;
}
.dot.green {
  background: #28C840;
}

.filename {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.code-content {
  padding: 24px;
  margin: 0;
  font-family: "Fira Code", "Monaco", monospace;
  font-size: 0.875rem;
  line-height: 1.8;
  overflow-x: auto;
  background: var(--bg-secondary);
}

.code-content code {
  color: var(--text-secondary);
}

.keyword {
  color: #8B5CF6; /* Purple */
}
.variable {
  color: #EF4444; /* Red */
}
.property {
  color: #F59E0B; /* Amber */
}
.string {
  color: #10B981; /* Green */
}

/* CTA Section */
.cta-section {
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  margin: 4rem auto;
  max-width: 1200px;
  border: 1px solid rgba(37, 99, 235, 0.1);
}

.cta-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 10% 50%,
      rgba(37, 99, 235, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 90% 50%,
      rgba(124, 58, 237, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.cta-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.service-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease;
  color: inherit;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
  white-space: nowrap;
  color: var(--text-primary);
}

.service-link {
  margin-top: auto;
  padding-top: 1rem;
  font-weight: 600;
  color: var(--primary-color);
  font-size: 0.875rem;
}

.service-link i {
  transition: transform 0.3s;
}

.service-card:hover .service-link i {
  transform: translateX(4px);
}

@media (max-width: 991.98px) {
  .code-preview {
    margin-top: 2rem;
  }
}
</style>
