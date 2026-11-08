<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const title = computed(() => {
  if (route.path === '/') return 'Dashboard'
  if (route.path === '/lessons') return 'Git Lessons'
  if (route.path.startsWith('/lessons/')) return 'Lesson Details'
  if (route.path === '/commands') return 'Git Commands'
  if (route.path === '/practice') return 'Practice'
  if (route.path === '/quiz') return 'Git Quiz'

  return 'Git Learning'
})
</script>

<template>
  <header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-5 md:px-8">
    <div>
      <h2 class="font-bold text-slate-800 text-lg">{{ title }}</h2>
      <p class="text-xs text-slate-500">Learn • Practice • Improve</p>
    </div>

    <div class="flex items-center gap-3">
      <span class="text-sm text-slate-500 hidden sm:block">
        Welcome, Student
      </span>

      <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
        S
      </div>
    </div>
  </header>
</template>