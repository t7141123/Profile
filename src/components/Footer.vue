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
