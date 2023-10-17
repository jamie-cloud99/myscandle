<template>
  <div class="offcanva-cart p-3" :class="{ show: showCart, 'transform-none': showDelModal }">
    <button type="button" class="shop-link text-primary mb-3" @click="toggleCartPreview">
      <i class="bi bi-chevron-double-left me-2"></i>返回
    </button>
    <h3 class="fs-5 mb-3">購物清單</h3>
    <div class="mb-3">
      <CartTable />
    </div>
    <div v-if="cartList.length" class="mb-3 d-flex justify-content-end">
      <button type="btn" class="btn btn-outline-primary px-4" @click="goShopPage">繼續逛逛</button>
      <button type="btn" class="btn btn-primary px-4 ms-3" @click="goCartPage">前往結帳</button>
    </div>
    <div v-else class="mb-4 text-center">
      <button class="btn btn-primary px-3" type="button" @click="goShopPage">
        購物車空空如也，去看一些好商品吧！
      </button>
    </div>
  </div>
  <div class="overlay" :class="{ show: showCart }"></div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import cartStore from '@/stores/cartStore'
import CartTable from '../cart/CartTable.vue'
export default {
  components: {
    CartTable
  },

  computed: {
    ...mapState(cartStore, ['cartList']),
    ...mapState(statusStore, ['showCart', 'showDelModal'])
  },
  methods: {
    ...mapActions(statusStore, ['toggleCartPreview']),
    goCartPage() {
      this.$router.push('/cart')
      this.toggleCartPreview()
    },
    goShopPage() {
      this.$router.push('/shop')
      this.toggleCartPreview()
    }
  }
}
</script>

<style lang="scss" scoped>
.offcanva-cart {
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(100%);
  width: 100%;
  height: 100%;
  overflow: auto;
  max-width: 500px;
  background: url('https://i.imgur.com/6vGoqRp.jpg'), url('../images/background/bg.png') no-repeat;
  background-size: cover;
  z-index: 1051;
  transition: all 0.5s;
  &.show {
    transform: none;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 800;
  transform: translateX(-100%);
  transition: all 0.3s;
  &.show {
    transform: translateX(0%);
  }
}

.shop-link {
  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}
</style>
