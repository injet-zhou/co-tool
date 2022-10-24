import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuard } from '@/router/guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/HomePage.vue'),
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/data-gen/single',
        name: 'DataGenSingle',
        component: () => import('@/views/data-gen/SingleData.vue'),
      },
      {
        path: '/database/table-build',
        name: 'TableBuild',
        component: () => import('@/views/database/TableBuild.vue'),
      }
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

createRouterGuard(router)

export default router
