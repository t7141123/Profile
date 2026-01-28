<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <!-- 品牌區塊 -->
        <div class="col-lg-4 mb-4 mb-lg-0">
          <div class="footer-brand">
            <i class="bi bi-code-slash me-2"></i>{{ $t('footer.brand') }}
          </div>
          <p class="footer-description">
            {{ $t('footer.description') }}
          </p>
          <div class="social-links">
            <a href="https://line.me/ti/p/2w7bwfksdF" target="_blank" class="social-link" aria-label="Line">
              <i class="bi bi-line"></i>
            </a>
            <a href="https://github.com" target="_blank" class="social-link" aria-label="GitHub">
              <i class="bi bi-github"></i>
            </a>
            <a href="mailto:t71411@gmail.com" class="social-link" aria-label="Email">
              <i class="bi bi-envelope-fill"></i>
            </a>
          </div>
        </div>

        <!-- 快速連結 -->
        <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
          <h5 class="footer-title">{{ $t('footer.quickLinks') }}</h5>
          <ul class="footer-links">
            <li><router-link to="/">{{ $t('nav.home') }}</router-link></li>
            <li><router-link to="/about">{{ $t('nav.about') }}</router-link></li>
            <li><router-link to="/portfolio">{{ $t('nav.portfolio') }}</router-link></li>
            <li><router-link to="/services">{{ $t('nav.services') }}</router-link></li>
          </ul>
        </div>

        <!-- 服務項目 -->
        <div class="col-lg-3 col-md-4 mb-4 mb-md-0">
          <h5 class="footer-title">{{ $t('footer.services') }}</h5>
          <ul class="footer-links">
            <li><a href="#">{{ $t('footer.servicesList.webDev') }}</a></li>
            <li><a href="#">{{ $t('footer.servicesList.integration') }}</a></li>
            <li><a href="#">{{ $t('footer.servicesList.frontendDev') }}</a></li>
            <li><a href="#">{{ $t('footer.servicesList.backendDev') }}</a></li>
          </ul>
        </div>

        <!-- 聯繫資訊 -->
        <div class="col-lg-3 col-md-4">
          <h5 class="footer-title">{{ $t('footer.contact') }}</h5>
          <ul class="footer-links">
            <li>
              <a href="https://line.me/ti/p/2w7bwfksdF" target="_blank" class="d-flex align-items-center text-decoration-none" style="color: var(--text-secondary);">
                <i class="bi bi-line me-2"></i>
                {{ $t('home.addLine') }}
              </a>
            </li>
            <li>
              <i class="bi bi-envelope me-2"></i>
              t71411@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <!-- 版權資訊 -->
      <div class="footer-bottom">
        <p class="mb-0">
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

