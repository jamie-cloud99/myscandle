<template>
  <NavbarComponent />
  <div class="container">
    <ToastMessages />
    <RouterView />
  </div>
</template>

<script>
import NavbarComponent from '@/components/admin/NavbarComponent.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/admin/ToastMessages.vue'

export default {
  components: {
    NavbarComponent,
    ToastMessages
  },
  methods: {
    async checkLogin() {
      const api = `${import.meta.env.VITE_API}api/user/check`
      try {
        const res = await this.axios.post(api)
        if (!res.data.success) {
          console.log('已登出，請重新登入')
          setTimeout(() => this.$router.push('/login'), 2000)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  provide() {
    return {
      emitter
    }
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)mysToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common.Authorization = token
    this.checkLogin()
  }
}
</script>
