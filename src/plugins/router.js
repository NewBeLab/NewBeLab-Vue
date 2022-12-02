import { createRouter, createWebHistory } from 'vue-router'
import RouterTestFirst from '@/components/views/RouterTestFirst.vue'
import RouterTestSecond from '@/components/views/RouterTestSecond.vue'
import Login from '@/components/views/Login.vue'
import Callback from '@/components/views/Callback.vue'

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
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router