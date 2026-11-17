<template>
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">{{ $t("services.techBadge") }}</span>
        <h2 class="section-title">
          {{ $t("services.techTitle")
          }}<span class="highlight">{{
            $t("services.techTitleHighlight")
          }}</span>
        </h2>
        <p class="section-description">
          {{ $t("services.techDescription") }}
        </p>
      </div>

      <div class="tech-marquee-container prog-fade-t">
        <!-- Row 1: Scroll Left -->
        <div class="tech-marquee-row">
          <div class="marquee-track scroll-left">
            <div
              class="tech-logo-item"
              v-for="(tech, index) in duplicatedTechRow1"
              :key="`row1-${index}`"
            >
              <div class="tech-logo">
                <img
                  v-if="tech.img"
                  :src="tech.img"
                  :alt="tech.name"
                  class="tech-logo-img"
                  loading="lazy"
                />
                <i v-else :class="tech.icon"></i>
              </div>
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
          <!-- Duplicate content for seamless loop is handled by the array itself -->
        </div>

        <!-- Row 2: Scroll Right -->
        <div class="tech-marquee-row">
          <div class="marquee-track scroll-right">
            <div
              class="tech-logo-item"
              v-for="(tech, index) in duplicatedTechRow2"
              :key="`row2-${index}`"
            >
              <div class="tech-logo">
                <img
                  v-if="tech.img"
                  :src="tech.img"
                  :alt="tech.name"
                  class="tech-logo-img"
                  loading="lazy"
                />
                <i v-else :class="tech.icon"></i>
              </div>
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

// Technology logos - using local imports for better performance
// Images are copied to dist/images/tech/ during build
const techLogoPath = '/images/tech/'

const technologies = [
  { name: "Vue.js", img: `${techLogoPath}vuejs-original.svg` },
  { name: "React", img: `${techLogoPath}react-original.svg` },
  { name: "JavaScript", img: `${techLogoPath}javascript-original.svg` },
  { name: "Node.js", img: `${techLogoPath}nodejs-original.svg` },
  { name: "TypeScript", img: `${techLogoPath}typescript-original.svg` },
  { name: "Tailwind", img: `${techLogoPath}tailwindcss-original.svg` },
  { name: "Bootstrap", img: `${techLogoPath}bootstrap-original.svg` },
  { name: "C++", img: `${techLogoPath}cplusplus-original.svg` },
  { name: "Python", img: `${techLogoPath}python-original.svg` },
  { name: "PHP", img: `${techLogoPath}php-original.svg` },
  { name: "MySQL", img: `${techLogoPath}mysql-original.svg` },
  { name: "PostgreSQL", img: `${techLogoPath}postgresql-original.svg` },
  { name: "MongoDB", img: `${techLogoPath}mongodb-original.svg` },
  { name: "Git", img: `${techLogoPath}git-original.svg` },
  { name: "Docker", img: `${techLogoPath}docker-original.svg` },
  { name: "Line API", icon: "bi bi-chat-dots-fill" },
];

// Split technologies into two rows
const splitIndex = Math.ceil(technologies.length / 2);
const techRow1 = technologies.slice(0, splitIndex);
const techRow2 = technologies.slice(splitIndex);

// Duplicate arrays to create seamless loop effect (need enough items to fill screen width + buffer)
// Repeating 4 times ensures enough content for wide screens
const duplicateArray = (arr) => [...arr, ...arr, ...arr, ...arr];

const duplicatedTechRow1 = computed(() => duplicateArray(techRow1));
const duplicatedTechRow2 = computed(() => duplicateArray(techRow2));
</script>

<style scoped>
.tech-marquee-container {
  overflow: hidden;
  position: relative;
  max-width: 100%;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  /* Increase padding to prevent hover clipping */
  padding: 2rem 0;
}

.tech-marquee-row {
  display: flex;
  margin-bottom: 2rem;
  overflow: visible; /* Allow hover transform */
}

.tech-marquee-row:last-child {
  margin-bottom: 0;
}

.marquee-track {
  display: flex;
  gap: 3rem; /* Spacing between items */
  width: max-content;
}

.marquee-track.scroll-left {
  animation: scrollLeft 80s linear infinite;
}

/* Start from -50% so it scrolls right to 0 */
.marquee-track.scroll-right {
  animation: scrollRight 80s linear infinite;
  transform: translateX(-50%);
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scrollRight {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Hover Pauses Animation */
.tech-marquee-container:hover .marquee-track {
  animation-play-state: paused;
}

.tech-logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100px;
  flex-shrink: 0; /* Prevent shrinking */
  cursor: default;
}

.tech-logo {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(139, 94, 60, 0.1);
  border: 1px solid rgba(139, 94, 60, 0.2);
  border-radius: var(--radius-lg);
  font-size: 2rem;
  color: var(--primary-color);
  transition: var(--transition-base);
}

.tech-logo-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.tech-logo-item:hover .tech-logo {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(139, 94, 60, 0.3);
}

.tech-name {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}
</style>
