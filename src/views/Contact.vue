<template>
  <div class="contact-page">
    <!-- Page Header Section -->
    <section class="page-header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <span class="section-badge">{{ $t("contact.badge") }}</span>
            <h1 class="page-title">
              {{ $t("contact.title")
              }}<span class="highlight">{{
                $t("contact.titleHighlight")
              }}</span>
            </h1>
            <p class="page-description">
              {{ $t("contact.pageDescription") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section">
      <div class="container">
        <div class="row g-5">
          <!-- Contact Info -->
          <div class="col-lg-8 mx-auto">
            <div class="contact-info text-center">
              <h2 class="contact-info-title">{{ $t("contact.infoTitle") }}</h2>
              <p
                class="contact-info-description mx-auto"
                style="max-width: 600px"
              >
                {{ $t("contact.infoDescription") }}
              </p>

              <div class="row g-4 justify-content-center">
                <!-- Line Card -->
                <div class="col-md-6">
                  <div
                    class="glass-card contact-card h-100 d-flex align-items-center p-4"
                  >
                    <div class="contact-icon-wrapper me-4">
                      <i class="bi bi-line fs-2 text-success"></i>
                    </div>
                    <div class="text-start">
                      <div class="contact-label mb-1 text-light">
                        {{ $t("contact.lineLabel") }}
                      </div>
                      <a
                        href="https://line.me/ti/p/2w7bwfksdF"
                        target="_blank"
                        class="contact-value fs-5 fw-bold text-white text-decoration-none hover-highlight"
                      >
                        {{ $t("contact.lineValue") }}
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Telegram Card -->
                <div class="col-md-6">
                  <div class="glass-card contact-card h-100 d-flex align-items-center p-4">
                    <div class="contact-icon-wrapper me-4">
                      <i class="bi bi-telegram fs-2 text-info"></i>
                    </div>
                    <div class="text-start">
                      <div class="contact-label mb-1 text-light">{{ $t('contact.telegramLabel') }}</div>
                      <a href="https://t.me/davidliu71411" target="_blank" class="contact-value fs-5 fw-bold text-white text-decoration-none hover-highlight">
                        {{ $t('contact.telegramValue') }}
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Email Card -->
                <div class="col-md-6">
                  <div
                    class="glass-card contact-card h-100 d-flex align-items-center p-4"
                  >
                    <div class="contact-icon-wrapper me-4">
                      <i class="bi bi-envelope-fill fs-2 text-primary"></i>
                    </div>
                    <div class="text-start">
                      <div class="contact-label mb-1 text-light">
                        {{ $t("contact.emailLabel") }}
                      </div>
                      <a
                        href="mailto:david.liu@action-lead.com"
                        class="contact-value fs-5 fw-bold text-white text-decoration-none hover-highlight"
                      >
                        david.liu@action-lead.com
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Working Hours Card -->
                <div class="col-md-6">
                  <div
                    class="glass-card contact-card h-100 d-flex align-items-center p-4"
                  >
                    <div class="contact-icon-wrapper me-4">
                      <i class="bi bi-clock-fill fs-2 text-info"></i>
                    </div>
                    <div class="text-start">
                      <div class="contact-label mb-1 text-light">
                        {{ $t("contact.workingHoursLabel") }}
                      </div>
                      <div class="contact-value fs-5 fw-bold text-white">
                        {{ $t("contact.workingHoursValue") }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Promise Card -->
                <div class="col-md-6">
                  <div
                    class="glass-card contact-card h-100 d-flex align-items-center p-4"
                  >
                    <div class="contact-icon-wrapper me-4">
                      <i class="bi bi-chat-heart-fill fs-2 text-danger"></i>
                    </div>
                    <div class="text-start">
                      <div class="contact-label mb-1 text-light">
                        {{ $t("contact.promiseLabel") }}
                      </div>
                      <div class="contact-value fs-5 fw-bold text-white">
                        {{ $t("contact.promiseValue") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-header {
  padding: 160px 0 60px;
  background: var(--dark-bg);
  position: relative;
}

.page-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 30% 70%,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(139, 92, 246, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.page-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.page-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

/* Contact Info */
.contact-info-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.contact-info-description {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.hover-highlight:hover {
  color: var(--primary-light) !important;
  text-decoration: underline !important;
}

.contact-card {
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(30, 41, 59, 0.4);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(99, 102, 241, 0.3);
}

.contact-icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
