<template>
  <div class="services-page">
    <!-- 頁面標題區塊 -->
    <section class="page-header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <span class="section-badge">Services</span>
            <h1 class="page-title">
              服務 <span class="highlight">項目</span>
            </h1>
            <p class="page-description">
              提供全方位的軟體開發服務，從構思到上線一站式完成
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要服務區塊 -->
    <section class="section">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6" v-for="service in mainServices" :key="service.id">
            <div class="glass-card service-detail-card h-100">
              <div class="service-detail-header">
                <div class="service-detail-icon" :style="{ background: service.gradient }">
                  <i :class="service.icon"></i>
                </div>
                <div>
                  <h3 class="service-detail-title">{{ service.title }}</h3>
                  <span class="service-detail-subtitle">{{ service.subtitle }}</span>
                </div>
              </div>
              <p class="service-detail-description">{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="feature in service.features" :key="feature">
                  <i class="bi bi-check-circle-fill"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技術棧區塊 -->
    <section class="section" style="background: rgba(30, 41, 59, 0.3);">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Technology</span>
          <h2 class="section-title">
            使用的 <span class="highlight">技術</span>
          </h2>
          <p class="section-description">
            採用業界主流且穩定的技術棧，確保專案品質
          </p>
        </div>

        <div class="tech-logos">
          <div class="tech-logo-item" v-for="tech in technologies" :key="tech.name">
            <div class="tech-logo">
              <i :class="tech.icon"></i>
            </div>
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 價格方案區塊 -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Pricing</span>
          <h2 class="section-title">
            合作 <span class="highlight">方案</span>
          </h2>
          <p class="section-description">
            彈性的合作方式，滿足不同規模的專案需求
          </p>
        </div>

        <div class="row g-4 justify-content-center">
          <div class="col-md-6 col-lg-4" v-for="plan in pricingPlans" :key="plan.id">
            <div class="glass-card pricing-card h-100" :class="{ featured: plan.featured }">
              <div class="pricing-badge" v-if="plan.featured">熱門方案</div>
              <h3 class="pricing-title">{{ plan.title }}</h3>
              <p class="pricing-description">{{ plan.description }}</p>
              <div class="pricing-price">
                <span class="currency">NT$</span>
                <span class="amount">{{ plan.price }}</span>
                <span class="period">起</span>
              </div>
              <ul class="pricing-features">
                <li v-for="feature in plan.features" :key="feature">
                  <i class="bi bi-check2"></i>
                  {{ feature }}
                </li>
              </ul>
              <router-link
                to="/contact"
                class="btn w-100"
                :class="plan.featured ? 'btn-primary-custom' : 'btn-outline-custom'"
              >
                聯繫諮詢
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ 區塊 -->
    <section class="section" style="background: rgba(30, 41, 59, 0.3);">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">FAQ</span>
          <h2 class="section-title">
            常見 <span class="highlight">問題</span>
          </h2>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="accordion" id="faqAccordion">
              <div class="accordion-item" v-for="(faq, index) in faqs" :key="faq.id">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    :class="{ collapsed: index !== 0 }"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#faq' + faq.id"
                  >
                    {{ faq.question }}
                  </button>
                </h2>
                <div
                  :id="'faq' + faq.id"
                  class="accordion-collapse collapse"
                  :class="{ show: index === 0 }"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    {{ faq.answer }}
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

<script setup>
import { ref } from 'vue'

const mainServices = ref([
  {
    id: 1,
    icon: 'bi bi-globe',
    title: '網站開發',
    subtitle: 'Web Development',
    description: '從企業形象網站到複雜的電商平台，提供客製化的網站開發服務。注重使用者體驗、響應式設計和SEO優化。',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    features: [
      '企業形象網站設計與開發',
      '響應式網頁設計 (RWD)',
      '電子商務網站建置',
      'CMS 內容管理系統整合',
      'SEO 搜尋引擎優化'
    ]
  },
  {
    id: 2,
    icon: 'bi bi-code-square',
    title: '前端開發',
    subtitle: 'Frontend Development',
    description: '使用 Vue.js、React 等現代框架打造流暢的使用者介面，注重效能優化與使用者體驗。',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    features: [
      'Vue.js / React 應用開發',
      'SPA 單頁應用程式',
      '互動式動畫效果',
      '效能優化與最佳實踐',
      '跨瀏覽器相容性'
    ]
  },
  {
    id: 3,
    icon: 'bi bi-server',
    title: '後端開發',
    subtitle: 'Backend Development',
    description: '建構穩定、安全、可擴展的後端系統，提供完整的 API 開發與資料庫設計服務。',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    features: [
      'RESTful API 設計與開發',
      '資料庫設計與優化',
      '第三方服務整合',
      '系統效能調校',
      '資訊安全防護'
    ]
  },
  {
    id: 4,
    icon: 'bi bi-gear-wide-connected',
    title: '系統整合',
    subtitle: 'System Integration',
    description: '協助企業整合各種系統與服務，打造高效率的工作流程與數據管理方案。',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    features: [
      '金流系統整合',
      '物流系統串接',
      'ERP/CRM 系統整合',
      '社群平台 API 整合',
      '自動化流程設計'
    ]
  }
])

const technologies = ref([
  { name: 'Vue.js', icon: 'bi bi-filetype-vue' },
  { name: 'React', icon: 'bi bi-filetype-jsx' },
  { name: 'JavaScript', icon: 'bi bi-filetype-js' },
  { name: 'TypeScript', icon: 'bi bi-filetype-tsx' },
  { name: 'Node.js', icon: 'bi bi-node-plus' },
  { name: 'PHP', icon: 'bi bi-filetype-php' },
  { name: 'Python', icon: 'bi bi-filetype-py' },
  { name: 'MySQL', icon: 'bi bi-database' },
  { name: 'MongoDB', icon: 'bi bi-server' },
  { name: 'Git', icon: 'bi bi-git' },
  { name: 'Docker', icon: 'bi bi-box' },
  { name: 'AWS', icon: 'bi bi-cloud' }
])

const pricingPlans = ref([
  {
    id: 1,
    title: '基礎方案',
    description: '適合小型企業或個人品牌',
    price: '30,000',
    featured: false,
    features: [
      '響應式網頁設計',
      '最多 5 個頁面',
      '基本 SEO 優化',
      '聯繫表單功能',
      '3 個月免費維護'
    ]
  },
  {
    id: 2,
    title: '專業方案',
    description: '適合中型企業與成長中品牌',
    price: '80,000',
    featured: true,
    features: [
      '客製化設計',
      '無限制頁面數量',
      '進階 SEO 優化',
      'CMS 內容管理系統',
      '6 個月免費維護',
      '效能優化'
    ]
  },
  {
    id: 3,
    title: '企業方案',
    description: '適合大型企業與複雜需求',
    price: '150,000',
    featured: false,
    features: [
      '完整客製化開發',
      '電商功能整合',
      '會員系統',
      'API 整合',
      '12 個月免費維護',
      '24/7 技術支援'
    ]
  }
])

const faqs = ref([
  {
    id: 1,
    question: '專案開發需要多長時間？',
    answer: '開發時間取決於專案的複雜程度。一般的企業形象網站約需 4-6 週，較複雜的電商平台或客製化系統可能需要 2-4 個月。我會在專案開始前提供詳細的時程規劃。'
  },
  {
    id: 2,
    question: '付款方式如何安排？',
    answer: '通常採用分期付款方式：簽約時支付 30% 訂金，開發中期支付 40%，專案完成驗收後支付尾款 30%。具體付款方式可依專案需求彈性調整。'
  },
  {
    id: 3,
    question: '網站完成後提供維護服務嗎？',
    answer: '是的，所有專案都包含免費維護期。維護期結束後，您可以選擇續約維護服務，確保網站持續穩定運作並獲得技術支援。'
  },
  {
    id: 4,
    question: '可以先看設計稿再決定嗎？',
    answer: '在正式開發前，我會提供網站架構規劃與設計稿供您確認。確保設計方向符合您的期望後才會進入開發階段，讓您放心合作。'
  }
])
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

/* Service Detail Card */
.service-detail-card {
  padding: 2rem;
}

.service-detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.service-detail-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
}

.service-detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.service-detail-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.service-detail-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: var(--text-secondary);
}

.service-features li i {
  color: var(--success-color);
}

/* Tech Logos */
.tech-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.tech-logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.tech-logo {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 16px;
  font-size: 2rem;
  color: var(--primary-light);
  transition: var(--transition-base);
}

.tech-logo-item:hover .tech-logo {
  background: var(--primary-gradient);
  border-color: transparent;
  color: white;
  transform: translateY(-5px);
}

.tech-name {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Pricing Card */
.pricing-card {
  padding: 2rem;
  text-align: center;
  position: relative;
  border: 1px solid transparent;
}

.pricing-card.featured {
  border-color: var(--primary-color);
  background: linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, rgba(30, 41, 59, 0.5) 100%);
}

.pricing-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-gradient);
  padding: 0.25rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.pricing-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.pricing-description {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.pricing-price {
  margin-bottom: 1.5rem;
}

.pricing-price .currency {
  font-size: 1rem;
  color: var(--text-secondary);
  vertical-align: top;
}

.pricing-price .amount {
  font-size: 3rem;
  font-weight: 900;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pricing-price .period {
  font-size: 1rem;
  color: var(--text-muted);
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  text-align: left;
}

.pricing-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: var(--text-secondary);
}

.pricing-features li i {
  color: var(--primary-light);
}

/* Accordion */
.accordion-item {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid var(--dark-border);
  border-radius: 12px !important;
  margin-bottom: 1rem;
  overflow: hidden;
}

.accordion-button {
  background: transparent;
  color: var(--text-primary);
  font-weight: 600;
  padding: 1.25rem;
  box-shadow: none !important;
}

.accordion-button:not(.collapsed) {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-light);
}

.accordion-button::after {
  filter: brightness(0) invert(1);
}

.accordion-body {
  color: var(--text-secondary);
  padding: 0 1.25rem 1.25rem;
  line-height: 1.8;
}
</style>
