<template>
  <section class="section">
    <div class="container">
      <SectionHeader
        index="01"
        :badge="$t('home.servicesBadge')"
        :title="$t('home.servicesTitle')"
        :highlight="$t('home.servicesTitleHighlight')"
        :description="$t('home.servicesDescription')"
      />

      <div class="bento">
        <router-link
          v-for="(service, i) in services"
          :key="service.id"
          to="/services"
          class="bento-card text-decoration-none"
          :class="{ large: i === 0 || i === 3 }"
          v-inview="{ delay: i * 90 }"
          v-spotlight
        >
          <span class="bento-num" aria-hidden="true">0{{ i + 1 }}</span>
          <div class="bento-body">
            <div class="bento-icon" :style="{ background: service.gradient }">
              <i :class="service.icon"></i>
            </div>
            <h3 class="bento-title">{{ service.title }}</h3>
            <p class="bento-desc">{{ service.description }}</p>
            <span class="bento-link">
              {{ $t("home.learnMore") }}
              <i class="bi bi-arrow-right"></i>
            </span>
          </div>
          <div class="bento-glow" :style="{ background: service.gradient }" aria-hidden="true"></div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import SectionHeader from "@/components/common/SectionHeader.vue";

const { t } = useI18n();

const services = computed(() => [
  {
    id: 1,
    icon: "bi bi-phone",
    title: t("home.services.corporate"),
    description: t("home.services.corporateDesc"),
    gradient: "linear-gradient(135deg, #6B4226 0%, #8B5E3C 100%)",
  },
  {
    id: 2,
    icon: "bi bi-lightning-charge",
    title: t("home.services.operations"),
    description: t("home.services.operationsDesc"),
    gradient: "linear-gradient(135deg, #8B5E3C 0%, #A4785A 100%)",
  },
  {
    id: 3,
    icon: "bi bi-cloud-arrow-up",
    title: t("home.services.events"),
    description: t("home.services.eventsDesc"),
    gradient: "linear-gradient(135deg, #A4785A 0%, #C89B6D 100%)",
  },
  {
    id: 4,
    icon: "bi bi-diagram-3",
    title: t("home.services.custom"),
    description: t("home.services.customDesc"),
    gradient: "linear-gradient(135deg, #C89B6D 0%, #E3C9A8 100%)",
  },
]);
</script>

<style scoped>
.bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.bento-card {
  position: relative;
  display: block;
  border-radius: var(--radius-xl);
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s ease, box-shadow 0.35s ease;
  color: inherit;
}

.bento-card.large {
  grid-column: span 2;
}

/* Large cards: horizontal editorial layout on desktop */
@media (min-width: 992px) {
  .bento-card.large .bento-body {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "icon title"
      "icon desc"
      "icon link";
    column-gap: 1.75rem;
    align-items: start;
  }

  .bento-card.large .bento-icon {
    grid-area: icon;
    width: 76px;
    height: 76px;
    font-size: 1.9rem;
    border-radius: 20px;
  }

  .bento-card.large .bento-title {
    grid-area: title;
    align-self: center;
    font-size: 1.45rem;
    margin-bottom: 0.5rem;
  }

  .bento-card.large .bento-desc {
    grid-area: desc;
    margin-bottom: 1.25rem;
    max-width: 48ch;
  }

  .bento-card.large .bento-link {
    grid-area: link;
    align-self: start;
  }
}

.bento-card:hover {
  transform: translateY(-6px);
  border-color: rgba(139, 94, 60, 0.35);
  box-shadow: var(--shadow-xl);
}

.bento-num {
  position: absolute;
  top: 1.1rem;
  right: 1.4rem;
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  opacity: 0.05;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.bento-body {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.bento-icon {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1.4rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bento-card:hover .bento-icon {
  transform: rotate(-10deg) scale(1.12);
}

.bento-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.7rem;
  letter-spacing: -0.005em;
}

.bento-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
  flex: 1;
}

.bento-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.9rem;
}

.bento-link i {
  transition: transform 0.3s ease;
}

.bento-card:hover .bento-link i {
  transform: translateX(5px);
}

.bento-glow {
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0;
  right: -120px;
  bottom: -140px;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 1;
}

.bento-card:hover .bento-glow {
  opacity: 0.14;
}

@media (max-width: 991.98px) {
  .bento { grid-template-columns: 1fr 1fr; }
  .bento-card.large { grid-column: span 2; }
}

@media (max-width: 767.98px) {
  .bento { grid-template-columns: 1fr; }
  .bento-card.large { grid-column: auto; }
}
</style>
