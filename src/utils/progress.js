const STORAGE_KEY = 'git-learning-progress'

export function getCompletedLessons() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

export function completeLesson(id) {
  const completed = getCompletedLessons()

  if (!completed.includes(id)) {
    completed.push(id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
  }
}

export function getProgress(total) {
  if (!total) return 0

  return Math.round(
    (getCompletedLessons().length / total) * 100
  )
}