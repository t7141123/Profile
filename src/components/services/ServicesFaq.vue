<template>
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">{{ $t("services.faqBadge") }}</span>
        <h2 class="section-title">
          {{ $t("services.faqTitle")
          }}<span class="highlight">{{
            $t("services.faqTitleHighlight")
          }}</span>
        </h2>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="accordion" id="faqAccordion">
            <div
              class="accordion-item"
              v-for="(faq, index) in faqs"
              :key="faq.id"
            >
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
                  <div v-if="faq.cards" class="faq-list">
                    <div
                      class="faq-item"
                      v-for="(card, cardIndex) in faq.cards"
                      :key="cardIndex"
                    >
                      <div class="faq-item-num">
                        0{{ cardIndex + 1 }}
                      </div>
                      <div class="faq-item-content">
                        <h4 class="faq-item-title">{{ card.title }}</h4>
                        <p class="faq-item-desc">{{ card.desc }}</p>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();

const faqs = computed(() => [
  {
    id: 1,
    question: t("services.faqs.q1"),
    answer: t("services.faqs.a1"),
  },
  {
    id: 2,
    question: t("services.faqs.q2"),
    answer: t("services.faqs.a2"),
  },
  {
    id: 3,
    question: t("services.faqs.q3"),
    answer: t("services.faqs.a3"),
  },
  {
    id: 4,
    question: t("services.faqs.q4"),
    answer: t("services.faqs.a4"),
    cards: tm("services.faqs.a4_cards"), // Add cards data
  },
  {
    id: 5,
    question: t("services.faqs.q5"),
    answer: t("services.faqs.a5"),
  },
  {
    id: 6,
    question: t("services.faqs.q6"),
    answer: t("services.faqs.a6"),
  },
  {
    id: 7,
    question: t("services.faqs.q7"),
    answer: t("services.faqs.a7"),
  },
  {
    id: 8,
    question: t("services.faqs.q8"),
    answer: t("services.faqs.a8"),
  },
]);
</script>

<style scoped>
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-left: 0.5rem;
}

.faq-item {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  position: relative;
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--bg-accent);
}

.faq-item-num {
  font-family: "JetBrains Mono", monospace, sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
  opacity: 0.9;
  line-height: 1;
  margin-top: 0.1rem;
  min-width: 2rem;
}

.faq-item-content {
  flex: 1;
}

.faq-item-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}

.faq-item-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 0;
}

.accordion-item {
  background: var(--bg-secondary);
  border: 1px solid rgba(139, 94, 60, 0.1);
  border-radius: var(--radius-lg) !important;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.accordion-button {
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 600;
  padding: 1.25rem;
  box-shadow: none !important;
  transition: all var(--transition-base);
}

.accordion-button:hover {
  background: var(--bg-accent);
}

.accordion-button:not(.collapsed) {
  background: rgba(139, 94, 60, 0.05);
  color: var(--primary-color);
}

.accordion-button::after {
  filter: none;
  color: var(--text-secondary);
}

.accordion-button:not(.collapsed)::after {
  color: var(--primary-color);
}

.accordion-body {
  color: var(--text-secondary);
  padding: 1rem 1.25rem 1.25rem;
  line-height: 1.8;
  white-space: pre-line;
  background: var(--bg-secondary);
}
</style>
