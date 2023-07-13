<template>
  <ul class="list-group rounded-md">
    <li class="border border-primary list-group-item p-3" v-for="cart in cartList" :key="cart.id">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img class="cart-img" :src="cart.product.imageUrl" :alt="cart.product.title" />
          <div class="align-self-start ms-sm-4">
            <RouterLink :to="`/product/${cart.product.id}`" class="flex-grow-1 product-link fs-6 px-2 mb-2">{{ cart.product.title }}</RouterLink>
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
  
</template>

<script>
import QuantityBtn from '../cart/QuantityBtn.vue'
import { mapState, mapActions } from 'pinia'
import statusStore from '../../../stores/statusStore'
import cartStore from '../../../stores/cartStore'
import DelCartModal from './DelCartModal.vue'


export default {
  emits: ['open-del-modal'],
  components: {
    QuantityBtn,
    DelCartModal,
    
  },
  data() {
    return {
      tempCart: {}
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading', 'showDelModal']),
    ...mapState(cartStore, ['cartList', 'cartsTotal'])
  },
  methods: {
    ...mapActions(cartStore, ['fetchCart', 'updateCart', 'deleteCart']),
    deleteCartItem(cartId) {
      this.deleteCart(cartId)
      this.$refs.delCartModal.hideModal()
    },
    
    openDelModal(cart) {
      this.tempCart = { ...cart }
      this.$refs.delCartModal.showModal()
    },
    
  },
  created() {
    this.fetchCart()
  }
}
</script>

<style lang="scss">
.cart-img {
  height: 5rem;
  width: 5rem;
  object-fit: cover;
  @include pad {
    height: 7rem;
    width: 7rem;
  }
}
</style>

