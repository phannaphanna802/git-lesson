<script setup>
import { RouterLink } from 'vue-router'

const menus = [
  { name: 'Dashboard', khmer: 'ផ្ទាំងគ្រប់គ្រង', icon: '⌂', path: '/' },
  { name: 'Lessons', khmer: 'មេរៀន', icon: '▤', path: '/lessons' },
  { name: 'Git Commands', khmer: 'ពាក្យបញ្ជា', icon: '⌘', path: '/commands' },
  { name: 'Practice', khmer: 'អនុវត្តន៍', icon: '⌨', path: '/practice' },
  { name: 'Quiz', khmer: 'សំណួរតេស្ត', icon: '✓', path: '/quiz' },
]
</script>

<template>
  <aside class="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-slate-200 bg-white md:min-h-screen p-4 md:p-5">
    <RouterLink to="/" class="flex items-center gap-3 mb-10">
      <div class="bg-blue-600 text-white rounded-xl w-11 h-11 flex items-center justify-center text-2xl font-bold">
        G
      </div>

      <div>
        <h1 class="font-bold text-slate-900 text-lg">Git Learning</h1>
        <p class="text-xs text-slate-500">Learn Git from Zero</p>
      </div>
    </RouterLink>

    <p class="text-xs font-semibold text-slate-400 uppercase mb-3">
      Learning Menu
    </p>

    <nav class="flex flex-wrap md:flex-col gap-2">
      <RouterLink
        v-for="menu in menus"
        :key="menu.path"
        :to="menu.path"
        class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition"
        active-class="!bg-blue-600 !text-white shadow-md shadow-blue-200"
      >
        <span class="text-lg w-6 text-center">{{ menu.icon }}</span>

        <div>
          <p class="font-semibold">{{ menu.name }}</p>
          <p class="text-xs opacity-70">{{ menu.khmer }}</p>
        </div>
      </RouterLink>
    </nav>

    <div class="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-4">
      <p class="text-blue-800 font-semibold text-sm">Keep Learning!</p>
      <p class="text-blue-600 text-xs mt-2">
        Practice Git every day to improve your skills.
      </p>
    </div>
  </aside>
</template>