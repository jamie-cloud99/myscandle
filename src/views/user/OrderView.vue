<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-lg-8 pt-3 mb-5 mb-lg-0">
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
  components:{
    OrderProducts,
    OrderForm
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(statusStore, ['paymentStep'])
  },
  methods: {
    ...mapActions(cartStore, ['openOrder'])
  },
  created() {
    this.openOrder()
  }
}
</script>
