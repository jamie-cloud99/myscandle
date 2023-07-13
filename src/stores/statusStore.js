import { defineStore } from "pinia"

export default defineStore('statusStore', {
  state: () => ({
    isLoading: false,  //! 待修正
    cartLoadingItem: '',
    couponLoading: false,
    paymentStep: 1,
    orderLoading: false,
    showCart: false,
  }),
  actions: {
    toggleCartPreview() {
      this.showCart = !this.showCart
    }
  }
})