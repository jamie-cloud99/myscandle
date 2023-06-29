<template>
  <ul class="d-block">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h2 class="h5 ps-0 ps-md-3">購物車清單</h2>
      <button type="button" class="btn btn-outline-primary py-2" @click.prevent="openClearModal">全部刪除</button>
    </div>
    <li class="border border-primary p-3" v-for="cart in cartList" :key="cart.id">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img class="cart-img" :src="cart.product.imageUrl" :alt="cart.product.title"  />
          <div>
            <h4 class="flex-grow-1 fs-6 px-2 mb-0">{{ cart.product.title }}</h4>
            <p class="fs-sm px-2">NT$ {{ $format.currency(cart.product.price) }}</p>
          </div>
        </div>
        <button type="button" @click.prevent="openDelModal(cart)"><i class="bi bi-trash3-fill p-2 pe-0"></i></button>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-2">
        <QuantityBtn :cart="cart"></QuantityBtn>
        <p class="px-2">NT$ {{ $format.currency(cart.final_total) }}</p>
      </div>
    </li>
  </ul>

  <div class="d-none">
    <table class="table align-middle text-center border border-primary">
      <thead class="border-bottom border-primary">
        <tr>
          <th>商品圖片</th>
          <th>商品名稱</th>
          <th>商品數量</th>
          <th>單價</th>
          <th>小計</th>
          <th><button type="button" class="text-info-emphasis" @click.prevent="openClearModal">全部刪除</button></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-bottom border-primary" v-for="cart in cartList" :key="cart.id">
          <td class="" style="width: 15%">
            <img class="cart-img" :src="cart.product.imageUrl" :alt="cart.product.title" />
          </td>
          <td class="" style="width: 25%">{{ cart.product.title }}</td>
          <td class="" style="width: 15%">
            <QuantityBtn :cart="cart"></QuantityBtn>
          </td>
          <td class="" style="width: 15%">NT$ {{ $format.currency(cart.product.price) }}</td>
          <td class="" style="width: 15%">NT$ {{ $format.currency(cart.final_total) }}</td>
          <td class="" style="width: 15%"><button type="button" @click.prevent="openDelModal(cart)"><i class="bi bi-trash3-fill p-3"></i></button></td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="border-bottom border-primary">
          <td colspan="2" class="text-start">
            <button type="button" class="btn btn-outline-primary rounded-sm ms-3 ms-md-2">
              繼續購物
            </button>
          </td>
          <td colspan="4" class="text-end pe-4">
            <p class="fs-md"><span class="fs-sm me-2">商品總計</span>$ {{ $format.currency(cartsTotal.total) }}</p>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  <DelCartModal ref="delCartModal" :item="tempCart" @confirm-deletion="deleteCartItem"></DelCartModal>
  <ClearCartsModal ref="clearCartsModal" @confirm-clear="clearAllCarts"></ClearCartsModal>
</template>

<script>
import QuantityBtn from '../cart/QuantityBtn.vue'
import {mapState, mapActions} from 'pinia'
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
    ...mapActions(cartStore, ['fetchCart', 'addToCart', 'updateCart', 'deleteCart' ,'clearCarts']),
    deleteCartItem(cartId) {
      this.deleteCart(cartId)
      this.$refs.delCartModal.hideModal()
    },
    clearAllCarts() {
      this.clearCarts()
      this.$refs.clearCartsModal.hideModal()
    },
    openDelModal(cart) {
      this.tempCart = {...cart}
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
