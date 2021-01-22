import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import flow from '../views/flow/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/flow',
    name: 'index',
    component: flow
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
