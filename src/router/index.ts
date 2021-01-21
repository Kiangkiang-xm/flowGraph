import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import index from '../views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  // {
  //   path: '/mobile',
  //   name: 'mobile',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/mobile/index.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
