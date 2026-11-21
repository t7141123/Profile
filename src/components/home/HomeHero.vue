<template>
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
          <template v-for="(seg, i) in titleSegments" :key="i"><span class="title-seg">{{ seg }}</span>{{ " " }}<br v-if="/[？?]$/.test(seg)" /></template><br />
          <span class="highlight" v-scramble>{{ $t("footer.brand") }}</span>
        </h1>

        <p class="hero-subtitle" v-reveal>
          {{ $t("home.subtitle") }}<br class="hero-subtitle2" />
          <span class="hero-subtitle2">{{ $t("home.subtitle2") }}</span>
        </p>

        <div class="hero-buttons">
          <a
            :href="contact.line"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary-custom"
            v-ripple
            v-magnetic
          >
            <i class="bi bi-line me-2"></i>{{ $t("home.heroCta") }}
          </a>
          <router-link to="/portfolio" class="btn btn-hero-ghost" v-ripple>
            {{ $t("home.viewWorks") }}<i class="bi bi-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import TechBackground from "@/components/home/TechBackground.vue";
import arkImg from "@/assets/images/ark-hero.svg?url";
import { contact } from "@/config/contact";

const { t } = useI18n();
// Split the headline at punctuation so lines wrap between phrases, never leaving a lone trailing character
const titleSegments = computed(() => t("home.title").split(/(?<=[？?，,。.])/).map((l) => l.trim()).filter(Boolean));

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

@media (prefers-reduced-motion: reduce) {
  .water-svg { animation: none; }
}

.title-seg {
  display: inline-block;
}

.btn-hero-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.75rem;
  background: transparent;
  border: 1.5px solid rgba(247, 244, 239, 0.45);
  border-radius: var(--radius-full, 999px);
  color: #f7f4ef;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.btn-hero-ghost:hover,
.btn-hero-ghost:focus-visible {
  background: rgba(247, 244, 239, 0.12);
  border-color: rgba(247, 244, 239, 0.8);
  color: #fff;
}

/* Phones: keep only the headline, one short line and a single clear action */
@media (max-width: 575.98px) {
  .hero-subtitle2 {
    display: none;
  }
  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  .hero-buttons .btn {
    width: 100%;
    flex: none;
    font-size: 1rem;
  }
}
</style>
