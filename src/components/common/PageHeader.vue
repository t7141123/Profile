<template>
  <section class="page-header" :class="[headerClass, `variant-${variant}`]">
    <div v-if="variant === 'center'" class="header-bg-pattern"></div>
    <div
      v-if="variant === 'center' || variant === 'portfolio' || variant === 'services'"
      class="header-orb header-orb-1"
    ></div>
    <div
      v-if="variant === 'center' || variant === 'about' || variant === 'contact'"
      class="header-orb header-orb-2"
    ></div>

    <span
      v-if="ghost"
      class="ghost-word"
      aria-hidden="true"
    >{{ ghost }}</span>

    <!-- ABOUT — split editorial with portrait -->
    <div v-if="variant === 'about'" class="container about-hero-wrap">
      <div class="row align-items-center g-5">
        <div class="col-lg-5" v-inview="{ variant: 'left' }">
          <div class="about-portrait">
            <img
              :src="image"
              alt="David"
              width="520"
              height="640"
              loading="eager"
              decoding="async"
            />
            <span class="portrait-frame" aria-hidden="true"></span>
            <span class="portrait-chip" aria-hidden="true">
              <i class="bi bi-patch-check-fill"></i> 9+ {{ $t('about.yearsExp') }}
            </span>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="hero-copy">
            <span v-if="badge" class="section-badge">{{ badge }}</span>
            <h1 class="page-title" v-reveal>
              {{ title }}<span class="highlight">{{ highlight }}</span>
            </h1>
            <div class="title-bar" aria-hidden="true"></div>
            <p v-if="description" class="page-description" v-reveal>
              {{ description }}
            </p>
            <div class="header-custom-content"><slot></slot></div>
          </div>
        </div>
      </div>
    </div>

    <!-- PORTFOLIO / SERVICES — dark editorial with aside -->
    <div
      v-else-if="variant === 'portfolio' || variant === 'services'"
      class="container dark-hero-wrap"
    >
      <div class="row align-items-center g-5">
        <div class="col-lg-7">
          <div class="hero-copy">
            <span v-if="badge" class="section-badge section-badge-light">{{ badge }}</span>
            <h1 class="page-title" v-reveal>
              {{ title }}<span class="highlight">{{ highlight }}</span>
            </h1>
            <div class="title-bar" aria-hidden="true"></div>
            <p v-if="description" class="page-description" v-reveal>
              {{ description }}
            </p>
            <div class="header-custom-content"><slot></slot></div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="hero-aside"><slot name="aside"></slot></div>
        </div>
      </div>
    </div>

    <!-- CONTACT — warm centered -->
    <div v-else-if="variant === 'contact'" class="container contact-hero-wrap">
      <div class="hero-copy text-center mx-auto">
        <span v-if="badge" class="section-badge">{{ badge }}</span>
        <h1 class="page-title" v-reveal>
          {{ title }}<span class="highlight">{{ highlight }}</span>
        </h1>
        <div class="title-bar" aria-hidden="true"></div>
        <p v-if="description" class="page-description" v-reveal>
          {{ description }}
        </p>
        <div class="header-custom-content"><slot></slot></div>
      </div>
    </div>

    <!-- CENTER — default -->
    <div v-else class="container">
      <div class="row align-items-center">
        <div class="col-12 text-center">
          <span
            v-if="badge"
            class="section-badge animate-fade-in"
            :class="{ 'section-badge-light': isLight }"
          >
            {{ badge }}
          </span>
          <h1 class="page-title animate-fade-in-up" v-reveal>
            {{ title }}<span class="highlight">{{ highlight }}</span>
          </h1>
          <p
            v-if="description"
            class="page-description animate-fade-in-up delay-1"
            v-reveal
          >
            {{ description }}
          </p>
          <div class="header-custom-content animate-fade-in-up delay-2">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showScrollIndicator && variant !== 'about'"
      class="scroll-indicator animate-bounce"
      @click="$emit('scroll-click')"
    >
      <i class="bi bi-chevron-down"></i>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  badge: String,
  title: String,
  highlight: String,
  description: String,
  headerClass: String,
  variant: {
    type: String,
    default: 'center',
  },
  image: {
    type: String,
    default: '',
  },
  isLight: {
    type: Boolean,
    default: true,
  },
  showScrollIndicator: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['scroll-click']);

const ghost = computed(() => {
  const map = {
    portfolio: 'PORTFOLIO',
    services: 'SERVICES',
    contact: 'CONTACT',
  };
  return map[props.variant] || '';
});
</script>

<style scoped>
/* Page Header — Clean & Professional */
.page-header {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 140px 0 120px;
  background: linear-gradient(135deg, #1E293B 0%, #334155 50%, #475569 100%);
  color: #F1F5F9;
}

/* Subtle Grid Pattern */
.header-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

.header-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: float 30s ease-in-out infinite;
}

.header-orb-1 {
  top: -10%;
  right: -5%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%);
}

.header-orb-2 {
  bottom: -15%;
  left: -10%;
  width: 40vw;
  height: 40vw;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.08) 50%, transparent 70%);
  animation-delay: -15s;
}

.page-header-about::before,
.page-header-services::before,
.page-header-portfolio::before,
.page-header-contact::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Page description */
.page-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.header-custom-content {
  margin-top: 1.5rem;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #F1F5F9;
  animation: bounce 2s ease-in-out infinite;
  cursor: pointer;
  transition: all var(--transition-base);
  backdrop-filter: blur(10px);
}

.scroll-indicator:hover {
  border-color: var(--primary-color);
  background: rgba(37, 99, 235, 0.2);
  color: white;
  transform: translateX(-50%) translateY(5px);
}

/* Light Variant Styles */
.section-badge-light {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #F1F5F9;
}

.page-title-light {
  color: #F1F5F9;
}

.page-title-light .highlight {
  background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description-light {
  color: #CBD5E1;
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.8s ease forwards;
  opacity: 0;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}

.delay-1 { animation-delay: 0.15s; }
.delay-2 { animation-delay: 0.3s; }

@keyframes fadeIn { to { opacity: 1; } }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-10px) translateX(-50%); }
  60% { transform: translateY(-5px) translateX(-50%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

/* Responsive */
@media (max-width: 767.98px) {
  .page-header {
    min-height: 60vh;
    padding: 100px 0 60px;
  }
}

/* ===================================
   Shared hero-copy primitives
   =================================== */
.hero-copy { position: relative; z-index: 2; }

.hero-copy .page-title,
.variant-portfolio .page-title,
.variant-services .page-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
}

.hero-copy .title-bar {
  width: 72px;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, #2563EB 0%, #8B5CF6 45%, #F59E0B 100%);
  margin: 0 0 1.5rem;
}

.hero-copy .title-bar::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
  filter: blur(6px);
  opacity: 0.5;
}

.variant-contact .title-bar { margin-left: auto; margin-right: auto; }

.ghost-word {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-display);
  font-size: clamp(4.5rem, 17vw, 13rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

/* ===================================
   ABOUT — warm split editorial
   =================================== */
.variant-about {
  background:
    radial-gradient(900px 600px at 90% 10%, rgba(245, 158, 11, 0.10), transparent 60%),
    radial-gradient(700px 500px at 0% 90%, rgba(37, 99, 235, 0.06), transparent 55%),
    var(--bg-primary);
  color: var(--text-primary);
  min-height: auto;
  padding: 150px 0 90px;
}

.variant-about .page-description {
  color: var(--text-secondary);
  margin: 0 0 1.5rem;
  max-width: 560px;
}

.variant-about .section-badge {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.28);
  color: #B45309;
}

[data-theme='dark'] .variant-about .section-badge {
  background: rgba(245, 158, 11, 0.14);
  color: #FBBF24;
}

.variant-about .page-title {
  color: var(--text-primary);
}

.variant-about .page-title .highlight {
  background: var(--gradient-gold-deep);
  -webkit-background-clip: text;
  background-clip: text;
}

[data-theme='dark'] .variant-about .page-title .highlight {
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  background-clip: text;
}

.about-portrait {
  position: relative;
  max-width: 420px;
  margin: 0 auto;
}

.about-portrait img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  display: block;
  position: relative;
  z-index: 1;
  box-shadow: var(--shadow-xl);
}

.portrait-frame {
  position: absolute;
  inset: 0;
  transform: translate(16px, 16px);
  border-radius: var(--radius-xl);
  border: 2px solid rgba(245, 158, 11, 0.55);
  z-index: 0;
}

.portrait-chip {
  position: absolute;
  left: 50%;
  bottom: -18px;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-primary);
  white-space: nowrap;
  z-index: 2;
}

.portrait-chip i { color: #F59E0B; }

/* ===================================
   PORTFOLIO / SERVICES — dark editorial
   =================================== */
.variant-portfolio,
.variant-services {
  background:
    radial-gradient(1000px 650px at 85% 15%, rgba(245, 158, 11, 0.10), transparent 60%),
    radial-gradient(800px 550px at 5% 85%, rgba(37, 99, 235, 0.14), transparent 55%),
    linear-gradient(135deg, #14151A 0%, #1D1C22 100%);
  color: #F7F4EF;
}

.variant-portfolio .ghost-word,
.variant-services .ghost-word {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.07);
}

.variant-portfolio .page-title,
.variant-services .page-title {
  color: #F7F4EF;
}

.variant-portfolio .page-title .highlight,
.variant-services .page-title .highlight {
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  background-clip: text;
}

.variant-portfolio .page-description,
.variant-services .page-description {
  color: #C9C3B8;
  margin: 0 0 1rem;
  max-width: 560px;
}

.variant-portfolio .header-bg-pattern,
.variant-services .header-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

/* ===================================
   CONTACT — warm centered
   =================================== */
.variant-contact {
  background:
    radial-gradient(900px 600px at 12% 15%, rgba(245, 158, 11, 0.12), transparent 60%),
    radial-gradient(800px 550px at 88% 85%, rgba(37, 99, 235, 0.07), transparent 55%),
    linear-gradient(180deg, var(--bg-primary) 0%, #FFF6E3 50%, var(--bg-primary) 100%);
  color: var(--text-primary);
}

[data-theme='dark'] .variant-contact {
  background:
    radial-gradient(900px 600px at 12% 15%, rgba(245, 158, 11, 0.10), transparent 60%),
    radial-gradient(800px 550px at 88% 85%, rgba(37, 99, 235, 0.10), transparent 55%),
    linear-gradient(180deg, var(--bg-primary) 0%, #241E12 50%, var(--bg-primary) 100%);
}

.variant-contact .ghost-word {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(180, 83, 9, 0.14);
}

[data-theme='dark'] .variant-contact .ghost-word {
  -webkit-text-stroke: 1.5px rgba(251, 191, 36, 0.10);
}

.variant-contact .page-title { color: var(--text-primary); }

.variant-contact .page-title .highlight {
  background: var(--gradient-gold-deep);
  -webkit-background-clip: text;
  background-clip: text;
}

[data-theme='dark'] .variant-contact .page-title .highlight {
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  background-clip: text;
}

.variant-contact .page-description {
  color: var(--text-secondary);
}

.variant-contact .section-badge {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.28);
  color: #B45309;
}

[data-theme='dark'] .variant-contact .section-badge {
  color: #FBBF24;
}

.variant-contact .scroll-indicator {
  border-color: rgba(96, 74, 40, 0.3);
  color: var(--text-secondary);
}

[data-theme='dark'] .variant-contact .scroll-indicator {
  border-color: rgba(255, 244, 224, 0.25);
  color: #C9C3B8;
}

@media (max-width: 767.98px) {
  .variant-about { padding: 120px 0 70px; }
  .portrait-chip { font-size: 0.8rem; padding: 0.45rem 0.9rem; }
}
</style>
