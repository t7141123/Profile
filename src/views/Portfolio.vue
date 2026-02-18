<template>
  <div class="portfolio-page">
    <!-- Page Header Section -->
    <section class="page-header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <SectionHeader
              :badge="$t('portfolio.badge')"
              :title="$t('portfolio.title')"
              :highlight="$t('portfolio.titleHighlight')"
              :description="$t('portfolio.pageDescription')"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section class="section">
      <div class="container">
        <div class="row g-4">
          <div
            class="col-md-6 col-lg-4"
            v-for="project in projects"
            :key="project.id"
          >
            <div class="portfolio-card h-100">
              <div class="portfolio-image">
                <img :src="project.image" :alt="project.title" loading="lazy" />
                <div class="portfolio-overlay">
                  <a
                    :href="project.url"
                    target="_blank"
                    class="btn btn-primary-custom btn-sm"
                  >
                    <i class="bi bi-box-arrow-up-right me-1"></i
                    >{{ $t("portfolio.viewSite") }}
                  </a>
                </div>
              </div>
              <div class="portfolio-content">
                <span class="portfolio-category">{{ project.category }}</span>
                <h3 class="portfolio-title">{{ project.title }}</h3>
                <p class="portfolio-description">{{ project.description }}</p>

                <div class="portfolio-tech">
                  <span
                    class="tech-tag"
                    v-for="tech in project.technologies"
                    :key="tech"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div class="portfolio-footer">
                  <a :href="project.url" target="_blank" class="portfolio-link">
                    {{ $t("portfolio.visitSite") }}
                    <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NDA Notice & CTA Section -->
    <section class="section nda-section">
      <div class="container">
        <div class="nda-card">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <h3 class="nda-title">
                <i class="bi bi-shield-lock-fill me-2"></i>
                {{ $t("portfolio.ndaTitle") }}
              </h3>
              <p
                class="nda-description"
                v-html="$t('portfolio.ndaDescription')"
              ></p>
              <p class="nda-note">{{ $t("portfolio.ndaNote") }}</p>
            </div>
            <div class="col-lg-4 mt-4 mt-lg-0">
              <div class="nda-cta-wrapper text-center text-lg-end">
                <h4 class="nda-cta-title">{{ $t("portfolio.ctaTitle") }}</h4>
                <p class="nda-cta-desc">
                  {{ $t("portfolio.ctaDescription") }}
                </p>
                <a
                  href="https://line.me/ti/p/2w7bwfksdF"
                  target="_blank"
                  class="btn btn-primary-custom btn-lg"
                >
                  <i class="bi bi-line me-2"></i>{{ $t("portfolio.ctaButton") }}
                </a>
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
import SectionHeader from "@/components/common/SectionHeader.vue";
import { useProjects } from "@/composables/useProjects";

const { getAllProjects } = useProjects();

const projects = computed(() => getAllProjects());
</script>

<style scoped>
/* Portfolio-specific page description styling */
.page-description {
  max-width: 600px;
  margin: 0 auto;
}

/* Portfolio Tech Tags */
.portfolio-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  padding: 0.25rem 0.5rem;
  background: rgba(5, 150, 105, 0.1);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--primary-light);
  font-weight: 500;
}

.portfolio-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--dark-border);
}

/* CTA */
.cta-section {
  background: rgba(5, 150, 105, 0.05);
  border-top: 1px solid rgba(5, 150, 105, 0.1);
}

.cta-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

/* NDA Notice Section */
.nda-section {
  padding-bottom: 5rem; /* Add spacing at the bottom */
}

.nda-card {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  backdrop-filter: blur(10px);
}

.nda-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

.nda-title i {
  color: var(--primary-light);
}

.nda-description {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  line-height: 1.8;
}

.nda-note {
  font-size: 0.95rem;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 0;
}

/* NDA CTA Styles */
.nda-cta-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.nda-cta-desc {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 1rem;
}
</style>
