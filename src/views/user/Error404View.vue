<template>
  <div class="bg-fix"></div>
  <div class="container text-center">
    <div class="position-relative vh-100">
      <div class="position-absolute top-50 start-50 translate-middle">
        <h1 class="text-primary font-bold mb-3">404 Not Founded</h1>
        <h2 class="h4 mb-4">當前頁面不存在，將於 3 秒後自動返回首頁</h2>
        <p class="h2 text-center mb-4">{{ timeRemaining }}</p>

        <div>
          <p class="mb-3">如未自動返回請點擊以下按鈕</p>
          <button type="button" class="btn btn-primary" @click="$router.push('/')">回到首頁</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeRemaining: 3,
      countDownId: ''
    }
  },
  methods: {
    countDown(second) {
      const now = Date.now()
      const timeUp = now + second * 1000

      this.countDownId = setInterval(() => {
        this.timeRemaining = Math.round((timeUp - Date.now()) / 1000)
        if (this.timeRemaining <= 0) {
          clearInterval(this.countDownId)
          this.$router.push('/')
          return
        }
      }, 1000)
    }
  },
  mounted() {
    this.countDown(3)
  }
}
</script>

<style lang="scss" scoped></style>
