<template>
  <div id="app">
    <!-- 導航列 -->
    <Navbar />
    
    <!-- 主要內容 -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- 頁尾 -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
/* 全域樣式已在 main.css 中定義 */
</style>
