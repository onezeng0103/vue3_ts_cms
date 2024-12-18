import { createWebHashHistory, createRouter } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: import('@/views/main/index.vue')
    },
    {
      path: '/login',
      component: import('@/views/login/index.vue')
    }
  ]
})
export default router
