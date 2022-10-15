import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuard } from '~/router/guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('~/views/home/HomePage.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

createRouterGuard(router)

export default router
