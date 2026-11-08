<script setup>
import { ref } from 'vue'

const answer = ref('')
const checked = ref(false)

const tasks = [
  {
    question: 'តើ Command មួយណាប្រើសម្រាប់បង្កើត Git Repository ថ្មី?',
    answer: 'git init',
    hint: 'ចាប់ផ្តើមដោយ git ...',
  },
  {
    question: 'តើ Command មួយណាប្រើសម្រាប់ពិនិត្យ Git Status?',
    answer: 'git status',
    hint: 'Command មានពាក្យ status។',
  },
  {
    question: 'តើ Command មួយណាប្រើសម្រាប់ Add ឯកសារទាំងអស់?',
    answer: 'git add -A',
    hint: 'ចាប់ផ្តើមដោយ git add ...',
  },
  {
    question: 'តើ Command មួយណាប្រើសម្រាប់ Commit ជាមួយ Message?',
    answer: 'git commit -m "first commit"',
    hint: 'ប្រើ option -m សម្រាប់ Message។',
  },
]

const index = ref(0)

function checkAnswer() {
  checked.value = true
}

function nextTask() {
  index.value = (index.value + 1) % tasks.length
  answer.value = ''
  checked.value = false
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold text-slate-800">Git Practice</h1>
    <p class="text-slate-500 mt-2">អនុវត្ត Git Commands ដោយខ្លួនឯង។</p>

    <div class="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mt-7">
      <div class="flex justify-between text-sm text-slate-500">
        <span>Practice Question</span>
        <span>{{ index + 1 }} / {{ tasks.length }}</span>
      </div>

      <div class="w-full bg-slate-100 rounded-full h-2 mt-3">
        <div
          class="bg-blue-600 rounded-full h-2 transition-all"
          :style="{ width: `${((index + 1) / tasks.length) * 100}%` }"
        ></div>
      </div>

      <h2 class="text-xl font-bold text-slate-800 mt-8">
        {{ tasks[index].question }}
      </h2>

      <label class="block text-sm font-semibold text-slate-600 mt-7 mb-2">
        Your Git Command
      </label>

      <input
        v-model="answer"
        @keyup.enter="checkAnswer"
        placeholder="Type your Git command..."
        class="w-full border border-slate-200 rounded-xl px-4 py-4 font-mono outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        @click="checkAnswer"
        :disabled="!answer.trim()"
        class="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl mt-5 font-semibold"
      >
        Check Answer
      </button>

      <div v-if="checked" class="mt-6 rounded-xl p-5"
        :class="answer.trim().toLowerCase() === tasks[index].answer.toLowerCase()
          ? 'bg-green-50 text-green-800'
          : 'bg-amber-50 text-amber-800'"
      >
        <p class="font-bold">
          {{
            answer.trim().toLowerCase() === tasks[index].answer.toLowerCase()
              ? '✓ Correct Answer!'
              : 'Not quite. Try again!'
          }}
        </p>

        <p class="text-sm mt-2">
          Hint: {{ tasks[index].hint }}
        </p>

        <p v-if="answer.trim().toLowerCase() !== tasks[index].answer.toLowerCase()" class="text-sm mt-2">
          Try typing the correct command again.
        </p>
      </div>

      <button
        @click="nextTask"
        class="block ml-auto text-blue-600 font-semibold mt-8"
      >
        Next Question →
      </button>
    </div>
  </div>
</template>