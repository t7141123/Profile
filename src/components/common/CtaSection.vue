<template>
  <section class="section cta-section no-divider" :class="`cta-${variant}`">
    <div v-if="variant === 'rich'" class="aurora-glow" aria-hidden="true"></div>
    <div class="container">
      <div class="cta-content text-center" v-inview="{ variant: 'scale' }">
        <h2 class="cta-title">{{ title }}</h2>
        <p class="cta-description">
          <template v-for="(line, i) in lines" :key="i">
            <br v-if="i > 0" />{{ line }}
          </template>
        </p>
        <a
          :href="contact.line"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-rainbow btn-lg"
          v-ripple
          v-magnetic
        >
          <i class="bi bi-line me-2"></i>{{ buttonText }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { contact } from "@/config/contact";

defineProps({
  title: { type: String, required: true },
  // Description paragraphs rendered with a line break between each item
  lines: { type: Array, default: () => [] },
  buttonText: { type: String, required: true },
  // "rich" adds the aurora glow and display typography; "plain" is the compact style
  variant: { type: String, default: "plain", validator: (v) => ["rich", "plain"].includes(v) },
});
</script>

<style scoped>
.cta-section {
  background: var(--gradient-hero);
  border-radius: var(--radius-xl);
  margin: 6rem auto 4rem;
  max-width: 1200px;
  border: 1px solid rgba(139, 94, 60, 0.1);
  box-shadow: var(--shadow-xl);
  padding: 5rem 2rem;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-title {
  color: var(--text-primary);
}

/* Rich variant (home) */
.cta-rich {
  position: relative;
  overflow: hidden;
}

.cta-rich::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 10% 50%, rgba(139, 94, 60, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 90% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.cta-rich .aurora-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  height: 100%;
}

.cta-rich .cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}

.cta-rich .cta-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

/* Plain variant (services) */
.cta-plain .cta-title {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.cta-plain .cta-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin: 0 auto 2.5rem;
  max-width: 600px;
}
</style>
