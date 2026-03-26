import { computed } from "vue";
import { useI18n } from "vue-i18n";
import projectsData from "@/assets/data/projects.json";

export function useProjects() {
  const { t } = useI18n();

  const projects = computed(() =>
    projectsData.map(p => ({
      ...p,
      image: new URL(`../assets/images/${p.imageName}`, import.meta.url).href
    }))
  );

  /**
   * Get the featured projects list for the Home page
   */
  const getFeaturedProjects = () => {
    return projects.value.map((p) => ({
      ...p,
      title: t(`home.projects.${p.key}`),
      category: t(`home.projects.${p.categoryKey}`),
      description: t(`home.projects.${p.key}Desc`),
    }));
  };

  /**
   * Get the full projects list for the Portfolio page
   */
  const getAllProjects = () => {
    return projects.value.map((p) => ({
      ...p,
      title: t(`portfolio.projects.${p.key}`),
      category: t(`portfolio.projects.${p.categoryKey}`),
      description: t(`portfolio.projects.${p.key}Desc`),
    }));
  };

  return {
    projects,
    getFeaturedProjects,
    getAllProjects,
  };
}
