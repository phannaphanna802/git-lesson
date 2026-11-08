import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../pages/Dashboard.vue'
import Lessons from '../pages/Lessons.vue'
import LessonDetail from '../pages/LessonDetail.vue'
import Commands from '../pages/Commands.vue'
import Practice from '../pages/Practice.vue'
import Quiz from '../pages/Quiz.vue'
import ManageLessons from '../pages/ManageLessons.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/lessons', component: Lessons },
  { path: '/manage-lessons', component: ManageLessons },
  { path: '/lessons/:id', component: LessonDetail },
  { path: '/commands', component: Commands },
  { path: '/practice', component: Practice },
  { path: '/quiz', component: Quiz },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router