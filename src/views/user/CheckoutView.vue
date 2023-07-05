<template>
  <div class="container">
    <div class="row justify-content-center my-5">
      <div class="col col-md-8 col-lg-6">
        <div class="d-flex p-3 bg-light">
          <p class="fw-bold">訂單日期：{{ $format.date(orderSubmitted.create_at) }}</p>
          <p class="fw-bold ms-4 flex-grow-1">訂單金額：NT$ {{ $format.currency(Math.floor(orderSubmitted.total)) }}</p>
          <button type="button">收合明細</button>
        </div>
        <table class="table my-4">
          <tbody class="">
            <tr class="border-bottom border-primary">
              <td style="width: 40%;" class="px-3">訂單編號：</td>
              <td>{{ orderSubmitted.id }}</td>
            </tr>
            <tr class="border-bottom border-primary">
              <td style="width: 40%;" class="px-3">付款狀態：</td>
              <td><p v-if="orderSubmitted.is_paid">已付款</p><p v-else>未付款</p></td>
            </tr>
            <tr class="border-bottom border-primary">
              <td style="width: 40%;" class="px-3">收件人：</td>
              <td>{{ orderSubmitted.user.name }}</td>
            </tr>
            <tr class="border-bottom border-primary">
              <td style="width: 40%;" class="px-3">收件地址：</td>
              <td>{{ orderSubmitted.user.address }}</td>
            </tr>
            <tr class="border-bottom border-primary">
              <td style="width: 40%;" class="px-3">聯絡電話：</td>
              <td>{{ orderSubmitted.user.tel }}</td>
            </tr>
            <tr class="border-bottom border-primary">
              <td style="width: 40%;" class="px-3">email：</td>
              <td>{{ orderSubmitted.user.email }}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-center mt-3">
          <button type="button" class="btn btn-primary px-5" @click.prevent="completePayment(orderSubmitted.id)">確認付款</button>
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
  computed: {
    ...mapState(statusStore, ['paymentStep']),
    ...mapState(cartStore, ['orderSubmitted','orderId'])
  },
  methods: {
    ...mapActions(cartStore, ['openCheckout', 'checkout']),
    completePayment(id) {
      this.checkout(id)
      this.$router.replace('/payment-success')
    }
  },
  created() {
    this.openCheckout()
  }
}
</script>
