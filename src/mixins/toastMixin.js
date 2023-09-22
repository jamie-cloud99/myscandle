export default {
  inject: ['emitter'],
  methods: {
    handleError() {
      this.isLoading = false
      this.emitter.emit('push-message', {
        style: 'error',
        content: '糟糕！發生錯誤，請稍後再試'
      })
    },
    showSuccessToast(message) {
      this.emitter.emit('push-message', {
        style: 'success',
        content: message
      })
    },
    showFailToast(message) {
      this.isLoading = false
      this.emitter.emit('push-message', {
        style: 'error',
        content: message
      })
    }
  }
}
