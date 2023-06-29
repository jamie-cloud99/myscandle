import { defineStore } from "pinia"
import emitter from "../methods/emitter"
import statusStore from "./statusStore"

const status = statusStore()

export default defineStore('toastStore', {
  actions: {
    handleError() {
      status.isLoading = false
      this.pushMessage({
        style: 'error',
        content: '糟糕！發生錯誤，請稍後再試'
      })
    },
    showSuccessToast(message) {
      this.pushMessage({
        style: 'success',
        content: message
      })
    },
    showFailToast(message) {
      status.isLoading = false
      this.pushMessage({
        style: 'error',
        content: message
      })
    },
    pushMessage(res) {
      emitter.emit('push-message', res)
    }
  }
})