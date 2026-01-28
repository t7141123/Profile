<template>
  <div class="contact-page">
    <!-- 頁面標題區塊 -->
    <section class="page-header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <span class="section-badge">{{ $t('contact.badge') }}</span>
            <h1 class="page-title">
              {{ $t('contact.title') }} <span class="highlight">{{ $t('contact.titleHighlight') }}</span>
            </h1>
            <p class="page-description">
              {{ $t('contact.pageDescription') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 聯繫區塊 -->
    <section class="section">
      <div class="container">
        <div class="row g-5">
          <!-- 聯繫資訊 -->
          <div class="col-lg-5">
            <div class="contact-info">
              <h2 class="contact-info-title">{{ $t('contact.infoTitle') }}</h2>
              <p class="contact-info-description">
                {{ $t('contact.infoDescription') }}
              </p>

              <div class="contact-info-list">
                <div class="contact-info-item">
                  <div class="contact-icon">
                    <i class="bi bi-line"></i>
                  </div>
                  <div>
                    <span class="contact-label">{{ $t('contact.lineLabel') }}</span>
                    <a href="https://line.me/ti/p/2w7bwfksdF" target="_blank" class="contact-value">
                      {{ $t('contact.lineValue') }}
                    </a>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-icon">
                    <i class="bi bi-envelope-fill"></i>
                  </div>
                  <div>
                    <span class="contact-label">{{ $t('contact.emailLabel') }}</span>
                    <a href="mailto:t71411@gmail.com" class="contact-value">
                      t71411@gmail.com
                    </a>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-icon">
                    <i class="bi bi-clock-fill"></i>
                  </div>
                  <div>
                    <span class="contact-label">{{ $t('contact.workingHoursLabel') }}</span>
                    <span class="contact-value">{{ $t('contact.workingHoursValue') }}</span>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-icon">
                    <i class="bi bi-chat-heart-fill"></i>
                  </div>
                  <div>
                    <span class="contact-label">{{ $t('contact.promiseLabel') }}</span>
                    <span class="contact-value">{{ $t('contact.promiseValue') }}</span>
                  </div>
                </div>
              </div>

              <!-- 社群連結 -->
              <div class="social-section">
                <h4 class="social-title">{{ $t('contact.followMe') }}</h4>
                <div class="social-links">
                  <a href="https://github.com" target="_blank" class="social-link" aria-label="GitHub">
                    <i class="bi bi-github"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" class="social-link" aria-label="LinkedIn">
                    <i class="bi bi-linkedin"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" class="social-link" aria-label="Twitter">
                    <i class="bi bi-twitter-x"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- 聯繫表單 -->
          <div class="col-lg-7">
            <div class="glass-card contact-form-card">
              <h2 class="form-title">{{ $t('contact.formTitle') }}</h2>
              <form @submit.prevent="submitForm">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="name" class="form-label">{{ $t('contact.nameLabel') }} {{ $t('common.required') }}</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      v-model="form.name"
                      :placeholder="$t('contact.namePlaceholder')"
                      required
                    >
                  </div>

                  <div class="col-md-6">
                    <label for="email" class="form-label">{{ $t('contact.emailLabel') }} {{ $t('common.required') }}</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="form.email"
                      :placeholder="$t('contact.emailPlaceholder')"
                      required
                    >
                  </div>

                  <div class="col-md-6">
                    <label for="phone" class="form-label">{{ $t('contact.phoneLabel') }}</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="phone"
                      v-model="form.phone"
                      :placeholder="$t('contact.phonePlaceholder')"
                    >
                  </div>

                  <div class="col-md-6">
                    <label for="service" class="form-label">{{ $t('contact.serviceLabel') }}</label>
                    <select class="form-control form-select" id="service" v-model="form.service">
                      <option value="">{{ $t('contact.serviceDefault') }}</option>
                      <option value="website">{{ $t('contact.serviceOptions.website') }}</option>
                      <option value="frontend">{{ $t('contact.serviceOptions.frontend') }}</option>
                      <option value="backend">{{ $t('contact.serviceOptions.backend') }}</option>
                      <option value="integration">{{ $t('contact.serviceOptions.integration') }}</option>
                      <option value="maintenance">{{ $t('contact.serviceOptions.maintenance') }}</option>
                      <option value="other">{{ $t('contact.serviceOptions.other') }}</option>
                    </select>
                  </div>

                  <div class="col-12">
                    <label for="budget" class="form-label">{{ $t('contact.budgetLabel') }}</label>
                    <select class="form-control form-select" id="budget" v-model="form.budget">
                      <option value="">{{ $t('contact.budgetDefault') }}</option>
                      <option value="30000">{{ $t('contact.budgetOptions.under30k') }}</option>
                      <option value="30000-80000">{{ $t('contact.budgetOptions.30k80k') }}</option>
                      <option value="80000-150000">{{ $t('contact.budgetOptions.80k150k') }}</option>
                      <option value="150000+">{{ $t('contact.budgetOptions.over150k') }}</option>
                    </select>
                  </div>

                  <div class="col-12">
                    <label for="message" class="form-label">{{ $t('contact.messageLabel') }} {{ $t('common.required') }}</label>
                    <textarea
                      class="form-control"
                      id="message"
                      rows="5"
                      v-model="form.message"
                      :placeholder="$t('contact.messagePlaceholder')"
                      required
                    ></textarea>
                  </div>

                  <div class="col-12">
                    <button type="submit" class="btn btn-primary-custom btn-lg w-100" :disabled="isSubmitting">
                      <span v-if="!isSubmitting">
                        <i class="bi bi-send me-2"></i>{{ $t('contact.submitButton') }}
                      </span>
                      <span v-else>
                        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                        {{ $t('contact.submitting') }}
                      </span>
                    </button>
                  </div>
                </div>
              </form>

              <!-- 成功訊息 -->
              <div v-if="showSuccess" class="alert alert-success mt-4">
                <i class="bi bi-check-circle-fill me-2"></i>
                {{ $t('contact.successMessage') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const submitForm = async () => {
  isSubmitting.value = true

  // 模擬表單提交
  await new Promise(resolve => setTimeout(resolve, 1500))

  // 重置表單
  form.name = ''
  form.email = ''
  form.phone = ''
  form.service = ''
  form.budget = ''
  form.message = ''

  isSubmitting.value = false
  showSuccess.value = true

  // 3秒後隱藏成功訊息
  setTimeout(() => {
    showSuccess.value = false
  }, 5000)
}
</script>


<style scoped>
.page-header {
  padding: 160px 0 60px;
  background: var(--dark-bg);
  position: relative;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
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

.contact-info-list {
  margin-bottom: 2rem;
}

/* Social Section */
.social-section {
  padding-top: 2rem;
  border-top: 1px solid var(--dark-border);
}

.social-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

/* Contact Form Card */
.contact-form-card {
  padding: 2.5rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.form-select {
  background-color: rgba(30, 41, 59, 0.5);
  border: 1px solid var(--dark-border);
  color: var(--text-primary);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
}

.form-select:focus {
  background-color: rgba(30, 41, 59, 0.8);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  color: var(--text-primary);
}

.form-select option {
  background-color: var(--dark-card);
  color: var(--text-primary);
}

.alert-success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: var(--success-color);
  border-radius: 12px;
}

@media (max-width: 991.98px) {
  .contact-info {
    margin-bottom: 2rem;
  }

  .contact-form-card {
    padding: 1.5rem;
  }
}
</style>
