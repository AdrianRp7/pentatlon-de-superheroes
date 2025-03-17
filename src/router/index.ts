import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: () => import('@/views/HeroesView.vue')
    },
    {
      path: '/pruebas',
      name: 'pruebas',
      component: () => import('@/views/PruebasView.vue')
    },
  ],
})

export default router
