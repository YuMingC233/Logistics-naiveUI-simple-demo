import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import index from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      redirect: '/'
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/form-page',
      name: 'form-page',
      component: () => import('../views/form-page.vue')
    },
    {
      path: '/form-page/:id',
      name: 'form-page-modify',
      component: () => import('../views/form-page.vue')
    },
    {
      path: '/user-mng',
      name: 'user-mng',
      component: () => import('../views/form-page.vue')
    },
    {
      path: '/modify-pwd',
      name: 'modify-pwd',
      component: () => import('../views/modify-pwd.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
