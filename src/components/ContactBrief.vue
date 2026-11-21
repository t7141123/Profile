<template>
  <form class="brief glass-card text-start" @submit.prevent="sendEmail">
    <h2 class="brief-title">{{ $t("contact.brief.title") }}</h2>
    <p class="brief-desc">{{ $t("contact.brief.desc") }}</p>

    <div class="row g-3">
      <div class="col-12">
        <label class="form-label" for="brief-idea">{{ $t("contact.brief.idea") }}</label>
        <textarea
          id="brief-idea"
          v-model.trim="form.idea"
          class="form-control"
          rows="4"
          required
          :placeholder="$t('contact.brief.ideaHint')"
        ></textarea>
      </div>

      <div class="col-md-6">
        <label class="form-label" for="brief-stage">{{ $t("contact.brief.stage") }}</label>
        <select id="brief-stage" v-model="form.stage" class="form-select">
          <option v-for="o in tm('contact.brief.stageOptions')" :key="rt(o)" :value="rt(o)">{{ rt(o) }}</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label" for="brief-platform">{{ $t("contact.brief.platform") }}</label>
        <select id="brief-platform" v-model="form.platform" class="form-select">
          <option v-for="o in tm('contact.brief.platformOptions')" :key="rt(o)" :value="rt(o)">{{ rt(o) }}</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label" for="brief-budget">{{ $t("contact.brief.budget") }}</label>
        <select id="brief-budget" v-model="form.budget" class="form-select">
          <option v-for="o in tm('contact.brief.budgetOptions')" :key="rt(o)" :value="rt(o)">{{ rt(o) }}</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label" for="brief-timing">{{ $t("contact.brief.timing") }}</label>
        <select id="brief-timing" v-model="form.timing" class="form-select">
          <option v-for="o in tm('contact.brief.timingOptions')" :key="rt(o)" :value="rt(o)">{{ rt(o) }}</option>
        </select>
      </div>

      <div class="col-12">
        <label class="form-label" for="brief-name">{{ $t("contact.brief.name") }}</label>
        <input id="brief-name" v-model.trim="form.name" class="form-control" type="text" autocomplete="name" />
      </div>
    </div>

    <div class="brief-actions">
      <button type="button" class="btn btn-line" :disabled="!form.idea" @click="sendLine">
        <i class="bi bi-line me-2"></i>{{ $t("contact.brief.sendLine") }}
      </button>
      <button type="submit" class="btn btn-rainbow" :disabled="!form.idea">
        <i class="bi bi-envelope-fill me-2"></i>{{ $t("contact.brief.sendEmail") }}
      </button>
    </div>
    <p class="brief-note" role="status" aria-live="polite">
      {{ copied ? $t("contact.brief.copied") : $t("contact.brief.note") }}
    </p>
  </form>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { contact } from "@/config/contact";

const { t, tm, rt } = useI18n();
const copied = ref(false);

const first = (key) => rt(tm(key)[0]);
const form = reactive({
  idea: "",
  stage: first("contact.brief.stageOptions"),
  platform: first("contact.brief.platformOptions"),
  budget: first("contact.brief.budgetOptions"),
  timing: first("contact.brief.timingOptions"),
  name: "",
});

const message = computed(() =>
  [
    t("contact.brief.mailGreeting", { name: form.name || "-" }),
    "",
    `${t("contact.brief.idea")}: ${form.idea}`,
    `${t("contact.brief.stage")}: ${form.stage}`,
    `${t("contact.brief.platform")}: ${form.platform}`,
    `${t("contact.brief.budget")}: ${form.budget}`,
    `${t("contact.brief.timing")}: ${form.timing}`,
  ].join("\n"),
);

const sendEmail = () => {
  if (!form.idea) return;
  const subject = encodeURIComponent(t("contact.brief.mailSubject"));
  const body = encodeURIComponent(message.value);
  window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
};

const sendLine = async () => {
  if (!form.idea) return;
  try {
    await navigator.clipboard.writeText(message.value);
    copied.value = true;
  } catch {
    copied.value = false;
  }
  window.open(contact.line, "_blank", "noopener,noreferrer");
};
</script>

<style scoped>
.brief {
  max-width: 760px;
  margin: 3rem auto 0;
  padding: 2rem;
}
.brief-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.brief-desc {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}
.brief-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
.brief-note {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 1rem 0 0;
}
@media (max-width: 575.98px) {
  .brief {
    padding: 1.25rem;
  }
  .brief-actions .btn {
    width: 100%;
  }
}
</style>
