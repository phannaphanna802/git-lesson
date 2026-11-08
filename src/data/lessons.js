import { reactive, ref } from 'vue'

const STORAGE_KEY = 'git-learning-lessons'

const defaultLessons = [
  {
    id: 1,
    title: 'Introduction to Git',
    khmer: 'សេចក្តីផ្តើមអំពី Git',
    category: 'Beginner',
    duration: '10 min',
    description: 'Learn what Git is and why developers use it.',
    content: [
      {
        heading: 'What is Git?',
        text: 'Git គឺជា Version Control System ដែលប្រើសម្រាប់តាមដានការផ្លាស់ប្តូររបស់ Source Code។ វាជួយឱ្យយើងអាចរក្សាទុកប្រវត្តិនៃការកែប្រែ និងត្រឡប់ទៅកំណែមុនបាន។',
      },
      {
        heading: 'Why use Git?',
        text: 'Git ជួយឱ្យ Developer ធ្វើការជាក្រុម គ្រប់គ្រង Source Code និងតាមដានការផ្លាស់ប្តូរបានងាយស្រួល។',
      },
    ],
    commands: [
      {
        command: 'git --version',
        description: 'ពិនិត្យ Git Version ដែលបានដំឡើង។',
      },
    ],
  },
  {
    id: 2,
    title: 'Install Git',
    khmer: 'របៀបដំឡើង Git',
    category: 'Beginner',
    duration: '10 min',
    description: 'Install and configure Git on your computer.',
    content: [
      {
        heading: 'Install Git',
        text: 'ដំឡើង Git for Windows រួចបើក PowerShell ឬ Terminal ដើម្បីប្រើ Git Commands។',
      },
      {
        heading: 'Configure Git',
        text: 'កំណត់ Username និង Email ដើម្បីឱ្យ Git ដឹងថា Commit នីមួយៗបង្កើតដោយអ្នកណា។',
      },
    ],
    commands: [
      {
        command: 'git config --global user.name "Your Name"',
        description: 'កំណត់ Git Username។',
      },
      {
        command: 'git config --global user.email "you@example.com"',
        description: 'កំណត់ Git Email។',
      },
      {
        command: 'git config --list',
        description: 'មើល Git Configuration។',
      },
    ],
  },
  {
    id: 3,
    title: 'Git Basic Commands',
    khmer: 'ពាក្យបញ្ជាមូលដ្ឋានរបស់ Git',
    category: 'Beginner',
    duration: '20 min',
    description: 'Learn init, add, commit, status and log.',
    content: [
      {
        heading: 'Initialize Repository',
        text: 'git init ប្រើសម្រាប់បង្កើត Git Repository ថ្មីនៅក្នុង Project Folder។',
      },
      {
        heading: 'Stage Changes',
        text: 'git add ប្រើសម្រាប់បន្ថែមឯកសារទៅក្នុង Staging Area មុនពេល Commit។',
      },
      {
        heading: 'Commit Changes',
        text: 'git commit ប្រើសម្រាប់រក្សាទុក Snapshot នៃការផ្លាស់ប្តូរ។',
      },
    ],
    commands: [
      { command: 'git init', description: 'បង្កើត Repository ថ្មី។' },
      { command: 'git status', description: 'ពិនិត្យស្ថានភាពឯកសារ។' },
      { command: 'git add -A', description: 'Add ការផ្លាស់ប្តូរទាំងអស់។' },
      { command: 'git commit -m "message"', description: 'បង្កើត Commit។' },
      { command: 'git log', description: 'មើលប្រវត្តិ Commit។' },
    ],
  },
  {
    id: 4,
    title: 'Git Branch',
    khmer: 'ការប្រើប្រាស់ Branch',
    category: 'Intermediate',
    duration: '20 min',
    description: 'Create and manage branches in Git.',
    content: [
      {
        heading: 'What is a Branch?',
        text: 'Branch គឺជាខ្សែការងារដាច់ដោយឡែក ដែលអនុញ្ញាតឱ្យយើងអភិវឌ្ឍ Feature ថ្មីដោយមិនប៉ះពាល់ទៅ Main Branch។',
      },
      {
        heading: 'Merge Branch',
        text: 'Merge ប្រើសម្រាប់បញ្ចូលការផ្លាស់ប្តូរពី Branch មួយទៅ Branch មួយទៀត។',
      },
    ],
    commands: [
      { command: 'git branch', description: 'បង្ហាញ Branch ទាំងអស់។' },
      { command: 'git branch feature', description: 'បង្កើត Branch ថ្មី។' },
      { command: 'git switch feature', description: 'ប្តូរទៅ Branch។' },
      { command: 'git merge feature', description: 'Merge Branch។' },
    ],
  },
  {
    id: 5,
    title: 'GitHub',
    khmer: 'ការប្រើប្រាស់ GitHub',
    category: 'Intermediate',
    duration: '25 min',
    description: 'Connect your local project with GitHub.',
    content: [
      {
        heading: 'What is GitHub?',
        text: 'GitHub គឺជា Platform សម្រាប់ Hosting Git Repositories និងសហការការងារជាមួយ Developer ផ្សេងៗ។',
      },
      {
        heading: 'Push and Pull',
        text: 'Push ប្រើសម្រាប់ផ្ញើ Commit ទៅ Remote Repository។ Pull ប្រើសម្រាប់ទាញយក និងបញ្ចូលការផ្លាស់ប្តូរពី Remote Repository។',
      },
    ],
    commands: [
      { command: 'git remote -v', description: 'មើល Remote Repository។' },
      { command: 'git remote add origin URL', description: 'ភ្ជាប់ Remote Repository។' },
      { command: 'git push -u origin main', description: 'Push ទៅ GitHub។' },
      { command: 'git pull origin main', description: 'Pull ការផ្លាស់ប្តូរ។' },
      { command: 'git clone URL', description: 'Clone Repository។' },
    ],
  },
  {
    id: 6,
    title: 'Git Workflow',
    khmer: 'លំហូរការងាររបស់ Git',
    category: 'Advanced',
    duration: '15 min',
    description: 'Understand the complete Git workflow.',
    content: [
      {
        heading: 'Git Workflow',
        text: 'ជាទូទៅ Git Workflow ចាប់ផ្តើមពីការកែប្រែ File បន្ទាប់មក Add ទៅ Staging Area និង Commit ដើម្បីរក្សាទុកការផ្លាស់ប្តូរ។',
      },
    ],
    commands: [
      { command: 'git status', description: 'ពិនិត្យការផ្លាស់ប្តូរ។' },
      { command: 'git add -A', description: 'បន្ថែមការផ្លាស់ប្តូរ។' },
      { command: 'git commit -m "update"', description: 'រក្សាទុក Commit។' },
      { command: 'git push', description: 'ផ្ញើទៅ Remote Repository។' },
    ],
  },
]

function readSavedLessons() {
  if (typeof window === 'undefined') return defaultLessons

  try {
    const savedLessons = window.localStorage.getItem(STORAGE_KEY)
    if (savedLessons === null) return defaultLessons

    const parsedLessons = JSON.parse(savedLessons)
    if (!Array.isArray(parsedLessons)) {
      throw new Error('Saved lessons must be an array.')
    }

    return parsedLessons
  } catch (error) {
    console.error('Unable to load saved lessons.', error)
    lessonStorageError.value = 'Saved lessons could not be loaded. New changes may replace the invalid saved data.'
    return defaultLessons
  }
}

export const lessonStorageError = ref('')
export const lessons = reactive(readSavedLessons())

export function saveLessons(nextLessons) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLessons))
  }

  lessons.splice(0, lessons.length, ...nextLessons)
  lessonStorageError.value = ''
}