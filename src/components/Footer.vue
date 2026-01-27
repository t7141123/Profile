<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <!-- 品牌區塊 -->
        <div class="col-lg-4 mb-4 mb-lg-0">
          <div class="footer-brand">
            <i class="bi bi-code-slash me-2"></i>David Liu
          </div>
          <p class="footer-description">
            專業軟體工程師，專注於打造高品質的網站與應用程式。
            讓我們一起將您的想法轉化為現實。
          </p>
          <div class="social-links">
            <a href="https://line.me/ti/p/2w7bwfksdF" target="_blank" class="social-link" aria-label="Line">
              <i class="bi bi-line"></i>
            </a>
            <a href="https://github.com" target="_blank" class="social-link" aria-label="GitHub">
              <i class="bi bi-github"></i>
            </a>
            <a href="mailto:contact@davidliu.dev" class="social-link" aria-label="Email">
              <i class="bi bi-envelope-fill"></i>
            </a>
          </div>
        </div>
        
        <!-- 快速連結 -->
        <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
          <h5 class="footer-title">快速連結</h5>
          <ul class="footer-links">
            <li><router-link to="/">首頁</router-link></li>
            <li><router-link to="/about">關於我</router-link></li>
            <li><router-link to="/portfolio">作品集</router-link></li>
            <li><router-link to="/services">服務項目</router-link></li>
          </ul>
        </div>
        
        <!-- 服務項目 -->
        <div class="col-lg-3 col-md-4 mb-4 mb-md-0">
          <h5 class="footer-title">服務項目</h5>
          <ul class="footer-links">
            <li><a href="#">網站開發</a></li>
            <li><a href="#">系統整合</a></li>
            <li><a href="#">前端開發</a></li>
            <li><a href="#">後端開發</a></li>
          </ul>
        </div>
        
        <!-- 聯繫資訊 -->
        <div class="col-lg-3 col-md-4">
          <h5 class="footer-title">聯繫資訊</h5>
          <ul class="footer-links">
            <li>
              <a href="https://line.me/ti/p/2w7bwfksdF" target="_blank" class="d-flex align-items-center text-decoration-none" style="color: var(--text-secondary);">
                <i class="bi bi-line me-2"></i>
                加 Line 聊聊
              </a>
            </li>
            <li>
              <i class="bi bi-envelope me-2"></i>
              contact@davidliu.dev
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 版權資訊 -->
      <div class="footer-bottom">
        <p class="mb-0">
          &copy; {{ currentYear }} David Liu Studio. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
