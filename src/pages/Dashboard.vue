<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { lessons } from '../data/lessons'
import { getCompletedLessons, getProgress } from '../utils/progress'

const completed = ref(getCompletedLessons())
const progress = computed(() => getProgress(lessons.length))
</script>

<template>
  <div class="space-y-8">
    <section class="bg-linear-to-r from-blue-700 to-blue-500 rounded-3xl p-8 md:p-10 text-white">
      <p class="text-blue-100 text-sm font-medium">WELCOME TO GIT LEARNING HUB</p>

      <h1 class="text-3xl md:text-4xl font-bold mt-3">
        Learn Git from Zero 🚀
      </h1>

      <p class="text-blue-100 mt-3 max-w-xl">
        រៀន Git ពីកម្រិត Beginner រហូតដល់ Advanced តាមរយៈមេរៀន និងការអនុវត្តជាក់ស្តែង។
      </p>

      <RouterLink
        to="/lessons"
        class="inline-block mt-6 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50"
      >
        Start Learning →
      </RouterLink>
    </section>

    <section class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div class="bg-white border border-slate-200 rounded-2xl p-6">
        <p class="text-slate-500 text-sm">Total Lessons</p>
        <h2 class="text-3xl font-bold mt-2 text-slate-800">{{ lessons.length }}</h2>
        <p class="text-xs text-slate-400 mt-2">មេរៀនសរុប</p>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl p-6">
        <p class="text-slate-500 text-sm">Completed Lessons</p>
        <h2 class="text-3xl font-bold mt-2 text-green-600">{{ completed.length }}</h2>
        <p class="text-xs text-slate-400 mt-2">មេរៀនដែលបានបញ្ចប់</p>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl p-6">
        <p class="text-slate-500 text-sm">Learning Progress</p>
        <h2 class="text-3xl font-bold mt-2 text-blue-600">{{ progress }}%</h2>
        <div class="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
          <div
            class="bg-blue-600 h-full rounded-full transition-all"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </section>

    <section>
      <div class="flex justify-between items-center mb-5">
        <div>
          <h2 class="text-xl font-bold text-slate-800">Learning Path</h2>
          <p class="text-sm text-slate-500 mt-1">ផ្លូវសិក្សារបស់អ្នក</p>
        </div>

        <RouterLink to="/lessons" class="text-blue-600 text-sm font-semibold">
          View All →
        </RouterLink>
      </div>

      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <RouterLink
          v-for="lesson in lessons.slice(0, 3)"
          :key="lesson.id"
          :to="`/lessons/${lesson.id}`"
          class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-lg transition"
        >
          <div class="flex justify-between">
            <span class="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              {{ lesson.category }}
            </span>

            <span v-if="completed.includes(lesson.id)" class="text-green-600 text-xs font-semibold">
              ✓ Completed
            </span>
          </div>

          <h3 class="font-bold text-slate-800 mt-5">{{ lesson.title }}</h3>
          <p class="text-sm text-slate-500 mt-1">{{ lesson.khmer }}</p>
          <p class="text-sm text-slate-400 mt-4">{{ lesson.description }}</p>

          <p class="text-blue-600 text-sm font-semibold mt-5">
            Start Lesson →
          </p>
        </RouterLink>
      </div>
    </section>
  </div>
</template>