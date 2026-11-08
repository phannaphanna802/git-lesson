<script setup>
import { ref } from 'vue'

const copied = ref('')

const commands = [
  { command: 'git init', category: 'Repository', description: 'បង្កើត Git Repository ថ្មី។' },
  { command: 'git clone URL', category: 'Repository', description: 'ចម្លង Remote Repository មក Local។' },
  { command: 'git status', category: 'Basic', description: 'ពិនិត្យស្ថានភាពឯកសារ។' },
  { command: 'git add -A', category: 'Basic', description: 'បន្ថែមការផ្លាស់ប្តូរទាំងអស់ទៅ Staging Area។' },
  { command: 'git commit -m "message"', category: 'Basic', description: 'បង្កើត Commit ថ្មី។' },
  { command: 'git log', category: 'Basic', description: 'មើលប្រវត្តិ Commit។' },
  { command: 'git branch', category: 'Branch', description: 'មើល Branch ទាំងអស់។' },
  { command: 'git switch main', category: 'Branch', description: 'ប្តូរទៅ Main Branch។' },
  { command: 'git merge feature', category: 'Branch', description: 'បញ្ចូល Feature Branch។' },
  { command: 'git push', category: 'Remote', description: 'ផ្ញើ Commit ទៅ Remote។' },
  { command: 'git pull', category: 'Remote', description: 'ទាញយក និងបញ្ចូលការផ្លាស់ប្តូរ។' },
  { command: 'git remote -v', category: 'Remote', description: 'មើល Remote URLs។' },
]

async function copyCommand(command) {
  try {
    await navigator.clipboard.writeText(command)
    copied.value = command
    setTimeout(() => copied.value = '', 1500)
  } catch {
    copied.value = ''
    alert('Copy failed. សូម Copy ដោយដៃ។')
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-800">Git Commands</h1>
    <p class="text-slate-500 mt-2">ពាក្យបញ្ជាសំខាន់ៗដែល Developer គួរតែស្គាល់។</p>

    <div class="grid md:grid-cols-2 gap-4 mt-7">
      <div
        v-for="item in commands"
        :key="item.command"
        class="bg-white border border-slate-200 rounded-2xl p-5"
      >
        <div class="flex justify-between items-center gap-2">
          <span class="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            {{ item.category }}
          </span>

          <button
            @click="copyCommand(item.command)"
            class="text-xs text-blue-600 font-semibold hover:text-blue-800"
          >
            {{ copied === item.command ? '✓ Copied' : 'Copy Code' }}
          </button>
        </div>

        <pre class="bg-slate-900 text-green-400 rounded-xl p-4 mt-4 overflow-x-auto"><code>{{ item.command }}</code></pre>

        <p class="text-sm text-slate-500 mt-3">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>