<template>
  <div class="contact-page">
    <!-- Page Header Section -->
    <section class="page-header contact-header">
      <!-- Contact Grid -->
      <div class="contact-grid"></div>
      
      <!-- Message Bubbles -->
      <div class="message-bubble bubble-1">Hello!</div>
      <div class="message-bubble bubble-2">Let's talk</div>
      <div class="message-bubble bubble-3">Get in touch</div>
      
      <!-- Connection Dots -->
      <div class="contact-dot dot-1"></div>
      <div class="contact-dot dot-2"></div>
      <div class="contact-dot dot-3"></div>
      
      <!-- Pink Orbs -->
      <div class="contact-orb-1"></div>
      <div class="contact-orb-2"></div>
      
      <!-- Bottom Fade -->
      <div class="contact-fade"></div>
      
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
                      <i class="bi bi-line fs-2"></i>
                    </div>
                    <div class="text-start">
                      <div class="contact-label mb-1">
                        {{ $t("contact.lineLabel") }}
                      </div>
                      <a
                        href="https://line.me/ti/p/2w7bwfksdF"
                        target="_blank"
                        class="contact-value fs-6 fw-bold text-decoration-none hover-highlight"
                      >
                        {{ $t("contact.lineValue") }}
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Telegram Card -->
                <div class="col-md-6">
                  <div
                    class="glass-card contact-card h-100 d-flex align-items-center p-4"
                  >
                    <div class="contact-icon-wrapper me-4">
                      <i class="bi bi-telegram fs-2"></i>
                    </div>
                    <div class="text-start">
                      <div class="contact-label mb-1">
                        {{ $t("contact.telegramLabel") }}
                      </div>
                      <a
                        href="https://t.me/davidliu71411"
                        target="_blank"
                        class="contact-value fs-6 fw-bold text-decoration-none hover-highlight"
                      >
                        {{ $t("contact.telegramValue") }}
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
                      <i class="bi bi-envelope-fill fs-2"></i>
                    </div>
                    <div class="text-start">
                      <div class="contact-label mb-1">
                        {{ $t("contact.emailLabel") }}
                      </div>
                      <a
                        href="mailto:david.liu@action-lead.com"
                        class="contact-value fs-6 fw-bold text-decoration-none hover-highlight"
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
                      <i class="bi bi-clock-fill fs-2"></i>
                    </div>
                    <div class="text-start">
                      <div class="contact-label mb-1">
                        {{ $t("contact.workingHoursLabel") }}
                      </div>
                      <div class="contact-value fs-6 fw-bold">
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
                      <i class="bi bi-shield-check fs-2"></i>
                    </div>
                    <div class="text-start">
                      <div class="contact-label mb-1">
                        {{ $t("contact.promiseLabel") }}
                      </div>
                      <div class="contact-value fs-6 fw-bold">
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
  color: var(--primary-color);
}

.contact-card {
  border: 1px solid rgba(37, 99, 235, 0.1);
  background: var(--bg-secondary);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  background: var(--bg-secondary);
  border-color: rgba(37, 99, 235, 0.3);
}

.contact-icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transition-base);
}

.contact-card:hover .contact-icon-wrapper {
  background: var(--gradient-primary);
}

.contact-icon-wrapper i {
  color: var(--primary-color);
  font-size: 2rem;
  transition: color var(--transition-base);
}

.contact-card:hover .contact-icon-wrapper i {
  color: white;
}

.contact-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.contact-value {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 1rem;
  transition: color var(--transition-base);
}

.contact-value:hover {
  color: var(--primary-color);
}
</style>
