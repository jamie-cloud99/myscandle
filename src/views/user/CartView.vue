<template>
  <ul class="d-flex justify-content-center align-items-start my-5">
    <li
      class="d-flex flex-column justify-content-center align-items-center mx-3"
      v-for="item in progress"
      :key="'step' + item.step"
    >
      <p class="step-item border border-primary rounded-circle text-center mb-3">{{ item.step }}</p>
      <p>{{ item.title }}</p>
    </li>
  </ul>
  <div class="container">
    <div class="my-5">
      <CartTable></CartTable>
    </div>

    <div class="px-3 my-5">
      <div class="row">
        <div class="col-md-8 bg-primary bg-opacity-25 order-2 order-md-1 py-4">
          <h3 class="fs-5 px-4">加購專區</h3>
          <div class="row mx-2 mt-4">
            <div class="col-md-4" v-for="i in 3" :key="'i' + i">
              <AdditionalPurchase></AdditionalPurchase>
            </div>
          </div>
        </div>
        <div class="col-md-4 order-1 order-md-2 pt-3 mb-5 mb-md-0">
          <div class="coupon-group d-flex ps-2 mb-2">
            <input
              type="text"
              placeholder="輸入優惠碼"
              class="form-control coupon-input bg-transparent border border-primary mb-3 mb-lg-0"
            />
            <button type="button" class="btn btn-light border-primary ms-lg-3">使用優惠券</button>
          </div>
          <!-- v-if -->
          <p class="coupon-message text-primary my-auto ps-2">新會員首購，折抵 $ 100</p>
          <table class="table text-end  mx-2 mt-4">
            <tbody>
              <tr class="">
                <td class="text-start ">商品總計</td>
                <td class="">$ 1,599</td>
              </tr>
              <tr>
                <td class="text-start ">運費</td>
                <td class="">$ 100</td>
              </tr>
              <tr>
                <td class="text-start ">優惠折抵</td>
                <td class="text-primary">-$ 150</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-top border-primary">
                <td class="text-start ">結帳總金額</td>
                <td class="fs-md">$ 1,549</td>
              </tr>
            </tfoot>
          </table>

          <div class="d-flex justify-content-end mt-4 mt-lg-5">
            <button type="button" class="btn btn-primary btn-lg rounded-md">前往結帳</button>
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
  flex: 0;
  min-width: 9rem;
}
</style>

<script>
import AdditionalPurchase from '../../components/user/cart/AdditonalPurchase.vue'
import CartTable from '../../components/user/cart/CartTable.vue'

export default {
  components: {
    AdditionalPurchase,
    CartTable
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
      ]
    }
  }
}
</script>
