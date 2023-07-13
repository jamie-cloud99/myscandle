import { defineStore } from "pinia"
import statusStore from "./statusStore"

const status = statusStore()

export default defineStore('toastStore', {
  state: () => ({
    message: {},
    count: 0
  }),
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
      });
    },
    showFailToast(message) {
      status.isLoading = false
      this.pushMessage({
        style: 'error',
        content: message
      });
    },
    pushMessage(res) {
      this.$patch({message: res, count: this.count+1})
    }
  }
})