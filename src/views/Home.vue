<template>
  <div class="home">
    <!-- Hero 區塊 -->
    <section class="hero-section">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <div class="hero-badge">
                <i class="bi bi-stars"></i>
                <span>溫暖．專業．值得信賴</span>
              </div>
              
              <h1 class="hero-title">
                嗨，我是<br>
                <span class="highlight">David Liu</span>
              </h1>
              
              <p class="hero-subtitle">
                一位溫和細心的軟體工程師，擅長用技術溫暖您的數位體驗。<br>
                擁有強大的技術實力與良好的溝通能力，致力於為您打造
                兼具美感與效能的網站作品。
              </p>
              
              <div class="hero-buttons">
                <router-link to="/portfolio" class="btn btn-primary-custom">
                  <i class="bi bi-collection me-2"></i>查看作品
                </router-link>
                <a href="https://line.me/ti/p/2w7bwfksdF" target="_blank" class="btn btn-outline-custom">
                  <i class="bi bi-line me-2"></i>加 Line 聊聊
                </a>
              </div>
            </div>
          </div>
          
          <div class="col-lg-6">
            <div class="hero-image text-center">
              <div class="code-preview">
                <div class="code-header">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                  <span class="filename">david_profile.js</span>
                </div>
                <pre class="code-content"><code><span class="keyword">const</span> <span class="variable">developer</span> = {
  <span class="property">name</span>: <span class="string">"David Liu"</span>,
  <span class="property">traits</span>: [
    <span class="string">"溫暖細心"</span>, <span class="string">"善於溝通"</span>,
    <span class="string">"技術優異"</span>, <span class="string">"可靠負責"</span>
  ],
  <span class="property">skills</span>: [
    <span class="string">"Vue.js"</span>, <span class="string">"Node.js"</span>,
    <span class="string">"Full Stack"</span>
  ],
  <span class="property">mission</span>: <span class="string">"用程式傳遞溫暖"</span>
};

<span class="keyword">export default</span> developer;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 服務預覽區塊 -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">我能提供的服務</span>
          <h2 class="section-title">
            專業 <span class="highlight">解決方案</span>
          </h2>
          <p class="section-description">
            從網站開發到系統整合，提供全方位的技術服務
          </p>
        </div>
        
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="service in services" :key="service.id">
            <div class="glass-card service-card h-100">
              <div class="service-icon" :style="{ background: service.gradient }">
                <i :class="service.icon"></i>
              </div>
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 精選作品區塊 -->
    <section class="section" style="background: rgba(30, 41, 59, 0.3);">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">精選專案</span>
          <h2 class="section-title">
            近期 <span class="highlight">作品</span>
          </h2>
          <p class="section-description">
            這些是我近期為客戶完成的網站專案
          </p>
        </div>
        
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="project in featuredProjects" :key="project.id">
            <div class="portfolio-card h-100">
              <div class="portfolio-image">
                <img :src="project.image" :alt="project.title">
                <div class="portfolio-overlay">
                  <a :href="project.url" target="_blank" class="btn btn-primary-custom btn-sm">
                    <i class="bi bi-box-arrow-up-right me-1"></i>查看網站
                  </a>
                </div>
              </div>
              <div class="portfolio-content">
                <span class="portfolio-category">{{ project.category }}</span>
                <h3 class="portfolio-title">{{ project.title }}</h3>
                <p class="portfolio-description">{{ project.description }}</p>
                <a :href="project.url" target="_blank" class="portfolio-link">
                  瀏覽網站 <i class="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5">
          <router-link to="/portfolio" class="btn btn-outline-custom">
            查看全部作品 <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- CTA 區塊 -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content text-center">
          <h2 class="cta-title">準備開始您的專案了嗎？</h2>
          <p class="cta-description">
            無論是全新的網站開發，還是現有系統的優化升級，<br>
            我都能為您提供專業的解決方案。
          </p>
          <a href="https://line.me/ti/p/2w7bwfksdF" target="_blank" class="btn btn-primary-custom btn-lg">
            <i class="bi bi-line me-2"></i>加 Line 討論專案
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  {
    id: 1,
    icon: 'bi bi-globe',
    title: '網站開發',
    description: '從企業形象網站到複雜的電商平台，打造符合您需求的網站解決方案。',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    icon: 'bi bi-code-square',
    title: '前端開發',
    description: '使用 Vue.js、React 等現代框架，打造流暢的使用者介面體驗。',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 3,
    icon: 'bi bi-server',
    title: '後端開發',
    description: '穩定可靠的後端架構，支援您的應用程式順暢運作。',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 4,
    icon: 'bi bi-gear-wide-connected',
    title: '系統整合',
    description: '整合第三方服務與 API，讓您的系統發揮最大效益。',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
])

const featuredProjects = ref([
  {
    id: 1,
    title: '艾樂資訊股份有限公司',
    category: '企業網站',
    description: '為資訊科技公司打造的專業形象網站，展現企業專業形象與服務項目。',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    url: 'https://www.action-lead.com'
  },
  {
    id: 2,
    title: '麟雲數據科技有限公司',
    category: '企業網站',
    description: '專注於數據技術的科技公司官網，呈現創新技術與解決方案。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    url: 'https://www.linkwing.com/'
  },
  {
    id: 3,
    title: '台灣軟陶有限公司',
    category: '電商網站',
    description: '軟陶藝術品牌的電子商務網站，結合產品展示與購物功能。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    url: 'https://clay.com.tw/'
  }
])
</script>

<style scoped>
/* Code Preview 樣式 */
.code-preview {
  background: rgba(30, 41, 59, 0.9);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
}

.code-header {
  background: rgba(30, 41, 59, 1);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

.filename {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.code-content {
  padding: 24px;
  margin: 0;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.875rem;
  line-height: 1.8;
  overflow-x: auto;
}

.code-content code {
  color: var(--text-secondary);
}

.keyword { color: #c678dd; }
.variable { color: #e06c75; }
.property { color: #e5c07b; }
.string { color: #98c379; }

/* CTA 區塊 */
.cta-section {
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 10% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 90% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%);
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

@media (max-width: 991.98px) {
  .code-preview {
    margin-top: 2rem;
  }
}
</style>
