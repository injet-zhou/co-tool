import { useTitle } from '@vueuse/core'
import type { Router } from 'vue-router'

export const createRouterGuard = (router: Router) => {
  router.afterEach((to) => {
    useTitle(to.meta.title as string)
  })
}
