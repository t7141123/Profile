<template>
  <div class="not-found-page">
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

    <div class="container position-relative" style="z-index: 1">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="glass-card text-center p-5 animate-fade-in">
            <h1 class="error-code">404</h1>
            <h2 class="error-title mb-4">
              {{ $t("notFound.title") || "Page Not Found" }}
            </h2>
            <p class="error-message mb-5">
              {{
                $t("notFound.message") ||
                "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
              }}
            </p>
            <router-link
              to="/"
              class="btn-primary-custom text-decoration-none d-inline-block"
            >
              <i class="bi bi-house-door me-2"></i
              >{{ $t("nav.home") || "Back to Home" }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.not-found-page {
  min-height: 80vh; /* Reduced from 100vh to fit better with header/footer if present, or maintain 100vh if standalone */
  display: flex;
  align-items: center;
  position: relative;
  background-color: var(--dark-bg);
  overflow: hidden;
  padding: 4rem 0;
}

.error-code {
  font-size: clamp(6rem, 15vw, 10rem);
  font-weight: 900;
  line-height: 1;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: -2px;
  text-shadow: 0 10px 30px rgba(16, 185, 129, 0.1);
}

.error-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--text-primary);
}

.error-message {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.3;
  pointer-events: none;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: var(--primary-dark);
  top: -100px;
  right: -100px;
  animation: float 10s ease-in-out infinite;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: var(--secondary-color);
  bottom: -50px;
  left: -50px;
  animation: float 15s ease-in-out infinite reverse;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, 30px);
  }
}
</style>
