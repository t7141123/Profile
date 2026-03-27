<template>
  <section class="page-header" :class="headerClass">
    <!-- Subtle Background Pattern -->
    <div class="header-bg-pattern"></div>

    <!-- Gradient Orbs -->
    <div class="header-orb header-orb-1"></div>
    <div class="header-orb header-orb-2"></div>

    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 text-center">
          <span
            v-if="badge"
            class="section-badge animate-fade-in"
            :class="{ 'section-badge-light': isLight }"
          >
            {{ badge }}
          </span>

          <h1
            class="page-title animate-fade-in-up"
            :class="{ 'page-title-light': isLight }"
          >
            {{ title }}<span class="highlight">{{ highlight }}</span>
          </h1>

          <p
            v-if="description"
            class="page-description animate-fade-in-up delay-1"
            :class="{ 'page-description-light': isLight }"
          >
            {{ description }}
          </p>

          <!-- Custom Content Slot (e.g., CTA buttons) -->
          <div class="header-custom-content animate-fade-in-up delay-2">
            <slot></slot>
          </div>

          <!-- Scroll Indicator -->
          <div v-if="showScrollIndicator" class="scroll-indicator animate-bounce" @click="$emit('scroll-click')">
            <i class="bi bi-chevron-down"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  badge: String,
  title: String,
  highlight: String,
  description: String,
  headerClass: String,
  isLight: {
    type: Boolean,
    default: true
  },
  showScrollIndicator: {
    type: Boolean,
    default: true
  }
});

defineEmits(['scroll-click']);
</script>

<style scoped>
/* Page Header - Clean & Professional */
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

/* Warm Gradient Overlay - Unified Warm Accent */
.page-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.06) 0%, transparent 40%);
  pointer-events: none;
}

/* Gradient Orbs - Unified Blue Theme with Warm Accents */
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

/* Page-Specific Variations (using headerClass prop) */
.page-header-about::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 50%);
  pointer-events: none;
}

.page-header-services::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 50%, rgba(20, 184, 166, 0.12) 0%, transparent 50%);
  pointer-events: none;
}

.page-header-portfolio::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 50%);
  pointer-events: none;
}

.page-header-contact::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 50%);
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

/* Custom content slot spacing */
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

.delay-1 {
  animation-delay: 0.15s;
}

.delay-2 {
  animation-delay: 0.3s;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-10px) translateX(-50%);
  }
  60% {
    transform: translateY(-5px) translateX(-50%);
  }
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
</style>
