<template>
  <div class="about-page">
    <!-- Page Header Section -->
    <!-- Page Header Section -->
    <PageHeader
      variant="about"
      :badge="$t('about.badge')"
      :title="$t('about.title')"
      :highlight="$t('about.titleHighlight')"
      :description="$t('about.pageDescription')"
      :image="profileImg"
      @scroll-click="scrollToContent"
    />

    <!-- About Section -->
    <section class="section" ref="contentSection">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12">
            <div class="about-content">
              <h2 class="about-title">
                {{ $t("about.greeting") }}
                <span class="highlight">David</span>
              </h2>
              <p class="about-text">
                {{ $t("about.intro1") }}
              </p>
              <p class="about-text">
                {{ $t("about.intro2")
                }}<strong>{{ $t("about.intro2Strong") }}</strong
                >{{ $t("about.intro2Part2")
                }}<strong>{{ $t("about.intro2Strong2") }}</strong
                >{{ $t("about.intro2Part3") }}
              </p>
              <p class="about-text">
                {{ $t("about.intro3") }}
              </p>

              <div class="about-info">
                <div class="info-item">
                  <i class="bi bi-person-fill"></i>
                  <div>
                    <span class="label">{{ $t("about.traits") }}</span>
                    <span class="value">{{ $t("about.traitsValue") }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="bi bi-chat-heart-fill"></i>
                  <div>
                    <span class="label">{{ $t("about.communication") }}</span>
                    <span class="value">{{
                      $t("about.communicationValue")
                    }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="bi bi-briefcase-fill"></i>
                  <div>
                    <span class="label">{{ $t("about.expertise") }}</span>
                    <span class="value">{{ $t("about.expertiseValue") }}</span>
                  </div>
                </div>
              </div>

              <a
                href="https://line.me/ti/p/2w7bwfksdF"
                target="_blank"
                class="btn btn-line mt-4"
                v-ripple
              >
                <i class="bi bi-line me-2"></i>{{ $t("about.addLine") }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="section">
      <div class="container">
        <SectionHeader
          :badge="$t('about.skillsBadge')"
          :title="$t('about.skillsTitle')"
          :highlight="$t('about.skillsTitleHighlight')"
        />

        <div class="row g-4">
          <div
            class="col-md-6 col-lg-4"
            v-for="category in skillCategories"
            :key="category.name"
          >
            <div
              class="glass-card skill-category h-100 border-beam spotlight-card"
              v-spotlight
            >
              <div
                class="skill-category-icon"
                :style="{ background: category.gradient }"
              >
                <i :class="category.icon"></i>
              </div>
              <h3 class="skill-category-title">{{ category.name }}</h3>
              <div class="skill-tags">
                <span
                  class="skill-tag"
                  v-for="skill in category.skills"
                  :key="skill"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Work Process Section -->
    <section class="section">
      <div class="container">
        <SectionHeader
          :badge="$t('about.processBadge')"
          :title="$t('about.processTitle')"
          :highlight="$t('about.processTitleHighlight')"
          :description="$t('about.processDescription')"
        />

        <div class="row">
          <div
            class="col-12 col-lg-3"
            v-for="(step, index) in workProcess"
            :key="step.id"
          >
            <div class="process-card">
              <div class="process-number">
                {{ String(index + 1).padStart(2, "0") }}
              </div>
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

    <!-- Testimonials Section -->
    <section class="section">
      <div class="container">
        <SectionHeader
          :badge="$t('about.testimonialsBadge')"
          :title="$t('about.testimonialsTitle')"
          :highlight="$t('about.testimonialsTitleHighlight')"
        />

        <div class="row g-4 justify-content-center">
          <div
            class="col-md-6 col-lg-4"
            v-for="testimonial in testimonials"
            :key="testimonial.id"
          >
            <div class="glass-card testimonial-card h-100 border-beam spotlight-card crd-hard" v-spotlight>
              <div class="testimonial-top">
                <div class="testimonial-quote">
                  <i class="bi bi-quote"></i>
                </div>
                <span class="testimonial-icon-chip">
                  <i :class="testimonial.icon"></i>
                </span>
              </div>
              <p class="testimonial-text">{{ testimonial.text }}</p>
              <div class="testimonial-footer">
                <div class="testimonial-avatar">{{ testimonial.author.charAt(0) }}</div>
                <div class="testimonial-info">
                  <h4 class="testimonial-author">{{ testimonial.author }}</h4>
                  <span class="testimonial-role">{{ testimonial.role }}</span>
                </div>
              </div>
              <a
                :href="testimonial.caseUrl"
                target="_blank"
                rel="noopener"
                class="testimonial-case"
              >
                <i class="bi bi-box-arrow-up-right"></i>{{ testimonial.caseLabel }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import SectionHeader from "@/components/common/SectionHeader.vue";
import PageHeader from "@/components/common/PageHeader.vue";
import profileImg from "@/assets/images/profile-new.jpg";

const { t } = useI18n();

const contentSection = ref(null);

const scrollToContent = () => {
  contentSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};



const skillCategories = computed(() => [
  {
    name: t("about.skillCategories.frontend"),
    icon: "bi bi-palette",
    gradient: "linear-gradient(135deg, #8B5E3C 0%, #A4785A 100%)",
    skills: [
      "Vue.js",
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Tailwind CSS",
    ],
  },
  {
    name: t("about.skillCategories.backend"),
    icon: "bi bi-server",
    gradient: "linear-gradient(135deg, #A4785A 0%, #C89B6D 100%)",
    skills: ["Node.js", "PHP", "Python", "Express.js", "REST API"],
  },
  {
    name: t("about.skillCategories.database"),
    icon: "bi bi-database",
    gradient: "linear-gradient(135deg, #A4785A 0%, #C89B6D 100%)",
    skills: ["MySQL", "PostgreSQL", "Firebase", "Supabase"],
  },
  {
    name: t("about.skillCategories.tools"),
    icon: "bi bi-tools",
    gradient: "linear-gradient(135deg, #6B4226 0%, #8B5E3C 100%)",
    skills: ["Git", "Docker", "VS Code", "Postman"],
  },
  {
    name: t("about.skillCategories.cloud"),
    icon: "bi bi-cloud",
    gradient: "linear-gradient(135deg, #8B5E3C 0%, #C89B6D 100%)",
    skills: ["Zeabur", "Vercel", "Netlify"],
  },
  {
    name: t("about.skillCategories.other"),
    icon: "bi bi-lightning",
    gradient: "linear-gradient(135deg, #C89B6D 0%, #A4785A 100%)",
    skills: [
      t("about.skillCategories.seo"),
      t("about.skillCategories.uiux"),
      t("about.skillCategories.pm"),
      t("about.skillCategories.docs"),
    ],
  },
]);

const workProcess = computed(() => [
  {
    id: 1,
    icon: "bi bi-chat-square-text",
    title: t("about.process.communication"),
    description: t("about.process.communicationDesc"),
  },
  {
    id: 2,
    icon: "bi bi-pencil-square",
    title: t("about.process.planning"),
    description: t("about.process.planningDesc"),
  },
  {
    id: 3,
    icon: "bi bi-code-slash",
    title: t("about.process.development"),
    description: t("about.process.developmentDesc"),
  },
  {
    id: 4,
    icon: "bi bi-rocket-takeoff",
    title: t("about.process.launch"),
    description: t("about.process.launchDesc"),
  },
]);

const testimonials = computed(() => [
  {
    id: 1,
    icon: "bi bi-calendar2-check",
    text: t("about.testimonials.t1Text"),
    author: t("about.testimonials.t1Author"),
    role: t("about.testimonials.t1Role"),
    caseLabel: t("about.testimonials.t1Case"),
    caseUrl: "https://church-serve.pages.dev/",
  },
  {
    id: 2,
    icon: "bi bi-bag-check",
    text: t("about.testimonials.t2Text"),
    author: t("about.testimonials.t2Author"),
    role: t("about.testimonials.t2Role"),
    caseLabel: t("about.testimonials.t2Case"),
    caseUrl: "https://www.clay.com.tw/",
  },
  {
    id: 3,
    icon: "bi bi-clipboard-data",
    text: t("about.testimonials.t3Text"),
    author: t("about.testimonials.t3Author"),
    role: t("about.testimonials.t3Role"),
    caseLabel: t("about.testimonials.t3Case"),
    caseUrl: "https://general-erp.pages.dev/",
  },
]);
</script>

<style scoped>
.about-content {
  padding-left: 2rem;
}

.about-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.about-text {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.about-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-accent);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  transition: all var(--transition-base);
}

.info-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.info-item i {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: 12px;
  color: var(--primary-color);
  font-size: 1.25rem;
  box-shadow: var(--shadow-sm);
}

.info-item .label {
  display: block;
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 0.2rem;
}

.info-item .value {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.95rem;
}

/* Skill Category */
.skill-category {
  padding: 2.5rem;
  text-align: center;
  height: 100%;
}

.skill-category-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  border-radius: 16px;
  font-size: 1.75rem;
  color: white;
  box-shadow: 0 8px 16px -4px rgba(139, 94, 60, 0.2);
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
  color: rgba(5, 150, 105, 0.1);
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
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
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

/* Process Arrows */
.process-card::after {
  font-family: "bootstrap-icons";
  position: absolute;
  color: #A4785A;
  font-size: 1.5rem;
  opacity: 0.5;
  transition: var(--transition-base);
}

/* Desktop: Arrow Points Right */
@media (min-width: 992px) {
  .process-card::after {
    content: "\F138"; /* bi-arrow-right */
    top: 50%;
    right: -20%; /* Position in the gap */
    transform: translateY(-50%);
  }

  /* Hide arrow on the last item */
  .col-lg-3:last-child .process-card::after {
    display: none;
  }
}

/* Mobile/Tablet: Arrow Points Down */
@media (max-width: 991.98px) {
  .process-card::after {
    content: "\F128"; /* bi-arrow-down */
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
  }

  /* Add spacing for the arrow on mobile */
  .col-12:not(:last-child) .process-card {
    margin-bottom: 3rem;
  }

  /* Hide arrow on the last item */
  .col-lg-3:last-child .process-card::after {
    display: none;
  }
}

@media (max-width: 767.98px) {
  .about-info {
    grid-template-columns: 1fr;
  }

  .about-content {
    padding-left: 0;
    margin-top: 2rem;
  }
}

/* Testimonial Card */
.testimonial-card {
  padding: 2.5rem 2rem;
  position: relative;
  transition: var(--transition-base);
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.testimonial-icon-chip {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(200, 155, 109, 0.12);
  border: 1px solid rgba(200, 155, 109, 0.4);
  color: var(--primary-light);
  font-size: 1.2rem;
  flex-shrink: 0;
}

.testimonial-quote {
  font-size: 2.5rem;
  color: var(--primary-color);
  opacity: 0.2;
  line-height: 1;
  margin-bottom: 1rem;
}

.testimonial-text {
  font-style: italic;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

.testimonial-footer {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-color);
}

.testimonial-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(139, 94, 60, 0.3);
}

.testimonial-info {
  min-width: 0;
}

.testimonial-author {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.testimonial-role {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.testimonial-case {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1.1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-light);
  text-decoration: none;
  opacity: 0.85;
  transition: var(--transition-base);
}

.testimonial-case i {
  font-size: 0.7rem;
}

.testimonial-case:hover {
  opacity: 1;
  color: var(--primary-color);
  transform: translateX(2px);
}
</style>
