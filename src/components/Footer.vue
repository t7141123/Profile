<template>
  <footer class="footer">
    <div class="container text-center">
      <!-- Brand Section -->
      <div class="footer-brand mb-2">
        <i class="bi bi-code-slash me-2"></i>{{ $t("footer.brand") }}
      </div>
      <p class="footer-description mx-auto mb-3" style="max-width: 600px;">
        {{ $t("footer.description") }}
      </p>

      <!-- Social Links -->
      <div class="social-links mb-3 d-flex justify-content-center gap-3">
        <a
          href="https://line.me/ti/p/2w7bwfksdF"
          target="_blank"
          class="social-link line-hover"
          aria-label="Line"
        >
          <i class="bi bi-line"></i>
        </a>
        <a href="https://t.me/davidliu71411" target="_blank" class="social-link" aria-label="Telegram">
          <i class="bi bi-telegram"></i>
        </a>
        <a
          href="https://github.com/t7141123"
          target="_blank"
          class="social-link"
          aria-label="GitHub"
        >
          <i class="bi bi-github"></i>
        </a>
        <a
          href="mailto:david.liu@action-lead.com"
          class="social-link"
          aria-label="Email"
        >
          <i class="bi bi-envelope-fill"></i>
        </a>
      </div>

      <!-- Copyright Info -->
      <div class="footer-bottom">
        <p class="mb-0 copyright-text">
          {{ $t("footer.copyright", { year: currentYear }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  padding: 2.5rem 0 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  color: var(--text-secondary);
}

.footer-brand {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.9rem;
}

.social-link {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border-radius: var(--radius-lg);
  color: var(--primary-color);
  font-size: 1.1rem;
  transition: var(--transition-base);
  text-decoration: none;
}

.social-link:hover {
  background: var(--gradient-primary);
  color: white;
  transform: translateY(-3px);
}

.social-link.line-hover:hover {
  background: var(--line-color) !important;
}

.copyright-text {
  color: var(--text-muted);
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 767.98px) {
  .footer {
    padding: 2rem 1.25rem 1.25rem;
  }
}
</style>
