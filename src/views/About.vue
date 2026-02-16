<template>
  <div class="about-page">
    <!-- Page Header Section -->
    <section class="page-header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <span class="section-badge">{{ $t("about.badge") }}</span>
            <h1 class="page-title">
              {{ $t("about.title")
              }}<span class="highlight">{{ $t("about.titleHighlight") }}</span>
            </h1>
            <p class="page-description">
              {{ $t("about.pageDescription") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4 mb-4 mb-lg-0">
            <div class="about-image">
              <img src="@/assets/images/profile-new.jpg" alt="David Liu" loading="lazy" />
              <div class="experience-badge">
                <span class="years">7+</span>
                <span class="text">{{ $t("about.yearsExp") }}</span>
              </div>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="about-content">
              <h2 class="about-title">
                {{ $t("about.greeting") }}
                <span class="highlight">David Liu</span>
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
                class="btn btn-primary-custom mt-4"
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
            <div class="glass-card skill-category h-100">
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
    <section class="section" style="background: rgba(30, 41, 59, 0.3)">
      <div class="container">
        <SectionHeader
          :badge="$t('about.processBadge')"
          :title="$t('about.processTitle')"
          :highlight="$t('about.processTitleHighlight')"
          :description="$t('about.processDescription')"
        />

        <div class="row">
          <div
            class="col-md-6 col-lg-3"
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
            <div class="glass-card testimonial-card h-100">
              <div class="testimonial-quote">
                <i class="bi bi-quote"></i>
              </div>
              <p class="testimonial-text">{{ testimonial.text }}</p>
              <div class="testimonial-footer">
                <div class="testimonial-info">
                  <h4 class="testimonial-author">{{ testimonial.author }}</h4>
                  <span class="testimonial-role">{{ testimonial.role }}</span>
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
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import SectionHeader from "@/components/common/SectionHeader.vue";

const { t } = useI18n();



const skillCategories = computed(() => [
  {
    name: t("about.skillCategories.frontend"),
    icon: "bi bi-palette",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    skills: ["Node.js", "PHP", "Python", "Express.js", "REST API"],
  },
  {
    name: t("about.skillCategories.database"),
    icon: "bi bi-database",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase"],
  },
  {
    name: t("about.skillCategories.tools"),
    icon: "bi bi-tools",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    skills: ["Git", "Docker", "VS Code", "Figma", "Postman", "Linux"],
  },
  {
    name: t("about.skillCategories.cloud"),
    icon: "bi bi-cloud",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    skills: ["Zeabur", "GCP", "Vercel", "Netlify", "DigitalOcean"],
  },
  {
    name: t("about.skillCategories.other"),
    icon: "bi bi-lightning",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
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
    text: t("about.testimonials.t1Text"),
    author: t("about.testimonials.t1Author"),
    role: t("about.testimonials.t1Role"),
  },
  {
    id: 2,
    text: t("about.testimonials.t2Text"),
    author: t("about.testimonials.t2Author"),
    role: t("about.testimonials.t2Role"),
  },
  {
    id: 3,
    text: t("about.testimonials.t3Text"),
    author: t("about.testimonials.t3Author"),
    role: t("about.testimonials.t3Role"),
  },
]);
</script>

<style scoped>
/* About page specific styles start here */
.about-image {
  position: relative;
}

.about-image img {
  border-radius: 40px;
  width: 85%;
  display: block;
  margin: 0 auto;
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
  transform: scale(0.9);
  transform-origin: bottom right;
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

.about-content {
  padding-left: 3rem;
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
  background: rgba(5, 150, 105, 0.1);
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

  .about-image img {
    width: 100%;
  }

  .about-content {
    padding-left: 0;
    margin-top: 2rem;
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

/* Testimonial Card */
.testimonial-card {
  padding: 2.5rem 2rem;
  position: relative;
  transition: var(--transition-base);
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-quote {
  font-size: 2.5rem;
  color: var(--primary-light);
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
  margin-top: auto;
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
</style>
