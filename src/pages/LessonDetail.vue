<script setup>
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { lessons } from '../data/lessons'
import { completeLesson, getCompletedLessons } from '../utils/progress'

const route = useRoute()

const lesson = computed(() =>
  lessons.find(item => item.id === Number(route.params.id))
)

const completed = ref(getCompletedLessons())

const isCompleted = computed(() =>
  lesson.value && completed.value.includes(lesson.value.id)
)

function markComplete() {
  if (lesson.value) {
    completeLesson(lesson.value.id)
    completed.value = getCompletedLessons()
  }
}
</script>

<template>
  <div v-if="lesson" class="max-w-4xl mx-auto">
    <RouterLink to="/lessons" class="text-blue-600 text-sm font-semibold">
      ← Back to Lessons
    </RouterLink>

    <div class="mt-6 bg-white border border-slate-200 rounded-2xl p-6 md:p-10">
      <span class="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
        {{ lesson.category }}
      </span>

      <h1 class="text-3xl font-bold text-slate-900 mt-5">
        {{ lesson.title }}
      </h1>

      <p class="text-slate-500 mt-2">{{ lesson.khmer }}</p>
      <p class="text-slate-400 text-sm mt-3">{{ lesson.duration }}</p>

      <div
        v-for="(section, index) in lesson.content"
        :key="index"
        class="mt-9"
      >
        <h2 class="text-xl font-bold text-slate-800">
          {{ index + 1 }}. {{ section.heading }}
        </h2>

        <p class="text-slate-600 leading-8 mt-3">
          {{ section.text }}
        </p>
      </div>

      <div class="mt-10">
        <h2 class="font-bold text-xl text-slate-800 mb-4">
          Practice Commands
        </h2>

        <div
          v-for="item in lesson.commands"
          :key="item.command"
          class="bg-slate-900 rounded-xl p-4 mb-3"
        >
          <code class="text-green-400 text-sm break-all">
            {{ item.command }}
          </code>
          <p class="text-slate-400 text-xs mt-2">{{ item.description }}</p>
        </div>
      </div>

      <button
        @click="markComplete"
        :disabled="isCompleted"
        class="mt-8 px-6 py-3 rounded-xl font-semibold"
        :class="isCompleted
          ? 'bg-green-100 text-green-700 cursor-default'
          : 'bg-blue-600 text-white hover:bg-blue-700'"
      >
        {{ isCompleted ? '✓ Lesson Completed' : 'Mark as Completed' }}
      </button>
    </div>
  </div>

  <div v-else class="text-center py-20">
    <h2 class="text-xl font-bold">Lesson Not Found</h2>
    <RouterLink to="/lessons" class="text-blue-600 mt-4 inline-block">
      Back to Lessons
    </RouterLink>
  </div>
</template>