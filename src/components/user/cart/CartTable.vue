<template>
  <div class="d-flex justify-content-between align-items-center mb-2">
    <h2 class="h5 ps-0 ps-md-3">購物車清單</h2>
    <button type="button" class="btn btn-outline-primary py-2" @click.prevent="openClearModal">
      全部刪除
    </button>
  </div>
  <ul>
    <li class="border border-primary p-3" v-for="cart in cartList" :key="cart.id">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img class="cart-img" :src="cart.product.imageUrl" :alt="cart.product.title" />
          <div>
            <h4 class="flex-grow-1 fs-6 px-2 mb-0">{{ cart.product.title }}</h4>
            <p class="fs-sm px-2">NT$ {{ $format.currency(cart.product.price) }}</p>
          </div>
        </div>
        <button type="button" @click.prevent="openDelModal(cart)">
          <i class="bi bi-trash3-fill p-2 pe-0"></i>
        </button>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-2">
        <QuantityBtn :cart="cart"></QuantityBtn>
        <p class="px-2 pe-0">NT$ {{ $format.currency(cart.total) }}</p>
      </div>
    </li>
  </ul>

  <DelCartModal
    ref="delCartModal"
    :item="tempCart"
    @confirm-deletion="deleteCartItem"
  ></DelCartModal>
  <ClearCartsModal ref="clearCartsModal" @confirm-clear="clearAllCarts"></ClearCartsModal>
</template>

<script>
import QuantityBtn from '../cart/QuantityBtn.vue'
import { mapState, mapActions } from 'pinia'
import statusStore from '../../../stores/statusStore'
import cartStore from '../../../stores/cartStore'
import DelCartModal from './DelCartModal.vue'
import ClearCartsModal from './ClearCartsModal.vue'

export default {
  emits: ['open-del-modal'],
  components: {
    QuantityBtn,
    DelCartModal,
    ClearCartsModal
  },
  data() {
    return {
      tempCart: {}
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading']),
    ...mapState(cartStore, ['cartList', 'cartsTotal'])
  },
  methods: {
    ...mapActions(cartStore, ['fetchCart', 'addToCart', 'updateCart', 'deleteCart', 'clearCarts']),
    deleteCartItem(cartId) {
      this.deleteCart(cartId)
      this.$refs.delCartModal.hideModal()
    },
    clearAllCarts() {
      this.clearCarts()
      this.$refs.clearCartsModal.hideModal()
    },
    openDelModal(cart) {
      this.tempCart = { ...cart }
      this.$refs.delCartModal.showModal()
    },
    openClearModal() {
      this.$refs.clearCartsModal.showModal()
    }
  },
  created() {
    this.fetchCart()
  }
}
</script>

