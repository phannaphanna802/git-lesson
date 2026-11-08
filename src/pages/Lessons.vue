<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { lessons } from '../data/lessons'

const search = ref('')
const category = ref('All')

const filteredLessons = computed(() => {
  return lessons.filter((lesson) => {
    const matchSearch =
      lesson.title.toLowerCase().includes(search.value.toLowerCase()) ||
      lesson.khmer.includes(search.value)

    const matchCategory =
      category.value === 'All' || lesson.category === category.value

    return matchSearch && matchCategory
  })
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-800">Git Lessons</h1>
    <p class="text-slate-500 mt-2">មេរៀន Git ពីកម្រិតដំបូងដល់កម្រិតខ្ពស់។</p>

    <div class="flex flex-col md:flex-row gap-3 my-7">
      <input
        v-model="search"
        placeholder="Search lessons..."
        class="flex-1 border border-slate-200 bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        v-model="category"
        class="border border-slate-200 bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>All</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
    </div>

    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      <RouterLink
        v-for="lesson in filteredLessons"
        :key="lesson.id"
        :to="`/lessons/${lesson.id}`"
        class="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-400 transition"
      >
        <span class="text-xs text-blue-700 bg-blue-50 rounded-full px-3 py-1">
          {{ lesson.category }}
        </span>

        <h2 class="font-bold text-lg text-slate-800 mt-5">
          {{ lesson.title }}
        </h2>

        <p class="text-sm text-slate-500 mt-1">{{ lesson.khmer }}</p>
        <p class="text-sm text-slate-400 mt-4">{{ lesson.description }}</p>

        <div class="flex justify-between items-center mt-6">
          <span class="text-xs text-slate-400">{{ lesson.duration }}</span>
          <span class="text-blue-600 font-semibold text-sm">Learn More →</span>
        </div>
      </RouterLink>
    </div>

    <p v-if="filteredLessons.length === 0" class="text-center text-slate-500 py-12">
      No lessons found. មិនមានមេរៀនដែលអ្នកស្វែងរកទេ។
    </p>
  </div>
</template>