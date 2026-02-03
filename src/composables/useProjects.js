import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useProjects() {
  const { t } = useI18n();

  const projects = computed(() => [
    {
      id: 1,
      key: "actionLead",
      image: new URL("@/assets/images/action-lead.png", import.meta.url).href,
      url: "https://www.action-lead.com",
      technologies: ["Vue.js", "Bootstrap", "PHP", "MySQL"],
      categoryKey: "corporate", // Used for i18n key lookup
    },
    {
      id: 2,
      key: "linkwing",
      image: new URL("@/assets/images/linkwing.png", import.meta.url).href,
      url: "https://www.linkwing.com/",
      technologies: ["Vue.js", "Vite", "Bootstrap", "Node.js", "PHP"],
      categoryKey: "corporate",
    },
    {
      id: 3,
      key: "clay",
      image: new URL("@/assets/images/clay.png", import.meta.url).href,
      url: "https://www.clay.com.tw/",
      technologies: ["Vue.js", "Bootstrap", "PHP", "MySQL"],
      categoryKey: "ecommerce",
    },
    {
      id: 4,
      key: "nhm",
      image: new URL("@/assets/images/nothing-hidden.png", import.meta.url).href,
      url: "https://www.nothinghidden.com.tw/",
      technologies: ["WordPress", "PHP", "MySQL", "RWD"],
      categoryKey: "npo",
    },
  ]);

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
      title: t(`portfolio.projects.${p.key}`), // Use translation under portfolio (potentially more detailed)
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
