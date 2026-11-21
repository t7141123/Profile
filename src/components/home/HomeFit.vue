<template>
  <section class="section fit-section" id="home-fit">
    <div class="container">
      <SectionHeader
        index="00"
        :badge="$t('home.fit.badge')"
        :title="$t('home.fit.title')"
        :highlight="$t('home.fit.highlight')"
        :description="$t('home.fit.desc')"
      />

      <div class="row g-3 g-lg-4">
        <div class="col-6 col-lg-3" v-for="(c, i) in cards" :key="c.icon" v-inview="{ delay: i * 80 }">
          <div class="fit-card h-100">
            <i :class="['bi', c.icon, 'fit-icon']" aria-hidden="true"></i>
            <h3 class="fit-card-title">{{ $t(`home.fit.c${i + 1}t`) }}</h3>
            <p class="fit-card-desc">{{ $t(`home.fit.c${i + 1}d`) }}</p>
          </div>
        </div>
      </div>

      <div class="fit-cta" v-inview="{ delay: 120 }">
        <h3 class="fit-cta-title">{{ $t("home.fit.ctaTitle") }}</h3>
        <p class="fit-cta-desc">{{ $t("home.fit.ctaDesc") }}</p>
        <div class="fit-cta-actions">
          <a
            :href="contact.line"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-line"
            v-ripple
          >
            <i class="bi bi-line me-2"></i>{{ $t("home.fit.ctaLine") }}
          </a>
          <router-link :to="localePath('/contact')" class="btn btn-outline-custom" v-ripple>
            {{ $t("home.fit.ctaForm") }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "@/components/common/SectionHeader.vue";
import { contact } from "@/config/contact";
import { useLocale } from "@/composables/useLocale";

const { localePath } = useLocale();

const cards = [
  { icon: "bi-phone" },
  { icon: "bi-globe2" },
  { icon: "bi-speedometer2" },
  { icon: "bi-robot" },
];
</script>

<style scoped>
/* keep the highlighted phrase on one line so a CJK title never splits mid-phrase */
.fit-section :deep(.section-title .highlight) {
  display: inline-block;
}

.fit-card {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
}

.fit-icon {
  display: inline-block;
  font-size: 1.6rem;
  color: var(--primary-color);
  margin-bottom: 0.75rem;
}

.fit-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.fit-card-desc {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.7;
}

.fit-cta {
  margin-top: 2.5rem;
  text-align: center;
}

.fit-cta-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.fit-cta-desc {
  max-width: 560px;
  margin: 0 auto 1.5rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

.fit-cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

@media (max-width: 575.98px) {
  .fit-card {
    padding: 1.1rem;
  }
  .fit-card-title {
    font-size: 1rem;
  }
  .fit-card-desc {
    font-size: 0.85rem;
    line-height: 1.6;
  }
  .fit-cta-actions .btn {
    width: 100%;
  }
}
</style>
