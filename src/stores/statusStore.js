import { defineStore } from 'pinia'

export default defineStore('statusStore', {
  state: () => ({
    isLoading: false,
    cartLoadingItem: '',
    couponLoading: false,
    paymentStep: 1,
    orderLoading: false,
    showCart: false,
    btnLoading: false
  }),
  actions: {
    toggleCartPreview() {
      this.showCart = !this.showCart
    },
    submitContactForm() {
      this.btnLoading = true
      setTimeout(() => {
        this.btnLoading = false
      }, 2000)
    },
    readyPage() {
      this.isLoading = false
    }
  }
})
