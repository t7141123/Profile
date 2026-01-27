<template>
  <div class="about-page">
    <!-- 頁面標題區塊 -->
    <section class="page-header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <span class="section-badge">About Me</span>
            <h1 class="page-title">
              關於 <span class="highlight">我</span>
            </h1>
            <p class="page-description">
              一位熱愛創造的軟體工程師，致力於用技術解決問題
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 關於區塊 -->
    <section class="section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-5 mb-4 mb-lg-0">
            <div class="about-image">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop" 
                alt="David Liu"
              >
              <div class="experience-badge">
                <span class="years">5+</span>
                <span class="text">年經驗</span>
              </div>
            </div>
          </div>
          
          <div class="col-lg-7">
            <div class="about-content">
              <h2 class="about-title">
                嗨！我是 <span class="highlight">David Liu</span>
              </h2>
              <p class="about-text">
                朋友常說我是一個「科技暖男」。在程式碼的理性邏輯之外，我更重視人與人之間的溫度。
                我深信，一個好的軟體不僅要技術精湛，更要能體貼使用者的需求。
              </p>
              <p class="about-text">
                作為一名接案工程師，我擁有<strong>深厚的技術底蘊</strong>，能解決複雜的系統問題；
                同時我也具備<strong>極佳的溝通能力</strong>，能夠用淺顯易懂的語言，與您討論專案的每一個細節。
                我不只是執行者，更是您值得信賴的合作夥伴。
              </p>
              <p class="about-text">
                我的個性溫和、耐心，樂於傾聽您的想法。無論是專案初期的腦力激盪，
                還是開發過程中的來回討論，我都會以最真誠的態度，與您一起打磨出最完美的作品。
              </p>
              
              <div class="about-info">
                <div class="info-item">
                  <i class="bi bi-person-fill"></i>
                  <div>
                    <span class="label">特質</span>
                    <span class="value">溫和細心 / 技術本位</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="bi bi-chat-heart-fill"></i>
                  <div>
                    <span class="label">溝通風格</span>
                    <span class="value">耐心傾聽 / 邏輯清晰</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="bi bi-briefcase-fill"></i>
                  <div>
                    <span class="label">專業領域</span>
                    <span class="value">全端開發 / 系統架構</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="bi bi-patch-check-fill"></i>
                  <div>
                    <span class="label">狀態</span>
                    <span class="value available">歡迎諮詢</span>
                  </div>
                </div>
              </div>
              
              <a href="https://line.me/ti/p/2w7bwfksdF" target="_blank" class="btn btn-primary-custom mt-4">
                <i class="bi bi-line me-2"></i>加 Line 與我聊聊
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 統計數據 -->
    <section class="section stats-section">
      <div class="container">
        <div class="row">
          <div class="col-6 col-md-3" v-for="stat in stats" :key="stat.id">
            <div class="stat-item">
              <span class="stat-number">{{ stat.number }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 技能區塊 -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Skills</span>
          <h2 class="section-title">
            專業 <span class="highlight">技能</span>
          </h2>
          <p class="section-description">
            我所掌握的技術棧能夠應對各種開發需求
          </p>
        </div>
        
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="category in skillCategories" :key="category.name">
            <div class="glass-card skill-category h-100">
              <div class="skill-category-icon" :style="{ background: category.gradient }">
                <i :class="category.icon"></i>
              </div>
              <h3 class="skill-category-title">{{ category.name }}</h3>
              <div class="skill-tags">
                <span class="skill-tag" v-for="skill in category.skills" :key="skill">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 工作流程 -->
    <section class="section" style="background: rgba(30, 41, 59, 0.3);">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Process</span>
          <h2 class="section-title">
            工作 <span class="highlight">流程</span>
          </h2>
          <p class="section-description">
            透明、高效的專案執行流程
          </p>
        </div>
        
        <div class="row">
          <div class="col-md-6 col-lg-3" v-for="(step, index) in workProcess" :key="step.id">
            <div class="process-card">
              <div class="process-number">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="process-icon">
                <i :class="step.icon"></i>
              </div>
              <h3 class="process-title">{{ step.title }}</h3>
              <p class="process-description">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { id: 1, number: '10+', label: '完成專案' },
  { id: 2, number: '5+', label: '年經驗' },
  { id: 3, number: '100%', label: '客戶滿意' },
  { id: 4, number: '24/7', label: '技術支援' }
])

const skillCategories = ref([
  {
    name: '前端開發',
    icon: 'bi bi-palette',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    skills: ['Vue.js', 'React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS']
  },
  {
    name: '後端開發',
    icon: 'bi bi-server',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    skills: ['Node.js', 'PHP', 'Python', 'Express.js', 'Laravel', 'REST API', 'GraphQL']
  },
  {
    name: '資料庫',
    icon: 'bi bi-database',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase']
  },
  {
    name: '開發工具',
    icon: 'bi bi-tools',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    skills: ['Git', 'Docker', 'VS Code', 'Figma', 'Postman', 'Linux']
  },
  {
    name: '雲端服務',
    icon: 'bi bi-cloud',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    skills: ['AWS', 'GCP', 'Vercel', 'Netlify', 'DigitalOcean']
  },
  {
    name: '其他技能',
    icon: 'bi bi-lightning',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    skills: ['SEO 優化', 'UI/UX 設計', '專案管理', '技術文件撰寫']
  }
])

const workProcess = ref([
  {
    id: 1,
    icon: 'bi bi-chat-square-text',
    title: '需求溝通',
    description: '深入了解您的需求、目標與期望，確保專案方向正確。'
  },
  {
    id: 2,
    icon: 'bi bi-pencil-square',
    title: '規劃設計',
    description: '制定詳細的專案計劃，設計符合需求的解決方案。'
  },
  {
    id: 3,
    icon: 'bi bi-code-slash',
    title: '開發實作',
    description: '使用最佳技術棧進行開發，定期回報專案進度。'
  },
  {
    id: 4,
    icon: 'bi bi-rocket-takeoff',
    title: '測試上線',
    description: '嚴格測試確保品質，協助部署上線並提供後續支援。'
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

.about-image {
  position: relative;
}

.about-image img {
  border-radius: 20px;
  width: 100%;
  box-shadow: var(--shadow-xl);
}

.experience-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: var(--primary-gradient);
  padding: 20px 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.experience-badge .years {
  display: block;
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  line-height: 1;
}

.experience-badge .text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
}

.about-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.about-text {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.8;
}

.about-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-item i {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 12px;
  color: var(--primary-light);
  font-size: 1.25rem;
}

.info-item .label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-item .value {
  font-weight: 600;
  color: var(--text-primary);
}

.info-item .value.available {
  color: var(--success-color);
}

/* Stats Section */
.stats-section {
  background: rgba(99, 102, 241, 0.05);
  border-top: 1px solid rgba(99, 102, 241, 0.1);
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
}

/* Skill Category */
.skill-category {
  text-align: center;
  padding: 2rem;
}

.skill-category-icon {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  border-radius: 16px;
  font-size: 1.75rem;
  color: white;
}

.skill-category-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

/* Process Card */
.process-card {
  text-align: center;
  padding: 2rem 1.5rem;
  position: relative;
}

.process-number {
  font-size: 4rem;
  font-weight: 900;
  color: rgba(99, 102, 241, 0.1);
  line-height: 1;
  margin-bottom: -20px;
}

.process-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  background: var(--primary-gradient);
  border-radius: 16px;
  font-size: 1.5rem;
  color: white;
  position: relative;
  z-index: 1;
}

.process-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.process-description {
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

@media (max-width: 767.98px) {
  .about-info {
    grid-template-columns: 1fr;
  }
  
  .experience-badge {
    right: 10px;
    bottom: -10px;
    padding: 15px 20px;
  }
  
  .experience-badge .years {
    font-size: 2rem;
  }
}
</style>
