<template>
  <div class="portfolio-page">
    <!-- Page Header Section -->
    <!-- Page Header Section -->
    <PageHeader
      variant="portfolio"
      :badge="$t('portfolio.badge')"
      :title="$t('portfolio.title')"
      :highlight="$t('portfolio.titleHighlight')"
      :description="$t('portfolio.pageDescription')"
      @scroll-click="scrollToContent"
    >
      <template #aside>
        <div class="hero-meta">
          <div
            v-for="(m, i) in metaChips"
            :key="m.label"
            class="meta-chip"
            v-inview="{ delay: i * 90 }"
          >
            <strong>{{ m.value }}</strong>
            <span>{{ m.label }}</span>
          </div>
        </div>
      </template>
    </PageHeader>

    <!-- Portfolio Section -->
    <section class="section" ref="contentSection">
      <div class="container">
        <div class="filter-bar">
          <span class="filter-label">{{ t('portfolio.filters.label') }}</span>
          <div class="filter-buttons">
            <button
              v-for="filter in filters"
              :key="filter.key"
              class="filter-btn"
              :class="{ active: selectedCategory === filter.key }"
              @click="selectedCategory = filter.key"
              v-ripple
            >
              <i :class="filter.icon" class="filter-icon"></i>
              {{ filter.label }}
            </button>
          </div>
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
        <div class="nda-card crd-hard">
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
                  v-ripple
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

const metaChips = computed(() => [
  { value: `${projects.value.length}+`, label: t("home.stats.projects") },
  { value: "11", label: t("home.stats.langs") },
  { value: "100%", label: t("home.stats.tailored") },
]);


const selectedCategory = ref("all");

const filters = computed(() => [
  { key: "all", label: t("portfolio.filters.all"), icon: "bi-grid-3x3-gap" },
  { key: "corporate", label: t("portfolio.projects.corporate"), icon: "bi-building" },
  { key: "tool", label: t("portfolio.projects.tool"), icon: "bi-tools" },
  { key: "other", label: t("portfolio.filters.other"), icon: "bi-collection" },
]);

const filteredProjects = computed(() => {
  if (selectedCategory.value === "all") return projects.value;
  if (selectedCategory.value === "corporate") {
    return projects.value.filter(
      p => p.categoryKey === "corporate" || p.categoryKey === "internal"
    );
  }
  if (selectedCategory.value === "other") {
    return projects.value.filter(
      p => p.categoryKey !== "corporate" && p.categoryKey !== "internal" && p.categoryKey !== "tool"
    );
  }
  return projects.value.filter(p => p.categoryKey === selectedCategory.value);
});
</script>

<style scoped>
/* Portfolio hero meta chips */
.hero-meta {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  max-width: 340px;
  margin-left: auto;
}

.meta-chip {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  padding: 1rem 1.35rem;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease, background 0.25s ease;
}

.meta-chip:hover {
  transform: translateX(6px);
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(255, 255, 255, 0.08);
}

.meta-chip strong {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1;
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  min-width: 3.2rem;
}

.meta-chip span {
  color: #C9C3B8;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 991.98px) {
  .hero-meta {
    flex-direction: row;
    flex-wrap: wrap;
    max-width: none;
    margin: 2rem auto 0;
  }
  .meta-chip {
    flex: 1 1 140px;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    padding: 0.9rem 1.1rem;
  }
}

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
  text-align: center;
  margin-bottom: 3rem;
}

.filter-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.4rem;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--bg-accent);
  background: var(--bg-accent);
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-icon {
  font-size: 1rem;
  line-height: 1;
}

.filter-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background: rgba(37, 99, 235, 0.08);
  transform: translateY(-1px);
}

[data-theme='dark'] .filter-btn:hover {
  color: var(--primary-light);
  background: rgba(59, 130, 246, 0.12);
}

.filter-btn.active {
  background: var(--gradient-primary);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
  transform: translateY(-1px);
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
