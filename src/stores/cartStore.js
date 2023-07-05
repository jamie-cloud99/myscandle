import { defineStore } from "pinia"
import axios from "axios"
import statusStore from "./statusStore"

const {VITE_API, VITE_PATH} = import.meta.env

const status = statusStore()

export default defineStore('cartStore', {
  state: () => ({
    cartList: [],
    cartsTotal: {
      total: 0,
      final_total: 0,
    },
    couponMessage: '',
    orderId: '',
    orderSubmitted: {},
  }),
  actions: {
    async fetchCart() {
      const api = `${VITE_API}api/${VITE_PATH}/cart`
      try {
        const res = await axios.get(api)
        if(res.data.success) {
          this.cartList = res.data.data.carts
          this.cartsTotal.total = res.data.data.total
          this.cartsTotal.final_total = res.data.data.final_total
          status.isLoading = false
          status.cartLoadingItem = ""
        }
      } catch (error) {
        status.isLoading = false
        console.log(error)
        status.cartLoadingItem = ""
      }
    },
    async addToCart(product_id, qty=1) {
      status.cartLoadingItem = product_id
      const api = `${VITE_API}api/${VITE_PATH}/cart`
      const cart = {product_id, qty }
      try {
        const res = await axios.post(api, {data: cart})
        if(res.data.success) {
          console.log(res.data)
          this.fetchCart()
        } else {
          console.log(res.data)
        }

      } catch (error) {
        console.log(error)
      }
    },
    async updateCart(cart, qty) {
      status.cartLoadingItem = cart.id
      const api = `${VITE_API}api/${VITE_PATH}/cart/${cart.id}`
      const data = {product_id: cart.product_id, qty }
      try {
        const res = await axios.put(api, {data})
        
        if(res.data.success) {
          this.fetchCart()
        } else {
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteCart(cartId) {
      const api = `${VITE_API}api/${VITE_PATH}/cart/${cartId}`
      try {
        const res = await axios.delete(api)
        if(res.data.success) {
          console.log(res.data) 
          this.fetchCart()
        }else {
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async clearCarts() {
      const api = `${VITE_API}api/${VITE_PATH}/carts`
      try {
        const res = await axios.delete(api)
        if(res.data.success) {
          console.log(res.data)
          this.fetchCart()
        } else {
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async useCoupon(code) {
      status.couponLoading = true
      const api = `${VITE_API}api/${VITE_PATH}/coupon`
      try {
        const res = await axios.post(api, {data: {code}})
        if(res.data.success) {
          console.log(res.data)
          this.couponMessage = res.data.message
          this.fetchCart()
          status.couponLoading = false
        } else {
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submitOrder(user, message="") {
      status.orderLoading = true
      const api = `${VITE_API}api/${VITE_PATH}/order`
      try {
        const res = await axios.post(api, {data: {user, message}})
        if(res.data.success) {
          status.orderLoading = false
          this.orderId = res.data.orderId
          status.paymentStep = 3
        } else{
          console.log(res.data)
          status.orderLoading = false
        }
      } catch (error) {
        console.log(error)
        status.orderLoading = false
      }
    },
    async fetchOrder(id) {
      const api = `${VITE_API}api/${VITE_PATH}/order/${id}`
      try {
        const res = await axios.get(api)
        if(res.data.success) {
          status.isLoading = false
          this.orderSubmitted = res.data.order
        } else{
          console.log(res.data)
          status.isLoading = false
        }
      } catch (error) {
        console.log(error)
        status.isLoading = false
      }
    },
    async checkout(id) {
      const api = `${VITE_API}api/${VITE_PATH}/pay/${id}`
      try {
        
        const res = await axios.post(api)
        if(res.data.success) {
          status.isLoading = false
          this.orderSubmitted = {}
          this.orderId = ''
          console.log(res.data.message)
        } 
      } catch (error) {
        console.log(error)
        status.isLoading = false
      }
    },
    openCart() {
      status.paymentStep = 1
    },
    openOrder() {
      status.paymentStep = 2
    },
    openCheckout() {
      status.paymentStep = 3
      this.fetchOrder(this.orderId)
    }
  }
})