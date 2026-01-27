<template>
  <div class="portfolio-page">
    <!-- 頁面標題區塊 -->
    <section class="page-header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <span class="section-badge">Portfolio</span>
            <h1 class="page-title">
              作品 <span class="highlight">集</span>
            </h1>
            <p class="page-description">
              這些是我為客戶完成的網站專案，每一個都代表著我對品質的承諾
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 作品集區塊 -->
    <section class="section">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="project in projects" :key="project.id">
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
                
                <div class="portfolio-tech">
                  <span class="tech-tag" v-for="tech in project.technologies" :key="tech">
                    {{ tech }}
                  </span>
                </div>
                
                <div class="portfolio-footer">
                  <a :href="project.url" target="_blank" class="portfolio-link">
                    瀏覽網站 <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA 區塊 -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content text-center">
          <h2 class="cta-title">想要打造屬於您的網站？</h2>
          <p class="cta-description">
            讓我們一起討論您的專案需求，創造下一個成功案例。
          </p>
          <router-link to="/contact" class="btn btn-primary-custom btn-lg">
            <i class="bi bi-send me-2"></i>開始合作
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: '艾樂資訊股份有限公司',
    category: '企業網站',
    description: '為資訊科技公司打造的專業形象網站，展現企業專業形象與服務項目。網站採用現代化設計，具備良好的使用者體驗與響應式設計。',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    url: 'https://www.action-lead.com',
    technologies: ['Vue.js', 'Bootstrap', 'PHP', 'MySQL']
  },
  {
    id: 2,
    title: '麟雲數據科技有限公司',
    category: '企業網站',
    description: '專注於數據技術的科技公司官網，呈現創新技術與解決方案。整合多語系支援與動態內容管理系統。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    url: 'https://www.linkwing.com/',
    technologies: ['Vue.js', 'Vite', 'Bootstrap', 'Node.js']
  },
  {
    id: 3,
    title: '台灣軟陶有限公司',
    category: '電商網站',
    description: '軟陶藝術品牌的電子商務網站，結合產品展示與購物功能。提供完整的購物車系統與金流整合。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    url: 'https://clay.com.tw/',
    technologies: ['Vue.js', 'Bootstrap', 'PHP', 'MySQL']
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
  max-width: 600px;
  margin: 0 auto;
}

/* Portfolio Tech Tags */
.portfolio-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  padding: 0.25rem 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--primary-light);
  font-weight: 500;
}

.portfolio-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--dark-border);
}

/* CTA */
.cta-section {
  background: rgba(99, 102, 241, 0.05);
  border-top: 1px solid rgba(99, 102, 241, 0.1);
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
</style>
