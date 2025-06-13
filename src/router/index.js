import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ConsultantsListPage from '@/views/ConsultantsListPage.vue'
import MainPage from '../main/MainPage.vue'
// import Mine from '../mine/Mine.vue'

const routes = [
  {
    path:'/',
    component: MainPage,
    children:[
      {
        path: '/home',
        name: 'Home',
        component: HomePage
      },
      {
        path: '/consultants',
        name: 'ConsultantsList',
        component: ConsultantsListPage
      },
      {
        path: '/consultant/:id',
        name: 'ConsultantDetail',
        component: () => import('@/views/ConsultantDetailPage.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/ProfilePage.vue')
      },
      {
        path: '/chat/:id',
        name: 'ChatPage',
        component: () => import('@/views/ChatPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/Reserve/:id',
        name: 'Reserve',
        component: () => import('@/views/ChatReserve.vue'),
      },
      //  {
      //     path: '/mine',
      //     component: Mine,
      //     // children: [
      //     //   {path: '/consultantRegister', name: 'ConsultantRegister', component: () => import('@/mine/ConsultantRegister.vue')},
      //     // ]
      //   }

    ]
  },

 
  
  // 在这里添加更多的路由
  // {
  //   path: '/consultants',
  //   name: 'Consultants',
  //   component: () => import('@/views/ConsultantsListPage.vue') // 懒加载
  // },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 在 vite.config.js 中配置 base
  routes
})

export default router 