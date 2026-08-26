<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <TechBackground />
      <div class="ark-scene" aria-hidden="true">
        <div ref="arkDrift" class="ark-drift">
          <img :src="arkImg" class="ark-home" alt="" />
        </div>
        <div ref="waterRise" class="water-rise">
          <svg class="water-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="rgba(233,213,172,0.18)" d="M0,150 C240,90 480,210 720,150 C960,90 1200,210 1440,150 L1440,320 L0,320 Z"/>
            <path fill="rgba(233,213,172,0.28)" d="M0,210 C240,150 480,270 720,210 C960,150 1200,270 1440,210 L1440,320 L0,320 Z"/>
            <path fill="rgba(233,213,172,0.40)" d="M0,270 C240,220 480,310 720,270 C960,230 1200,310 1440,270 L1440,320 L0,320 Z"/>
            <path fill="none" stroke="rgba(244,226,187,0.70)" stroke-width="2.5" d="M0,150 C240,90 480,210 720,150 C960,90 1200,210 1440,150"/>
          </svg>
        </div>
      </div>
      <div class="meteor-area">
        <span class="meteor" style="--mtd: 0s; --mtdu: 11s; --mty: 8%; --mtx: 92%;"></span>
        <span class="meteor" style="--mtd: 6s; --mtdu: 12.5s; --mty: 20%; --mtx: 97%;"></span>
        <span class="meteor" style="--mtd: 12s; --mtdu: 11.5s; --mty: 32%; --mtx: 86%;"></span>
      </div>

      <div class="container hero-centered">
        <div class="hero-content">
          <h1 class="hero-title">
            {{ $t("home.title") }}<br />
            <span class="highlight" v-scramble>{{ $t("footer.brand") }}</span>
          </h1>

          <p class="hero-subtitle" v-reveal>
            {{ $t("home.subtitle") }}<br />
            {{ $t("home.subtitle2") }}
          </p>

          <div class="hero-buttons">
            <router-link to="/portfolio" class="btn btn-primary-custom" v-ripple v-magnetic>
              <i class="bi bi-collection me-2"></i
              >{{ $t("home.viewWorks") }}
            </router-link>
            <a
              href="https://line.me/ti/p/2w7bwfksdF"
              target="_blank"
              class="btn btn-primary-custom"
              v-ripple
              v-magnetic
            >
              <i class="bi bi-line me-2"></i>{{ $t("home.addLine") }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Marquee Band -->
    <div class="marquee-band" aria-hidden="true">
      <div class="marquee-track">
        <template v-for="n in 2">
          <span
            v-for="(item, i) in marqueeItems"
            :key="`${n}-${i}`"
            class="marquee-item"
          >
            {{ item }}<i class="bi bi-asterisk"></i>
          </span>
        </template>
      </div>
    </div>

    <!-- Stats Section -->
    <section class="section stats-section" id="home-stats">
      <div class="container">
        <div class="stats-panel border-beam" v-inview="{ variant: 'scale' }">
          <div class="row g-0">
            <div
              class="col-6 col-lg-3 stat-cell"
              v-for="(s, i) in stats"
              :key="s.id"
            >
              <div class="stat-value" v-count="{ value: s.value, suffix: s.suffix }"></div>
              <div class="stat-label">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Bento Section -->
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

    <!-- Featured Projects Section -->
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

    <!-- Testimonials -->
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

    <!-- CTA Section -->
    <section class="section cta-section no-divider">
      <div class="aurora-glow" aria-hidden="true"></div>
      <div class="container">
        <div class="cta-content text-center" v-inview="{ variant: 'scale' }">
          <h2 class="cta-title">{{ $t("home.ctaTitle") }}</h2>
          <p class="cta-description">
            {{ $t("home.ctaDescription") }}<br />
            {{ $t("home.ctaDescription2") }}
          </p>
          <a
            href="https://line.me/ti/p/2w7bwfksdF"
            target="_blank"
            class="btn btn-rainbow btn-lg"
            v-ripple
            v-magnetic
          >
            <i class="bi bi-line me-2"></i>{{ $t("home.ctaButton") }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import SectionHeader from "@/components/common/SectionHeader.vue";
import TechBackground from "@/components/home/TechBackground.vue";
import PortfolioCard from "@/components/common/PortfolioCard.vue";
import { useProjects } from "@/composables/useProjects";
import arkImg from "@/assets/images/ark-hero.svg?url";

const { t } = useI18n();
const { getFeaturedProjects } = useProjects();

const arkDrift = ref(null);
const waterRise = ref(null);
let waterH = 0;
let rafId = 0;
let reduceMotion = false;

const measureWater = () => {
  waterH = waterRise.value ? waterRise.value.offsetHeight : 0;
};

const updateDrift = () => {
  rafId = 0;
  const vh = window.innerHeight || 1;
  const p = Math.min(Math.max(window.scrollY / (vh * 0.85), 0), 1);
  if (waterRise.value) {
    const waterY = ((25 - p * 45) / 100) * waterH;
    waterRise.value.style.transform = `translateY(${waterY}px)`;
  }
  if (arkDrift.value) {
    const arkY = (p * 45 * 1.15 * waterH) / -100;
    arkDrift.value.style.transform = `translate(${14 - p * 44}%, ${arkY}px)`;
  }
};

const onScroll = () => {
  if (reduceMotion || rafId) return;
  rafId = requestAnimationFrame(updateDrift);
};

const onResize = () => {
  measureWater();
  if (!reduceMotion) onScroll();
};

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  measureWater();
  if (!reduceMotion) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    updateDrift();
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  if (rafId) cancelAnimationFrame(rafId);
});

const FEATURED_KEYS = ["actionLead", "clay", "nhm", "uvaco", "generalErp", "chordBook"];
const featuredProjects = computed(() => {
  const all = getFeaturedProjects();
  return FEATURED_KEYS.map((k) => all.find((p) => p.key === k)).filter(Boolean);
});

const services = computed(() => [
  {
    id: 4,
    icon: "bi bi-code-square",
    title: t("home.services.custom"),
    description: t("home.services.customDesc"),
    gradient: "linear-gradient(135deg, #6B4226 0%, #8B5E3C 100%)",
  },
  {
    id: 1,
    icon: "bi bi-globe",
    title: t("home.services.corporate"),
    description: t("home.services.corporateDesc"),
    gradient: "linear-gradient(135deg, #8B5E3C 0%, #A4785A 100%)",
  },
  {
    id: 2,
    icon: "bi bi-speedometer2",
    title: t("home.services.operations"),
    description: t("home.services.operationsDesc"),
    gradient: "linear-gradient(135deg, #A4785A 0%, #C89B6D 100%)",
  },
  {
    id: 3,
    icon: "bi bi-calendar-event",
    title: t("home.services.events"),
    description: t("home.services.eventsDesc"),
    gradient: "linear-gradient(135deg, #C89B6D 0%, #E3C9A8 100%)",
  },
]);

const marqueeItems = computed(() => [
  t("home.why.customTitle"),
  t("home.why.outsourceTitle"),
  t("home.why.integrationTitle"),
  t("home.services.corporate"),
  t("home.services.operations"),
  t("home.services.events"),
  "LINE Bot × AI",
  "UI/UX",
]);

const stats = computed(() => [
  { id: 1, value: 9, suffix: "+", label: t("home.stats.years") },
  { id: 2, value: 14, suffix: "+", label: t("home.stats.projects") },
  { id: 3, value: 11, suffix: "", label: t("home.stats.langs") },
  { id: 4, value: 100, suffix: "%", label: t("home.stats.tailored") },
]);

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
/* Hero layout */
.hero-centered {
  position: relative;
  z-index: 5;
}

/* ── Ark scene (scroll-driven) ── */
.ark-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.ark-drift {
  position: absolute;
  left: 50%;
  bottom: -8%;
  width: min(94vw, 1320px);
  margin-left: calc(min(94vw, 1320px) / -2);
  transform: translate(14%, 0);
  will-change: transform;
}

.ark-home {
  display: block;
  width: 100%;
  aspect-ratio: 1200 / 650;
  opacity: 0.38;
  animation: ark-sail 26s ease-in-out infinite;
}

.water-rise {
  position: absolute;
  left: -4%;
  right: -4%;
  bottom: -30px;
  transform: translateY(25%);
  will-change: transform;
}

.water-svg {
  display: block;
  width: 100%;
  height: auto;
  animation: water-sway 9s ease-in-out infinite alternate;
}

@keyframes water-sway {
  from { transform: translateX(-1.1%) translateY(0.5%); }
  to   { transform: translateX(1.1%) translateY(-0.7%); }
}

@media (max-width: 991.98px) {
  .ark-drift {
    width: min(115vw, 640px);
    margin-left: calc(min(115vw, 640px) / -2);
    bottom: -6%;
  }

  .water-svg {
    height: clamp(130px, 24vh, 220px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ark-home {
    animation: none;
  }
}

/* Featured Projects Section */
.featured-projects-section {
  padding-bottom: 4rem;
}

/* ── Marquee band ── */
.marquee-band {
  overflow: hidden;
  /* no backdrop-filter here: iOS Safari oversamples it behind rotated
     elements and smears a large blurred rect over the hero */
  background: rgba(56, 90, 118, 0.55);
  border-top: 1px solid rgba(200, 155, 109, 0.35);
  border-bottom: 1px solid rgba(200, 155, 109, 0.35);
  /* rotate only — no scale(): scaling rasterized text causes jagged edges;
     negative margins widen the band instead so rotated corners stay covered */
  transform: rotate(-1.2deg);
  margin: -1.5rem -2vw 0;
  padding: 1.05rem 0;
  position: relative;
  z-index: 6;
  box-shadow: 0 14px 34px rgba(20, 32, 44, 0.35);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 40s linear infinite;
}

.marquee-band:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}

.marquee-item i {
  margin: 0 1.6rem;
  font-size: 0.7rem;
  opacity: 0.75;
}

@keyframes marquee {
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
  .chip-float { animation: none; }
  .water-svg { animation: none; }
}

/* ── Bento services ── */
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

/* Stats Panel */
.stats-section {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: -1rem;
}

.stats-panel {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.stat-cell {
  padding: 2rem 1rem;
  text-align: center;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.stat-cell:nth-child(2n) { border-right: none; }
.stat-cell:nth-last-child(-n + 2) { border-bottom: none; }

@media (min-width: 992px) {
  .stat-cell { border-bottom: none; }
  .stat-cell:last-child { border-right: none; }
}

.stat-value {
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 4vw, 2.9rem);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.35rem;
}

/* Why Ark Studio — warm band */
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

/* CTA Section - More visual separation */
.cta-section {
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  margin: 6rem auto 4rem;
  max-width: 1200px;
  border: 1px solid rgba(139, 94, 60, 0.1);
  box-shadow: var(--shadow-xl);
  padding: 5rem 2rem;
}

.cta-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 10% 50%,
      rgba(139, 94, 60, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 90% 50%,
      rgba(124, 58, 237, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.cta-section .aurora-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  height: 100%;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.cta-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}


</style>
