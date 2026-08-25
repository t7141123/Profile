<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section" @mousemove="onHeroMove">
      <TechBackground />
      <div class="meteor-area">
        <span class="meteor" style="--mtd: 0s; --mty: 5%; --mtx: 85%;"></span>
        <span class="meteor" style="--mtd: 2s; --mty: 18%; --mtx: 92%;"></span>
        <span class="meteor" style="--mtd: 4s; --mty: 35%; --mtx: 78%;"></span>
        <span class="meteor" style="--mtd: 1.5s; --mty: 55%; --mtx: 88%;"></span>
        <span class="meteor" style="--mtd: 3.2s; --mty: 75%; --mtx: 82%;"></span>
      </div>

      <div
        v-for="chip in chips"
        :key="chip.label"
        class="chip-float"
        :style="chip.pos"
        aria-hidden="true"
      >
        <span
          class="hero-chip"
          :style="{ '--d': chip.depth, 'animation-delay': chip.delay }"
        >
          <i :class="chip.icon"></i>{{ chip.label }}
        </span>
      </div>

      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
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
                  class="btn btn-line"
                  v-ripple
                  v-magnetic
                >
                  <i class="bi bi-line me-2"></i>{{ $t("home.addLine") }}
                </a>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="hero-image text-center">
              <div class="hero-visual">
                <OrbitingBadges />
                <div class="code-preview border-beam">
                <div class="code-header">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                  <span class="filename">ark_studio.config.js</span>
                </div>
                <pre
                  class="code-content"
                ><code><span class="keyword">const</span> <span class="variable">yourProject</span> = {
  <span class="property">{{ $t('home.businessPreview.target') }}</span>: <span class="string">"{{ $t('home.businessPreview.targetValue') }}"</span>,
  <span class="property">{{ $t('home.businessPreview.budget') }}</span>: <span class="string">"{{ $t('home.businessPreview.budgetValue') }}"</span>,
  <span class="property">{{ $t('home.businessPreview.timeline') }}</span>: <span class="string">"{{ $t('home.businessPreview.timelineValue') }}"</span>,
  <span class="property">{{ $t('home.businessPreview.result') }}</span>: <span class="string">"{{ $t('home.businessPreview.resultValue') }}"</span>
};</code></pre>
                </div>
              </div>
              </div>
            </div>
          </div>
      </div>
      <a href="#home-stats" class="scroll-hint" aria-hidden="true" tabindex="-1">
        <span class="mouse"><span></span></span>
        {{ $t("home.scrollHint") }}
      </a>
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
            :class="{ large: i === 0 }"
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

    <!-- Why Ark Studio (SEO) -->
    <section class="section why-section">
      <div class="container">
        <SectionHeader
          index="03"
          :badge="$t('home.whyBadge')"
          :title="$t('home.whyTitle')"
          :highlight="$t('home.whyHighlight')"
          :description="$t('home.whyDescription')"
        />

        <div class="row g-4">
          <div
            class="col-md-6 col-lg-4"
            v-for="(w, i) in whyCards"
            :key="w.icon"
            v-inview="{ delay: i * 100 }"
          >
            <div class="why-card glass-card h-100 border-beam spotlight-card" v-spotlight>
              <div class="why-icon">
                <i :class="w.icon"></i>
              </div>
              <h3 class="why-title">{{ w.title }}</h3>
              <p class="why-desc">{{ w.desc }}</p>
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
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import SectionHeader from "@/components/common/SectionHeader.vue";
import TechBackground from "@/components/home/TechBackground.vue";
import OrbitingBadges from "@/components/home/OrbitingBadges.vue";
import PortfolioCard from "@/components/common/PortfolioCard.vue";
import { useProjects } from "@/composables/useProjects";

const { t } = useI18n();
const { getFeaturedProjects } = useProjects();

const featuredProjects = computed(() => getFeaturedProjects().slice(0, 3));

const services = computed(() => [
  {
    id: 4,
    icon: "bi bi-code-square",
    title: t("home.services.custom"),
    description: t("home.services.customDesc"),
    gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
  },
  {
    id: 1,
    icon: "bi bi-globe",
    title: t("home.services.corporate"),
    description: t("home.services.corporateDesc"),
    gradient: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
  },
  {
    id: 2,
    icon: "bi bi-speedometer2",
    title: t("home.services.operations"),
    description: t("home.services.operationsDesc"),
    gradient: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
  },
  {
    id: 3,
    icon: "bi bi-calendar-event",
    title: t("home.services.events"),
    description: t("home.services.eventsDesc"),
    gradient: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
  },
]);

const chips = [
  { label: "Vue.js", icon: "bi bi-lightning-charge", depth: 26, delay: "0s", pos: { top: "18%", left: "4%" } },
  { label: "React", icon: "bi bi-atom", depth: 40, delay: "-3s", pos: { top: "64%", left: "2%" } },
  { label: "Node.js", icon: "bi bi-server", depth: 20, delay: "-6s", pos: { top: "12%", right: "6%" } },
  { label: "Supabase", icon: "bi bi-database", depth: 34, delay: "-2s", pos: { top: "78%", right: "4%" } },
  { label: "Cloudflare", icon: "bi bi-cloud-check", depth: 30, delay: "-4.5s", pos: { top: "40%", right: "1%" } },
  { label: "AI × LINE", icon: "bi bi-robot", depth: 44, delay: "-1.5s", pos: { top: "88%", left: "30%" } },
];

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

const onHeroMove = (e) => {
  const el = e.currentTarget;
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  el.style.setProperty("--mx", x.toFixed(3));
  el.style.setProperty("--my", y.toFixed(3));
};

const stats = computed(() => [
  { id: 1, value: 9, suffix: "+", label: t("home.stats.years") },
  { id: 2, value: 14, suffix: "+", label: t("home.stats.projects") },
  { id: 3, value: 11, suffix: "", label: t("home.stats.langs") },
  { id: 4, value: 100, suffix: "%", label: t("home.stats.tailored") },
]);

const whyCards = computed(() => [
  {
    icon: "bi bi-diagram-3",
    title: t("home.why.customTitle"),
    desc: t("home.why.customDesc"),
  },
  {
    icon: "bi bi-briefcase",
    title: t("home.why.outsourceTitle"),
    desc: t("home.why.outsourceDesc"),
  },
  {
    icon: "bi bi-arrow-repeat",
    title: t("home.why.integrationTitle"),
    desc: t("home.why.integrationDesc"),
  },
]);
</script>

<style scoped>
/* Code Preview Styles - Modern & Clean */
.code-preview {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid rgba(37, 99, 235, 0.1);
  box-shadow: var(--shadow-xl);
  text-align: left;
  max-width: 460px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-visual {
  position: relative;
  display: inline-block;
  width: 100%;
}

.code-header {
  background: var(--bg-accent);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(37, 99, 235, 0.05);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red {
  background: #FF5F57;
}
.dot.yellow {
  background: #FEBC2E;
}
.dot.green {
  background: #28C840;
}

.filename {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.code-content {
  padding: 24px;
  margin: 0;
  font-family: "Fira Code", "Monaco", monospace;
  font-size: 0.875rem;
  line-height: 1.8;
  overflow-x: auto;
  background: var(--bg-secondary);
}

.code-content code {
  color: var(--text-secondary);
}

.keyword {
  color: #8B5CF6; /* Purple */
}
.variable {
  color: #EF4444; /* Red */
}
.property {
  color: #F59E0B; /* Amber */
}
.string {
  color: #10B981; /* Green */
}

/* Featured Projects Section */
.featured-projects-section {
  padding-bottom: 4rem;
}

/* ── Hero chips (mouse parallax + float) ── */
.chip-float {
  position: absolute;
  z-index: 5;
  animation: chipFloat 7s ease-in-out infinite;
  pointer-events: none;
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #e2e8f0;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transform: translate3d(
    calc(var(--mx, 0) * var(--d, 20) * 1px),
    calc(var(--my, 0) * var(--d, 20) * 1px),
    0
  );
  transition: transform 0.1s linear;
  white-space: nowrap;
}

.hero-chip i {
  font-size: 0.85rem;
  color: #60a5fa;
}

@keyframes chipFloat {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -12px; }
}

@media (max-width: 991.98px) {
  .chip-float { display: none; }
}

/* ── Marquee band ── */
.marquee-band {
  overflow: hidden;
  background: linear-gradient(135deg, #F59E0B 0%, #EA8A0C 55%, #D97706 100%);
  transform: rotate(-1.2deg) scale(1.03);
  margin: -1.5rem 0 0;
  padding: 1.05rem 0;
  position: relative;
  z-index: 6;
  box-shadow: 0 14px 34px rgba(217, 119, 6, 0.28);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
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

.bento-card:hover {
  transform: translateY(-6px);
  border-color: rgba(37, 99, 235, 0.35);
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
    rgba(245, 158, 11, 0.055) 18%,
    rgba(245, 158, 11, 0.055) 82%,
    transparent 100%
  );
  pointer-events: none;
}

.why-section .container {
  position: relative;
  z-index: 1;
}

/* Why cards */
.why-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.why-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  background: var(--gradient-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 1.25rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.why-card:hover .why-icon {
  transform: rotate(-8deg) scale(1.08);
}

.why-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.65rem;
}

.why-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.75;
  margin: 0;
}

/* CTA Section - More visual separation */
.cta-section {
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  margin: 6rem auto 4rem;
  max-width: 1200px;
  border: 1px solid rgba(37, 99, 235, 0.1);
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
      rgba(37, 99, 235, 0.12) 0%,
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

.service-card {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  cursor: pointer;
  color: inherit;
}

.service-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card:hover .service-icon {
  transform: rotateY(180deg);
}

.service-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
  color: var(--text-primary);
  line-height: 1.4;
}

.service-link {
  margin-top: auto;
  padding-top: 1rem;
  font-weight: 600;
  color: var(--primary-color);
  font-size: 0.875rem;
}

.service-link i {
  transition: transform 0.3s;
}

.service-card:hover .service-link i {
  transform: translateX(4px);
}

@media (max-width: 991.98px) {
  .code-preview {
    margin-top: 2rem;
  }
}

/* Orbiting stage sits behind the code preview as a halo */
.hero-visual :deep(.orbiting-stage) {
  /* Stage is now absolute-positioned (centered over hero-visual) */
}

@media (max-width: 991.98px) {
  .code-preview {
    margin-top: 0;
  }
}
</style>
