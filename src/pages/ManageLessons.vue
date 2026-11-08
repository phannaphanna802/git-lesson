<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { lessonStorageError, lessons, saveLessons } from '../data/lessons'

const categories = ['Beginner', 'Intermediate', 'Advanced']
const editingId = ref(null)
const formVisible = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const form = reactive(createEmptyLesson())

const isEditing = computed(() => editingId.value !== null)

function createEmptyLesson() {
  return {
    title: '',
    khmer: '',
    category: 'Beginner',
    duration: '10 min',
    description: '',
  }
}

function resetForm() {
  Object.assign(form, createEmptyLesson())
  editingId.value = null
  formVisible.value = false
  errorMessage.value = ''
}

function startCreate() {
  resetForm()
  formVisible.value = true
  successMessage.value = ''
}

function startEdit(lesson) {
  Object.assign(form, {
    title: lesson.title,
    khmer: lesson.khmer,
    category: lesson.category,
    duration: lesson.duration,
    description: lesson.description,
  })
  editingId.value = lesson.id
  formVisible.value = true
  errorMessage.value = ''
  successMessage.value = ''
}

function submitForm() {
  const title = form.title.trim()
  const description = form.description.trim()

  if (!title || !description) {
    errorMessage.value = 'Please enter a lesson title and description.'
    return
  }

  const lessonData = {
    title,
    khmer: form.khmer.trim(),
    category: form.category,
    duration: form.duration.trim() || '10 min',
    description,
  }

  try {
    if (isEditing.value) {
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === editingId.value ? { ...lesson, ...lessonData } : lesson,
      )
      saveLessons(updatedLessons)
      successMessage.value = 'Lesson updated.'
    } else {
      const nextId = lessons.reduce((highest, lesson) => Math.max(highest, lesson.id), 0) + 1
      saveLessons([
        ...lessons,
        {
          id: nextId,
          ...lessonData,
          content: [{ heading: title, text: description }],
          commands: [],
        },
      ])
      successMessage.value = 'Lesson created.'
    }

    resetForm()
  } catch (error) {
    console.error('Unable to save lesson.', error)
    errorMessage.value = 'Unable to save this lesson. Check your browser storage and try again.'
  }
}

function deleteLesson(lesson) {
  if (!window.confirm(`Delete "${lesson.title}"? This cannot be undone.`)) return

  try {
    saveLessons(lessons.filter((item) => item.id !== lesson.id))
    successMessage.value = 'Lesson deleted.'
    errorMessage.value = ''
  } catch (error) {
    console.error('Unable to delete lesson.', error)
    errorMessage.value = 'Unable to delete this lesson. Check your browser storage and try again.'
    successMessage.value = ''
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Manage Lessons</h1>
        <p class="text-slate-500 mt-2">Create, view, edit, and delete learning lessons.</p>
      </div>

      <button
        type="button"
        @click="startCreate"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
      >
        + Add Lesson
      </button>
    </div>

    <p v-if="lessonStorageError" role="alert" class="mt-5 bg-amber-50 text-amber-800 rounded-xl p-4">
      {{ lessonStorageError }}
    </p>
    <p v-if="errorMessage" role="alert" class="mt-5 bg-red-50 text-red-700 rounded-xl p-4">
      {{ errorMessage }}
    </p>
    <p v-if="successMessage" role="status" class="mt-5 bg-green-50 text-green-700 rounded-xl p-4">
      {{ successMessage }}
    </p>

    <form
      v-if="formVisible"
      @submit.prevent="submitForm"
      class="mt-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-5"
    >
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-lg font-bold text-slate-800">
          {{ isEditing ? 'Edit Lesson' : 'Create Lesson' }}
        </h2>
        <button type="button" @click="resetForm" class="text-sm text-slate-500 hover:text-slate-800">
          Cancel
        </button>
      </div>

      <div class="grid md:grid-cols-2 gap-5">
        <label class="block text-sm font-medium text-slate-700">
          Lesson title *
          <input
            v-model="form.title"
            required
            maxlength="120"
            class="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label class="block text-sm font-medium text-slate-700">
          Khmer title
          <input
            v-model="form.khmer"
            maxlength="120"
            class="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label class="block text-sm font-medium text-slate-700">
          Category
          <select
            v-model="form.category"
            class="mt-2 w-full border border-slate-200 bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </label>

        <label class="block text-sm font-medium text-slate-700">
          Duration
          <input
            v-model="form.duration"
            maxlength="40"
            placeholder="10 min"
            class="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>

      <label class="block text-sm font-medium text-slate-700">
        Description *
        <textarea
          v-model="form.description"
          required
          maxlength="500"
          rows="3"
          class="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </label>

      <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold">
        {{ isEditing ? 'Save Changes' : 'Create Lesson' }}
      </button>
    </form>

    <div class="mt-7 flex items-center justify-between text-sm text-slate-500">
      <p>{{ lessons.length }} {{ lessons.length === 1 ? 'lesson' : 'lessons' }}</p>
      <RouterLink to="/lessons" class="text-blue-600 font-semibold hover:text-blue-800">
        View learning page →
      </RouterLink>
    </div>

    <div v-if="lessons.length" class="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
      <article
        v-for="lesson in lessons"
        :key="lesson.id"
        class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col"
      >
        <span class="self-start text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
          {{ lesson.category }}
        </span>
        <h2 class="font-bold text-lg text-slate-800 mt-4">{{ lesson.title }}</h2>
        <p v-if="lesson.khmer" class="text-sm text-slate-500 mt-1">{{ lesson.khmer }}</p>
        <p class="text-sm text-slate-500 mt-3 flex-1">{{ lesson.description }}</p>
        <p class="text-xs text-slate-400 mt-4">{{ lesson.duration }}</p>

        <div class="flex gap-3 mt-5">
          <RouterLink
            :to="`/lessons/${lesson.id}`"
            class="text-sm text-blue-600 font-semibold hover:text-blue-800"
          >
            View
          </RouterLink>
          <button
            type="button"
            @click="startEdit(lesson)"
            class="text-sm text-slate-600 font-semibold hover:text-slate-900"
          >
            Edit
          </button>
          <button
            type="button"
            @click="deleteLesson(lesson)"
            class="text-sm text-red-600 font-semibold hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </article>
    </div>

    <p v-else class="mt-5 bg-white border border-slate-200 rounded-2xl text-center text-slate-500 p-10">
      No lessons yet. Add one to get started.
    </p>
  </div>
</template>
