<template>
  <div class="orbiting-stage" aria-hidden="true">
    <div class="orbiting-center">David</div>

    <div class="orbiting-ring orbiting-ring-outer">
      <div
        v-for="(b, i) in outer"
        :key="`o-${i}`"
        class="orbiting-badge"
        :class="`pos-${i}`"
      >
        <i :class="b.icon"></i>
      </div>
    </div>

    <div class="orbiting-ring orbiting-ring-inner">
      <div
        v-for="(b, i) in inner"
        :key="`i-${i}`"
        class="orbiting-badge"
        :class="`pos-${i}`"
      >
        <i :class="b.icon"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
const outer = [
  { icon: "bi bi-filetype-jsx" },
  { icon: "bi bi-code-slash" },
  { icon: "bi bi-hdd-stack" },
];

const inner = [
  { icon: "bi bi-gear-wide-connected" },
  { icon: "bi bi-cloud-arrow-up" },
  { icon: "bi bi-shield-check" },
];
</script>
