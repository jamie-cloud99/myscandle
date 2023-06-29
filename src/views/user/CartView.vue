<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-lg-8 pt-3 mb-5 mb-md-0">
        <CartTable ></CartTable>
      </div>
      <div class="col-lg-4 pt-3 mb-5 mb-md-0">
          <h3 class="h5 py-2 mb-3 ps-2">使用優惠券</h3>
          <div class="coupon-group d-flex ps-2 mb-2">
            <input
              type="text"
              placeholder="輸入優惠碼"
              class="form-control coupon-input bg-transparent border border-primary mb-3 mb-lg-0"
              v-model.lazy="coupon"
            />
            <button type="button" class="btn btn-light border-primary ms-lg-3" @click.prevent="useCoupon(coupon)" :disabled="couponLoading"><span v-if="couponLoading" class="spinner-border text-primary spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-else>套用</span>
            </button>
          </div>
          <!-- v-if -->
          <p v-if="couponMessage" class="coupon-message text-primary my-auto ps-2">{{ couponMessage }}</p>
          <table class="table text-end mx-2 mt-4">
            <tbody>
              <tr class="">
                <td class="text-start ">商品總計</td>
                <td class="">NT$ {{ $format.currency(cartsTotal.total) }}</td>
              </tr>
              <tr>
                <td class="text-start ">運費</td>
                <td class="">NT$ 0</td>
              </tr>
              <tr>
                <td class="text-start ">優惠折抵</td>
                <td class="text-primary">- NT$ {{ $format.currency(cartsTotal.total - cartsTotal.final_total) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-top border-primary">
                <td class="text-start ">結帳總金額</td>
                <td class="fs-md">NT$ {{ $format.currency(cartsTotal.final_total) }}</td>
              </tr>
            </tfoot>
          </table>

          <div class="d-flex justify-content-between align-items-center mt-4 mt-lg-5">
            <RouterLink to="/shop"  class="d-flex align-items-center text-primary-emphasis py-2"><i class="bi bi-chevron-left me-2"></i>繼續購物</RouterLink>
            <button type="button" class="btn btn-primary btn-lg rounded-md"
            @click="openOrderPage">前往結帳</button>
          </div>

        </div>
    </div>


    <div class="px-3 my-5">
      <div class="row">
        <div class="col-lg-8 bg-primary bg-opacity-25 order-2 py-4">
          <h3 class="fs-5 px-4">加購專區</h3>
          <div class="row mx-2 mt-4">
            <div class="col-lg-4" v-for="i in 3" :key="'i' + i">
              <AdditionalPurchase></AdditionalPurchase>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    
  </div>
  

</template>

<style lang="scss">
.step-item {
  height: 3rem;
  width: 3rem;
  line-height: 3rem;
}

.coupon-group {
  flex-direction: column;

  @include desktop {
    flex-direction: row;
  }
}

.coupon-group .coupon-input {
  border-radius: 0.375rem;
  flex: 1;
  min-width: 9rem;
}

.bi-chevron-left::before {
  vertical-align: middle;
}
</style>

<script>
import AdditionalPurchase from '../../components/user/cart/AdditonalPurchase.vue'
import CartTable from '../../components/user/cart/CartTable.vue'
import { mapState, mapActions } from 'pinia'
import cartStore from '../../stores/cartStore'
import statusStore from '../../stores/statusStore'

export default {
  components: {
    AdditionalPurchase,
    CartTable,
  },
  data() {
    return {
      progress: [
        {
          step: 1,
          title: '購物車'
        },
        {
          step: 2,
          title: '訂購資訊'
        },
        {
          step: 3,
          title: '結帳'
        }
      ],
      coupon: 'new95'
    }
  },
  computed: {
    ...mapState(cartStore, ['cartList', 'couponMessage', 'cartsTotal']),
    ...mapState(statusStore, ['isLoading', 'couponLoading'])
  },
  methods: {
    ...mapActions(cartStore, ['useCoupon', 'openCart']),
    openOrderPage() {
      this.$router.push('/cart/order')
    }
  },
  created() {
    this.openCart()
  }
}
</script>
