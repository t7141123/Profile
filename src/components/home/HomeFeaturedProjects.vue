<template>
  <section class="section featured-projects-section">
    <div class="container">
      <SectionHeader
        :badge="$t('home.featuredBadge')"
        :title="$t('home.featuredTitle')"
        :highlight="$t('home.featuredTitleHighlight')"
        index="02"
      />

      <div class="row g-4">
        <div
          class="col-md-6 col-lg-4"
          v-for="(project, i) in featuredProjects"
          :key="project.id"
          v-inview="{ delay: i * 100 }"
        >
          <PortfolioCard :project="project" />
        </div>
      </div>

      <div class="text-center mt-5" v-inview>
        <router-link to="/portfolio" class="btn btn-outline-custom" v-ripple>
          {{ $t("home.viewAll") }} <i class="bi bi-arrow-right ms-2"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import PortfolioCard from "@/components/common/PortfolioCard.vue";
import { useProjects } from "@/composables/useProjects";

const { getFeaturedProjects } = useProjects();

const FEATURED_KEYS = ["actionLead", "clay", "nhm", "uvaco", "generalErp", "chordBook"];
const featuredProjects = computed(() => {
  const all = getFeaturedProjects();
  return FEATURED_KEYS.map((k) => all.find((p) => p.key === k)).filter(Boolean);
});
</script>

<style scoped>
.featured-projects-section {
  padding-bottom: 4rem;
}
</style>
