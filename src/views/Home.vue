<template>
  <div class="home">
    <HomeHero />
    <HomeMarquee />
    <HomeStats />
    <HomeServices />
    <HomeFeaturedProjects />
    <HomeTestimonials />
    <CtaSection
      variant="rich"
      :title="$t('home.ctaTitle')"
      :lines="[$t('home.ctaDescription'), $t('home.ctaDescription2')]"
      :button-text="$t('home.ctaButton')"
    />
  </div>
</template>

<script setup>
import HomeHero from "@/components/home/HomeHero.vue";
import HomeMarquee from "@/components/home/HomeMarquee.vue";
import HomeStats from "@/components/home/HomeStats.vue";
import HomeServices from "@/components/home/HomeServices.vue";
import HomeFeaturedProjects from "@/components/home/HomeFeaturedProjects.vue";
import HomeTestimonials from "@/components/home/HomeTestimonials.vue";
import CtaSection from "@/components/common/CtaSection.vue";
</script>
