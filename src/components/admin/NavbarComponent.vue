<template>
  <nav class="navbar navbar-expand-md bg-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <h5 class="font-galada text-primary fs-1 fs-lg-2">MyS</h5>
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="page in pages" :key="page.title">
            <RouterLink class="nav-link" aria-current="page" :to="page.route">{{
              page.title
            }}</RouterLink>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link" @click="openLogoutModal">登出</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import toastMixin from '@/mixins/toastMixin'

export default {
  data() {
    return {
      pages: [
        {
          title: '商品',
          route: '/admin/product'
        },
        {
          title: '訂單',
          route: '/admin/order'
        },
        {
          title: '優惠券',
          route: '/admin/coupon'
        }
      ]
    }
  },
  mixins: [toastMixin],
  methods: {
    openLogoutModal() {
      this.comfirmLogout()
    },

    async comfirmLogout() {
      const api = `${import.meta.env.VITE_API}logout`
      try {
        const res = await this.axios.post(api)
        if (res.data.success) {
          document.cookie = `mysToken=;expires=${new Date(0)}`
          this.$router.push('/login')
        }
      } catch (error) {
        this.handleError()
      }
    }
  }
}
</script>
