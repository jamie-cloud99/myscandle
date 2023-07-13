<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-lg-8 pt-3 mb-5 mb-lg-0">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <RouterLink
            to="/cart"
            class="d-flex align-items-center flex-grow-1 text-primary-emphasis py-2"
            ><i class="bi bi-chevron-left me-2"></i>返回購物車</RouterLink
          >
          <h2 class="h5 text-primary fw-bold">
            訂單金額：NT${{ $format.currency(cartsTotal.final_total) }}
          </h2>
        </div>
        <OrderProducts></OrderProducts>
      </div>
      <div class="col-lg-4 pt-3 mb-5 mb-lg-0">
        <OrderForm></OrderForm>
      </div>
    </div>
  </div>
</template>

<script>
import OrderProducts from '../../components/user/cart/OrderProducts.vue'
import OrderForm from '../../components/user/cart/OrderForm.vue'
import { mapState, mapActions } from 'pinia'
import statusStore from '../../stores/statusStore'
import cartStore from '../../stores/cartStore'

export default {
  components: {
    OrderProducts,
    OrderForm
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(statusStore, ['paymentStep']),
    ...mapState(cartStore, ['cartsTotal'])
  },
  methods: {
    ...mapActions(cartStore, ['openOrder'])
  },
  created() {
    this.openOrder()
  }
}
</script>
