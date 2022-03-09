import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  // 前台
  {
    path: '/',
    name: 'FrontView',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'products',
        component: () => import('../views/ProductsList.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      }
    ]
  },
  // 帳號登入
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  // 後台
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/ProductsAdmin.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/OrderView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/CouponsAdmin.vue')
      }
    ]
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
  // Redirect：登入時，無法從登入頁跳到後台首頁？
  // {
  //   path: '/admin/:pathMatch(.*)*',
  //   redirect: {
  //     name: 'Login'
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active' // bootstrap 樣式
})

export default router
