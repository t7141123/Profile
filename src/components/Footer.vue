<template>
  <footer class="footer">
    <div class="container text-center">
      <!-- Brand Section -->
      <div class="footer-brand mb-3">
        <i class="bi bi-code-slash me-2"></i>{{ $t("footer.brand") }}
      </div>
      <p class="footer-description mx-auto mb-4" style="max-width: 600px;">
        {{ $t("footer.description") }}
      </p>

      <!-- Social Links -->
      <div class="social-links mb-5 d-flex justify-content-center gap-3">
        <a
          href="https://line.me/ti/p/2w7bwfksdF"
          target="_blank"
          class="social-link"
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
  background: #0f172a;
  padding: 4rem 0 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
}

.footer-brand {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.footer-description {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
}

.social-link {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: var(--transition-base);
  text-decoration: none;
}


.social-link:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

.copyright-text {
  color: #94a3b8; /* Slate-400, brighter than text-muted */
  font-size: 0.9rem; /* Slightly larger than small (usually 0.875em) */
  opacity: 0.8;
}
</style>
