<template>
  <form class="brief text-start" @submit.prevent="sendEmail">
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
        <select id="brief-stage" v-model.number="form.stage" class="form-select">
          <option v-for="(o, i) in options('stage')" :key="i" :value="i">{{ o }}</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label" for="brief-platform">{{ $t("contact.brief.platform") }}</label>
        <select id="brief-platform" v-model.number="form.platform" class="form-select">
          <option v-for="(o, i) in options('platform')" :key="i" :value="i">{{ o }}</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label" for="brief-budget">{{ $t("contact.brief.budget") }}</label>
        <select id="brief-budget" v-model.number="form.budget" class="form-select">
          <option v-for="(o, i) in options('budget')" :key="i" :value="i">{{ o }}</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label" for="brief-timing">{{ $t("contact.brief.timing") }}</label>
        <select id="brief-timing" v-model.number="form.timing" class="form-select">
          <option v-for="(o, i) in options('timing')" :key="i" :value="i">{{ o }}</option>
        </select>
      </div>

      <div class="col-12">
        <label class="form-label" for="brief-name">{{ $t("contact.brief.name") }}</label>
        <input id="brief-name" v-model.trim="form.name" class="form-control" type="text" autocomplete="name" />
      </div>
    </div>

    <div class="brief-actions">
      <button type="submit" class="btn btn-rainbow" :disabled="!form.idea">
        <i class="bi bi-envelope-fill me-2"></i>{{ $t("contact.brief.sendEmail") }}
      </button>
    </div>
    <p class="brief-note">{{ $t("contact.brief.note") }}</p>
  </form>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { contact } from "@/config/contact";

const { t, tm, rt } = useI18n();

// Selects hold the option index, so defaults never depend on when locale messages finish loading
const options = (name) => tm(`contact.brief.${name}Options`).map((o) => rt(o));
const form = reactive({ idea: "", stage: 0, platform: 0, budget: 0, timing: 0, name: "" });

const message = computed(() =>
  [
    t("contact.brief.mailGreeting", { name: form.name || "-" }),
    "",
    `${t("contact.brief.idea")}: ${form.idea}`,
    `${t("contact.brief.stage")}: ${options("stage")[form.stage]}`,
    `${t("contact.brief.platform")}: ${options("platform")[form.platform]}`,
    `${t("contact.brief.budget")}: ${options("budget")[form.budget]}`,
    `${t("contact.brief.timing")}: ${options("timing")[form.timing]}`,
  ].join("\n"),
);

const sendEmail = () => {
  if (!form.idea) return;
  const subject = encodeURIComponent(t("contact.brief.mailSubject"));
  const body = encodeURIComponent(message.value);
  window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
};
</script>

<style scoped>
.brief {
  max-width: 760px;
  margin: 3rem auto 0;
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
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
.form-label {
  font-weight: 600;
  color: var(--text-primary);
}
.form-control,
.form-select {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  min-height: 48px;
}
.form-control::placeholder {
  color: var(--text-muted);
}
.form-control:focus,
.form-select:focus {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(139, 94, 60, 0.25);
}
:global([data-theme="dark"]) .brief .form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23d9c7b2' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
}
.form-select option {
  background: var(--bg-secondary);
  color: var(--text-primary);
}
.brief-actions {
  margin-top: 1.5rem;
}
.brief-actions .btn {
  min-width: 220px;
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
