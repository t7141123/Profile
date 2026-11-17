<template>
  <div class="services-page">
    <PageHeader
      variant="services"
      :badge="$t('services.badge')"
      :title="$t('services.title')"
      :highlight="$t('services.titleHighlight')"
      :description="$t('services.pageDescription')"
      @scroll-click="scrollToContent"
    >
      <template #aside>
        <ServicesPillars />
      </template>
    </PageHeader>

    <ServicesMainList ref="mainList" />
    <ServicesTechStack />
    <ServicesPricing />
    <ServicesFaq />

    <CtaSection
      :title="$t('services.ctaTitle')"
      :lines="[$t('services.ctaDescription')]"
      :button-text="$t('services.ctaButton')"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import PageHeader from "@/components/common/PageHeader.vue";
import CtaSection from "@/components/common/CtaSection.vue";
import ServicesPillars from "@/components/services/ServicesPillars.vue";
import ServicesMainList from "@/components/services/ServicesMainList.vue";
import ServicesTechStack from "@/components/services/ServicesTechStack.vue";
import ServicesPricing from "@/components/services/ServicesPricing.vue";
import ServicesFaq from "@/components/services/ServicesFaq.vue";

const mainList = ref(null);

const scrollToContent = () => {
  mainList.value?.$el?.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>
