<script setup>
import { computed, ref } from 'vue'

const questions = [
  {
    question: 'What is Git?',
    options: [
      'Programming Language',
      'Version Control System',
      'Database',
      'Web Browser',
    ],
    answer: 1,
    explanation: 'Git គឺជា Distributed Version Control System។',
  },
  {
    question: 'Which command creates a new repository?',
    options: ['git add', 'git commit', 'git init', 'git push'],
    answer: 2,
    explanation: 'git init ប្រើសម្រាប់បង្កើត Repository ថ្មី។',
  },
  {
    question: 'Which command saves a commit?',
    options: ['git status', 'git commit', 'git branch', 'git clone'],
    answer: 1,
    explanation: 'git commit រក្សាទុក Snapshot នៃការផ្លាស់ប្តូរ។',
  },
  {
    question: 'Which command uploads commits to a remote repository?',
    options: ['git push', 'git pull', 'git log', 'git init'],
    answer: 0,
    explanation: 'git push ផ្ញើ Local Commits ទៅ Remote Repository។',
  },
  {
    question: 'Which command shows repository status?',
    options: ['git merge', 'git clone', 'git status', 'git switch'],
    answer: 2,
    explanation: 'git status បង្ហាញស្ថានភាពឯកសារ។',
  },
]

const current = ref(0)
const selected = ref(null)
const score = ref(0)
const finished = ref(false)

const question = computed(() => questions[current.value])

function submitAnswer() {
  if (selected.value === null) return

  if (selected.value === question.value.answer) {
    score.value++
  }

  if (current.value === questions.length - 1) {
    finished.value = true
  } else {
    current.value++
    selected.value = null
  }
}

function restartQuiz() {
  current.value = 0
  selected.value = null
  score.value = 0
  finished.value = false
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold text-slate-800">Git Knowledge Quiz</h1>
    <p class="text-slate-500 mt-2">សាកល្បងចំណេះដឹងរបស់អ្នកអំពី Git។</p>

    <div class="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mt-7">
      <div v-if="!finished">
        <div class="flex justify-between text-sm text-slate-500">
          <span>Question {{ current + 1 }} of {{ questions.length }}</span>
          <span>Score: {{ score }}</span>
        </div>

        <div class="h-2 bg-slate-100 rounded-full mt-3">
          <div
            class="h-2 bg-blue-600 rounded-full"
            :style="{ width: `${((current + 1) / questions.length) * 100}%` }"
          ></div>
        </div>

        <h2 class="font-bold text-xl text-slate-800 mt-8">
          {{ question.question }}
        </h2>

        <div class="space-y-3 mt-6">
          <button
            v-for="(option, index) in question.options"
            :key="option"
            @click="selected = index"
            class="w-full text-left border rounded-xl p-4 transition"
            :class="selected === index
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-slate-200 hover:border-blue-300'"
          >
            <span class="font-semibold mr-3">{{ String.fromCharCode(65 + index) }}.</span>
            {{ option }}
          </button>
        </div>

        <button
          @click="submitAnswer"
          :disabled="selected === null"
          class="mt-7 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-semibold"
        >
          {{ current === questions.length - 1 ? 'Finish Quiz' : 'Next Question →' }}
        </button>
      </div>

      <div v-else class="text-center py-8">
        <div class="text-5xl">🏆</div>

        <h2 class="text-2xl font-bold text-slate-800 mt-5">
          Quiz Completed!
        </h2>

        <p class="text-slate-500 mt-3">Your Final Score</p>

        <p class="text-5xl text-blue-600 font-bold mt-3">
          {{ score }} / {{ questions.length }}
        </p>

        <p class="text-slate-500 mt-4">
          {{ Math.round((score / questions.length) * 100) }}% Correct Answers
        </p>

        <button
          @click="restartQuiz"
          class="bg-blue-600 text-white px-6 py-3 rounded-xl mt-7 font-semibold hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>