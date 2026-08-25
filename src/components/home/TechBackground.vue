<template>
  <div class="tech-background">
    <!-- Tech Background Elements -->
    <div class="tech-grid"></div>
    <div class="hexagon-pattern"></div>

    <!-- Glowing Orbs -->
    <div class="glow-orb-1"></div>
    <div class="glow-orb-2"></div>

    <!-- Bottom Fade -->
    <div class="bottom-fade"></div>
  </div>
</template>

<style scoped>
.tech-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

/* Tech grid background */
.tech-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(196, 152, 105, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(196, 152, 105, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: 0 0;
  opacity: 0.4;
}

/* Glowing orbs — single blue hue */
.glow-orb-1 {
  position: absolute;
  top: -15%;
  right: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(139, 94, 60, 0.22) 0%, rgba(107, 66, 38, 0.08) 50%, transparent 70%);
  border-radius: 50%;
  filter: blur(50px);
  animation: techPulse 15s ease-in-out infinite;
}

.glow-orb-2 {
  position: absolute;
  bottom: -20%;
  left: -5%;
  width: 45vw;
  height: 45vw;
  background: radial-gradient(circle, rgba(200, 155, 109, 0.14) 0%, rgba(139, 94, 60, 0.05) 50%, transparent 70%);
  border-radius: 50%;
  filter: blur(45px);
  animation: techPulse 18s ease-in-out infinite reverse;
}

/* Hexagon pattern */
.hexagon-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Cpath d='M25 0 L50 12.5 L50 37.5 L25 50 L0 37.5 L0 12.5 Z' fill='none' stroke='rgba(196, 152, 105, 0.05)' stroke-width='1'/%3E%3C/svg%3E");
  background-size: 60px 70px;
  opacity: 0.6;
}

/* Bottom gradient fade */
.bottom-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(0deg, var(--bg-primary) 0%, transparent 100%);
}

/* Keyframes - These should be global if used elsewhere, but for now kept here */
@keyframes techPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

</style>
