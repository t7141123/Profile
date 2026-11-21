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

      <div class="row g-4">
        <div class="col-md-6" v-inview="{ delay: 0 }">
          <div class="fit-card h-100">
            <h3 class="fit-card-title">
              <i class="bi bi-check-circle-fill fit-icon fit-yes" aria-hidden="true"></i>
              {{ $t("home.fit.yesTitle") }}
            </h3>
            <ul class="fit-list">
              <li v-for="item in yes" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6" v-inview="{ delay: 90 }">
          <div class="fit-card h-100">
            <h3 class="fit-card-title">
              <i class="bi bi-arrow-repeat fit-icon fit-no" aria-hidden="true"></i>
              {{ $t("home.fit.noTitle") }}
            </h3>
            <ul class="fit-list">
              <li v-for="item in no" :key="item">{{ item }}</li>
            </ul>
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
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import SectionHeader from "@/components/common/SectionHeader.vue";
import { contact } from "@/config/contact";
import { useLocale } from "@/composables/useLocale";

const { tm, rt } = useI18n();
const { localePath } = useLocale();

const yes = computed(() => tm("home.fit.yes").map((m) => rt(m)));
const no = computed(() => tm("home.fit.no").map((m) => rt(m)));
</script>

<style scoped>
.fit-card {
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
}

.fit-card-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.fit-icon {
  font-size: 1.3rem;
}

.fit-yes {
  color: var(--primary-color);
}

.fit-no {
  color: var(--text-muted);
}

.fit-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.fit-list li {
  color: var(--text-secondary);
  line-height: 1.7;
  padding-left: 1.1rem;
  position: relative;
}

.fit-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.8em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--primary-color);
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
    padding: 1.5rem;
  }
  .fit-cta-actions .btn {
    width: 100%;
  }
}
</style>
