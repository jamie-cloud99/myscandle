import { defineStore } from 'pinia'
import axios from 'axios'
import statusStore from './statusStore'
import toastStore from './toastStore'
import productsStore from './productsStore'

const { VITE_API, VITE_PATH } = import.meta.env

const status = statusStore()
const toast = toastStore()
const products = productsStore()

export default defineStore('cartStore', {
  state: () => ({
    cartList: [],
    cartsTotal: {
      total: 0,
      final_total: 0
    },
    couponMessage: '',
    orderId: '',
    orderSubmitted: {},
    recommendedProducts: []
  }),
  actions: {
    async fetchCart() {
      status.isLoading = true
      const api = `${VITE_API}api/${VITE_PATH}/cart`
      try {
        const res = await axios.get(api)
        if (res.data.success) {
          this.cartList = res.data.data.carts
          this.cartsTotal.total = res.data.data.total
          this.cartsTotal.final_total = res.data.data.final_total
          status.isLoading = false
          status.cartLoadingItem = ''
          this.fetchRecommendedProducts()
        }
      } catch (error) {
        status.isLoading = false
        console.log(error)
        status.cartLoadingItem = ''
      }
    },
    async addToCart(product_id, qty = 1) {
      status.cartLoadingItem = product_id
      const api = `${VITE_API}api/${VITE_PATH}/cart`
      const cart = { product_id, qty }
      try {
        const res = await axios.post(api, { data: cart })
        if (res.data.success) {
          await this.fetchCart()
          toast.showSuccessToast(res.data.message)
        } else {
          toast.showFailToast(res.data.message)
        }
      } catch (error) {
        toast.handleError()
      }
    },
    async updateCart(cart, qty) {
      status.cartLoadingItem = cart.id
      const api = `${VITE_API}api/${VITE_PATH}/cart/${cart.id}`
      const data = { product_id: cart.product_id, qty }
      try {
        const res = await axios.put(api, { data })
        if (res.data.success) {
          await this.fetchCart()
          toast.showSuccessToast(res.data.message)
        } else {
          toast.showFailToast(res.data.message)
        }
      } catch (error) {
        toast.handleError()
      }
    },
    async deleteCart(cartId) {
      const api = `${VITE_API}api/${VITE_PATH}/cart/${cartId}`
      try {
        const res = await axios.delete(api)
        if (res.data.success) {
          await this.fetchCart()
          toast.showSuccessToast(res.data.message)
        } else {
          toast.showFailToast(res.data.message)
        }
      } catch (error) {
        toast.handleError()
      }
    },
    async clearCarts() {
      status.isLoading = true
      const api = `${VITE_API}api/${VITE_PATH}/carts`
      try {
        const res = await axios.delete(api)
        if (res.data.success) {
          await this.fetchCart()
          status.isLoading = false
          toast.showSuccessToast(res.data.message)
        } else {
          status.isLoading = false
          toast.showFailToast(res.data.message)
        }
      } catch (error) {
        status.isLoading = false
        toast.handleError()
      }
    },
    async useCoupon(code) {
      status.couponLoading = true
      const api = `${VITE_API}api/${VITE_PATH}/coupon`
      try {
        const res = await axios.post(api, { data: { code } })
        if (res.data.success) {
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
    async submitOrder(user, message = '') {
      status.orderLoading = true
      const api = `${VITE_API}api/${VITE_PATH}/order`
      try {
        const res = await axios.post(api, { data: { user, message } })
        if (res.data.success) {
          status.orderLoading = false
          this.orderId = res.data.orderId
          status.paymentStep = 3
        } else {
          status.orderLoading = false
        }
      } catch (error) {
        status.orderLoading = false
      }
    },
    async fetchOrder(id) {
      status.isLoading = true
      const api = `${VITE_API}api/${VITE_PATH}/order/${id}`
      try {
        const res = await axios.get(api)
        if (res.data.success) {
          status.isLoading = false
          this.orderSubmitted = res.data.order
        } else {
          status.isLoading = false
          toast.showFailToast(res.data.message)
        }
      } catch (error) {
        status.isLoading = false
        toast.handleError()
      }
    },
    async checkout(id) {
      status.isLoading = true
      const api = `${VITE_API}api/${VITE_PATH}/pay/${id}`
      try {
        const res = await axios.post(api)
        if (res.data.success) {
          status.isLoading = false
          this.orderSubmitted = {}
          this.orderId = ''
        }
      } catch (error) {
        status.isLoading = false
        toast.handleError()
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
    },
    async fetchRecommendedProducts() {
      await products.fetchAllProducts()
      const historyView = JSON.parse(localStorage.getItem('historyView')) || []
      const filteredProducts = products.productsAll.filter((product) =>
        historyView
          .filter((viewedId) => !this.cartList.some((cartItem) => cartItem.id === viewedId))
          .some((id) => id === product.id)
      )

      while (filteredProducts.length < 6) {
        const randomIndex = Math.floor(Math.random() * products.productsAll.length)
        const randomProduct = products.productsAll[randomIndex]
        if (!filteredProducts.includes(randomProduct) && !this.cartList.includes(randomProduct)) {
          filteredProducts.push(randomProduct)
        }
      }
      this.recommendedProducts = filteredProducts.slice(0, 6)
    }
  }
})
