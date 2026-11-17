import { computed } from "vue";
import { useI18n } from "vue-i18n";

/**
 * The four main service offerings shown on the Services page
 * (hero pillars and detail cards share this data).
 */
export function useMainServices() {
  const { t, tm } = useI18n();

  const mainServices = computed(() => [
    {
      id: 1,
      icon: "bi bi-globe",
      title: t("services.mainServices.corporate"),
      subtitle: t("services.mainServices.corporateSubtitle"),
      description: t("services.mainServices.corporateDesc"),
      gradient: "linear-gradient(135deg, #8B5E3C 0%, #A4785A 100%)",
      features: tm("services.mainServices.corporateFeatures"),
    },
    {
      id: 2,
      icon: "bi bi-speedometer2",
      title: t("services.mainServices.operations"),
      subtitle: t("services.mainServices.operationsSubtitle"),
      description: t("services.mainServices.operationsDesc"),
      gradient: "linear-gradient(135deg, #A4785A 0%, #C89B6D 100%)",
      features: tm("services.mainServices.operationsFeatures"),
    },
    {
      id: 3,
      icon: "bi bi-calendar-event",
      title: t("services.mainServices.events"),
      subtitle: t("services.mainServices.eventsSubtitle"),
      description: t("services.mainServices.eventsDesc"),
      gradient: "linear-gradient(135deg, #A4785A 0%, #C89B6D 100%)",
      features: tm("services.mainServices.eventsFeatures"),
    },
    {
      id: 4,
      icon: "bi bi-code-square",
      title: t("services.mainServices.custom"),
      subtitle: t("services.mainServices.customSubtitle"),
      description: t("services.mainServices.customDesc"),
      gradient: "linear-gradient(135deg, #6B4226 0%, #8B5E3C 100%)",
      features: tm("services.mainServices.customFeatures"),
    },
  ]);

  return { mainServices };
}
