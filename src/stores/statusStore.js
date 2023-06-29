import { defineStore } from "pinia"

export default defineStore('statusStore', {
  state: () => ({
    isLoading: false,  //! 待修正
    cartLoadingItem: '',
  }),
  actions: {
    
  }
})