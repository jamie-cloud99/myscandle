import { defineStore } from "pinia"
import axios from "axios";
const {VITE_API, VITE_PATH} = import.meta.env

export const useProductsStore = defineStore('adminProductsStore',{
  state: () => ({
    products: []
  }),
  actions: {
    async fetchProductsAll() {
      const api = `${VITE_API}api/${VITE_PATH}/admin/products/all`
      try {
        const res = await axios.get(api)
        if(res.data.success) {
          this.products = res.data.products
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    productList: ({ products}) => {
      const items = [...products]
      return items
    }
  }
})
