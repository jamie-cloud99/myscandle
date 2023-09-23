<template>
  <div class="container">
    <div class="row justify-content-center my-5">
      <div class="col col-md-9 col-xl-6">
        <div class="d-flex p-3 bg-light rounded-md">
          <p class="fw-bold">訂單日期：{{ $format.date(orderSubmitted.create_at) }}</p>
          <p class="fw-bold ms-4 flex-grow-1">
            訂單金額：NT$ {{ $format.currency(Math.floor(orderSubmitted.total)) }}
          </p>
          <button type="button" class="detail-btn" @click="toggleOrder">
            <span v-if="showDetail">收合</span>
            <span v-else>展開</span>明細</button>
        </div>
        <div class="order-detail mt-4" :class="{ show: showDetail }">
          <ul class="list-group rounded-md overflow-hidden">
            <li class="list-group-item border-primary p-3" v-for="cart in orderSubmitted.products" :key="cart.id">
              <div class="d-flex">
                <img
                  class="d-block cart-img"
                  :src="cart.product.imageUrl"
                  :alt="cart.product.title"
                />
                <div class="d-flex flex-column justify-content-between flex-grow-1">
                  <div class="d-flex justify-content-between align-items-start">
                    <h4 class="flex-grow-1 fs-6 ps-2 mb-0">{{ cart.product.title }}</h4>
                    <p class="flex-grow-1 text-primary-emphasis fs-sm text-end ps-2">
                      x {{ cart.qty }}
                    </p>
                  </div>
                  <p class="fs-sm ps-2 mt-2 flex-grow-1">
                    NT$ {{ $format.currency(cart.product.price) }}
                  </p>
                  <div class="d-flex justify-content-end align-items-center mt-2">
                    <s v-if="cart.total !== cart.final_total" class=""
                      >NT$ {{ $format.currency(cart.total) }}</s
                    >
                    <p class="text-primary fw-bold ps-2 flex-grow-1">
                      NT$ {{ $format.currency(cart.final_total) }}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <table class="table my-4"></table>
        <div class="text-center mt-3">
          <button
            type="button"
            class="btn btn-primary px-5"
            @click.prevent="completePayment(orderSubmitted.id)"
          >
            確認付款
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import statusStore from '../../stores/statusStore'
import cartStore from '../../stores/cartStore'

export default {
  components: {
    
  },
  data() {
    return {
      showDetail: true
    }
  },
  computed: {
    ...mapState(statusStore, ['paymentStep']),
    ...mapState(cartStore, ['orderSubmitted', 'orderId'])
  },
  methods: {
    ...mapActions(cartStore, ['openCheckout', 'checkout']),
    completePayment(id) {
      this.checkout(id)
      this.$router.replace('/payment-success')
    },
    toggleOrder() {
      this.showDetail = !this.showDetail
    }
  },
  created() {
    this.openCheckout()
  }
}
</script>

<style lang="scss" scoped>
.detail-btn {
  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}

.order-detail {
  max-height: 0;
  overflow: hidden;
  transition: all 1s ease-in-out;
  &.show {
    max-height: 100vh;
  }
}
</style>
