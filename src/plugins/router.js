import { createRouter, createWebHistory } from 'vue-router'
import RouterTestFirst from '@/components/views/RouterTestFirst.vue'
import RouterTestSecond from '@/components/views/RouterTestSecond.vue'

const routes = [
  {
    path: '/',
    name: 'routerTestFirst',
    component: RouterTestFirst
  },
  {
    path: '/second',
    name: 'routerTestSecond',
    component: RouterTestSecond
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router