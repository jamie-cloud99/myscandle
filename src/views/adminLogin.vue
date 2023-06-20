<template>
  <div class="bg-fix"></div>
  <div class="container py-5">
    <h1 class="text-center my-5">登入管理後台</h1>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <form class="form-bg bg-white bg-opacity-50 rounded-md p-5" @submit.prevent="login">
        <div class="mb-3">
          <label for="inputEmail" class="form-label">帳號</label>
          <input
            type="email"
            v-model="email"
            id="inputEmail"
            class="form-control"
            placeholder="請輸入 E-mail"
            required
          />
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">密碼</label>
          <input
            type="password"
            v-model="password"
            id="inputPassword"
            class="form-control"
            required
          />
        </div>
        <div class="text-center mt-5">
          <button class="btn btn-primary" type="submit">登入</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const api = `${import.meta.env.VITE_API}admin/signin`
      const user = { username: this.email, password: this.password }
      try {
        const res = await this.axios.post(api, user)

        if (res.data.success) {
          const { token, expired } = res.data
          document.cookie = `mysToken=${token};expires=${new Date(expired)};`
          this.$router.push('/admin/product')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
