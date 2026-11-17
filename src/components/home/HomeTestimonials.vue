<template>
  <section class="section why-section">
    <div class="container">
      <SectionHeader
        index="03"
        :badge="$t('about.testimonialsBadge')"
        :title="$t('about.testimonialsTitle')"
        :highlight="$t('about.testimonialsTitleHighlight')"
      />

      <div class="row g-4 justify-content-center">
        <div
          class="col-md-6 col-lg-4"
          v-for="(item, i) in testimonials"
          :key="i"
          v-inview="{ delay: i * 100 }"
        >
          <div class="testimonial-card glass-card h-100 border-beam spotlight-card crd-hard" v-spotlight>
            <div class="t-top">
              <div class="t-quote" aria-hidden="true">
                <i class="bi bi-quote"></i>
              </div>
              <span class="t-icon-chip" aria-hidden="true">
                <i :class="item.icon"></i>
              </span>
            </div>
            <p class="t-text">{{ item.text }}</p>
            <div class="t-author">
              <span class="t-avatar" aria-hidden="true">{{ item.author.charAt(0) }}</span>
              <div class="t-meta">
                <strong>{{ item.author }}</strong>
                <span>{{ item.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import SectionHeader from "@/components/common/SectionHeader.vue";

const { t } = useI18n();

const TESTIMONIAL_ICONS = [
  "bi bi-calendar2-check",
  "bi bi-bag-check",
  "bi bi-clipboard-data",
];

const testimonials = computed(() =>
  [1, 2, 3].map((n) => ({
    icon: TESTIMONIAL_ICONS[n - 1],
    text: t(`about.testimonials.t${n}Text`),
    author: t(`about.testimonials.t${n}Author`),
    role: t(`about.testimonials.t${n}Role`),
  }))
);
</script>

<style scoped>
.why-section {
  position: relative;
}

.why-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(139, 94, 60, 0.045) 18%,
    rgba(139, 94, 60, 0.045) 82%,
    transparent 100%
  );
  pointer-events: none;
}

.why-section .container {
  position: relative;
  z-index: 1;
}

/* Testimonial cards */
.testimonial-card {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.t-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.t-icon-chip {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(200, 155, 109, 0.12);
  border: 1px solid rgba(200, 155, 109, 0.4);
  color: var(--primary-light);
  font-size: 1.2rem;
  flex-shrink: 0;
}

.t-quote {
  font-size: 2.4rem;
  line-height: 1;
  color: var(--primary-color);
  opacity: 0.35;
  margin-bottom: 1rem;
}

.t-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.85;
  margin: 0 0 1.4rem;
  flex: 1;
}

.t-author {
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid var(--border-color);
  padding-top: 1.1rem;
}

.t-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.t-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.4;
}

.t-meta strong {
  color: var(--text-primary);
  font-size: 0.93rem;
  font-weight: 700;
}

.t-meta span {
  color: var(--text-muted);
  font-size: 0.8rem;
}
</style>
