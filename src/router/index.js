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
          path: 'brand',
          component: () => import('@/views/user/BrandStory.vue')
        },
        {
          path: 'contactus',
          component: () => import('@/views/user/ContactUs.vue')
        },
        {
          path: 'search',
          component: () => import('@/views/user/ProductSearch.vue')
        },
        {
          path: 'shop',
          name: 'Shop',
          component: () => import('@/views/user/ProductList.vue')
        },
        {
          path: 'product/:productId',
          name: 'Product',
          component: () => import('@/views/user/ProductDetail.vue')
        },
        {
          path: 'cart',
          component: () => import('@/views/user/PaymentView.vue'),
          children: [
            {
              path: '',
              name: 'Cart',
              component: () => import('@/views/user/CartView.vue')
            },
            {
              path: 'order',
              component: () => import('@/views/user/OrderView.vue')
            },
            {
              path: 'checkout',
              component: () => import('@/views/user/CheckoutView.vue')
            },
          ]
        },
        {
          path: 'payment-success',
          component: () => import('@/views/user/PaymentSuccess.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: () => import('@/views/admin/AdminDashboard.vue'),
      children: [
        {
          path: 'product',
          name: 'Products',
          component: () => import('@/views/admin/ProductList.vue')
        },
        {
          path: 'order',
          name: 'Order',
          component: () => import('@/views/admin/OrderList.vue')
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: () => import('@/views/admin/CouponList.vue')
        }
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
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { 
        top: 0, 
        behavior: 'smooth',
      }
    }
  }
})

export default router
