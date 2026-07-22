<template>
  <div class="portfolio-page">
    <!-- Page Header Section -->
    <!-- Page Header Section -->
    <PageHeader
      :badge="$t('portfolio.badge')"
      :title="$t('portfolio.title')"
      :highlight="$t('portfolio.titleHighlight')"
      :description="$t('portfolio.pageDescription')"
      header-class="page-header-portfolio"
      @scroll-click="scrollToContent"
    />

    <!-- Portfolio Section -->
    <section class="section" ref="contentSection">
      <div class="container">
        <div class="filter-bar">
          <button
            v-for="filter in filters"
            :key="filter.key"
            class="filter-btn"
            :class="{ active: selectedCategory === filter.key }"
            @click="selectedCategory = filter.key"
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="row g-4">
          <div
            class="col-md-6 col-lg-4"
            v-for="project in filteredProjects"
            :key="project.id"
          >
            <PortfolioCard :project="project" :show-tech="true" />
          </div>
        </div>
      </div>
    </section>

    <!-- NDA Notice & CTA Section -->
    <section class="section nda-section no-divider">
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
                  class="btn btn-line btn-lg"
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
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useProjects } from "@/composables/useProjects";
import PageHeader from "@/components/common/PageHeader.vue";
import PortfolioCard from "@/components/common/PortfolioCard.vue";

const { t } = useI18n();
const { getAllProjects } = useProjects();

const contentSection = ref(null);

const scrollToContent = () => {
  contentSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const projects = computed(() => getAllProjects());

const selectedCategory = ref("all");

const filters = computed(() => [
  { key: "all", label: t("portfolio.filters.all") },
  { key: "corporate", label: t(`portfolio.projects.corporate`) },
  { key: "tool", label: t(`portfolio.projects.tool`) },
  { key: "other", label: t("portfolio.filters.other") },
]);

const filteredProjects = computed(() => {
  if (selectedCategory.value === "all") return projects.value;
  if (selectedCategory.value === "other") {
    return projects.value.filter(
      p => p.categoryKey !== "corporate" && p.categoryKey !== "tool"
    );
  }
  return projects.value.filter(p => p.categoryKey === selectedCategory.value);
});
</script>

<style scoped>
/* Portfolio-specific page description styling */
/* Portfolio Tech Tags - Handled by PortfolioCard */


/* CTA */
.cta-section {
  background: var(--gradient-hero);
  border-top: 1px solid rgba(37, 99, 235, 0.1);
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

/* Filter Bar */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.filter-btn {
  padding: 0.6rem 1.5rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
}

.filter-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}

/* NDA Notice Section */
.nda-section {
  padding-bottom: 5rem;
  margin-top: 4rem;
}

.nda-section.no-divider::after {
  display: none;
}

.nda-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(37, 99, 235, 0.1);
  border-radius: var(--radius-xl);
  padding: 3rem;
  box-shadow: var(--shadow-soft);
  margin: 2rem 0;
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
