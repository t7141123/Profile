<template>
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
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
</script>

<style scoped>
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
}
</style>
