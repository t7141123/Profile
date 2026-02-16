<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <!-- Brand Section -->
        <div class="col-lg-5 offset-lg-1 mb-4 mb-lg-0">
          <div class="footer-brand">
            <i class="bi bi-code-slash me-2"></i>{{ $t("footer.brand") }}
          </div>
          <p class="footer-description">
            {{ $t("footer.description") }}
          </p>
          <div class="social-links">
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
        </div>

        <!-- Contact Info -->
        <div class="col-lg-5">
          <div class="ps-lg-5">
            <h5 class="footer-title">{{ $t("footer.contact") }}</h5>
            <ul class="footer-links">
              <li>
                <a
                  href="https://line.me/ti/p/2w7bwfksdF"
                  target="_blank"
                  class="d-flex align-items-center text-decoration-none"
                  style="color: var(--text-secondary)"
                >
                  <div style="width: 24px"><i class="bi bi-line"></i></div>
                  {{ $t("home.addLine") }}
                </a>
              </li>
              <li>
                <a href="https://t.me/davidliu71411" target="_blank" class="d-flex align-items-center text-decoration-none" style="color: var(--text-secondary);">
                  <div style="width: 24px;"><i class="bi bi-telegram"></i></div>
                  @davidliu71411
                </a>
              </li>
              <li>
                <div
                  class="d-flex align-items-center"
                  style="color: var(--text-secondary)"
                >
                  <div style="width: 24px"><i class="bi bi-envelope"></i></div>
                  david.liu@action-lead.com
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Copyright Info -->
      <div class="footer-bottom">
        <div class="footer-cta mb-3">
          <a href="https://line.me/ti/p/2w7bwfksdF" target="_blank" class="cta-link">
            {{ $t("footer.cta") }}
          </a>
        </div>
        <p class="mb-0">
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
  padding: 4rem 0 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-brand {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.footer-description {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: var(--text-secondary);
  transition: var(--transition-base);
}

.social-link:hover {
  background: var(--primary-light);
  color: white;
  transform: translateY(-3px);
}

.footer-bottom {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
}

.footer-cta .cta-link {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-light);
  text-decoration: none;
  transition: var(--transition-base);
  display: inline-block;
}

.footer-cta .cta-link:hover {
  color: white;
  transform: scale(1.05);
}

@media (max-width: 991.98px) {
  .footer {
    padding: 3rem 0 2rem;
  }
}
</style>
