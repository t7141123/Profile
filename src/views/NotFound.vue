<template>
  <div class="container py-5 text-center">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="display-1 fw-bold text-primary">404</h1>
        <h2 class="mb-4">{{ $t('notFound.title') || 'Page Not Found' }}</h2>
        <p class="lead mb-4">
          {{ $t('notFound.message') || "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable." }}
        </p>
        <router-link to="/" class="btn btn-primary btn-lg">
          <i class="bi bi-house-door me-2"></i>{{ $t('nav.home') || 'Go to Homepage' }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  min-height: 60vh;
  display: flex;
  align-items: center;
}
</style>
