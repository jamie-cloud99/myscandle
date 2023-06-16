import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/user/LayoutView.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/user/HomeView.vue')
        },
        {
          path: '/shop',
          name: 'Shop',
          component: () => import('@/views/user/ProductList.vue')
        },
        {
          path: '/cart',
          name: 'Cart',
          component: () => import('@/views/user/CartView.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: () => import('@/views/admin/AdminDashboard.vue'),
      children: [

      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/adminLogin.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error404',
      component: () => import('@/views/user/Error404View.vue')
    }
  ],
  linkActiveClass: 'active'
})

export default router
