<script setup>
import { RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 md:flex">
    <AppSidebar />

    <main class="flex-1 min-w-0">
      <AppHeader />

      <div class="p-5 md:p-8 max-w-7xl mx-auto">
        <RouterView />
      </div>

      <footer class="text-center text-xs text-slate-400 py-6">
        © 2026 Git Learning Hub. Learn Git step by step.
      </footer>
    </main>
  </div>
</template>