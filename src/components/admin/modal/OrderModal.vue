<template>
  <div
    ref="modal"
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-light">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>編輯訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h3 class="fs-md mb-3">訂購資料</h3>
          <div class="container">
            <ul class="row mb-3" v-if="tempOrder.user">
              <li class="col-md-6 border border-primary py-1 px-2 flex-grow-1">
                <span class="fw-bold me-3">訂單編號</span> {{ tempOrder.id }}
              </li>
              <li class="col-md-6 border border-primary py-1 px-2">
                <span class="fw-bold me-3">訂購日期</span> {{ $format.date(tempOrder.create_at) }}
              </li>
              <li class="col-sm-6 col-md-4 border border-primary py-1 px-2">
                <span class="fw-bold me-3">收件人</span> {{ tempOrder.user.name }}
              </li>
              <li class="col-sm-6 col-md-4 border border-primary py-1 px-2 flex-grow-1">
                <span class="fw-bold me-3">Email</span> {{ tempOrder.user.email }}
              </li>
              <li class="col-md-4 border border-primary py-1 px-2">
                <span class="fw-bold me-3">手機</span> {{ tempOrder.user.tel }}
              </li>
              <li class="col-md-6 border border-primary py-1 px-2 flex-grow-1">
                <span class="fw-bold me-3">地址</span> {{ tempOrder.user.address }}
              </li>
              <li class="col-sm-6 col-md-4 border border-primary py-1 px-2">
                <span class="fw-bold me-3">付款狀態</span>
                <span v-if="tempOrder.is_paid" class="text-success">已付款</span>
                <span v-else class="text-danger">未付款</span>
              </li>
              <li class="col-sm-6 col-md-4 border border-primary py-1 px-2">
                <span class="fw-bold me-3">總金額</span>
                {{ $format.currency(tempOrder.total) }}
              </li>
              <li class="col-sm-6 col-md-4 border border-primary py-1 px-2">
                <span class="fw-bold me-3">數量</span>
                {{ countProducts }}
              </li>
              <li class="col-sm-6 col-md-4 border border-primary py-1 px-2">
                <span class="fw-bold me-3">付款日期</span>
                <span v-if="tempOrder.paid_date">{{ $format.date(tempOrder.paid_date) }}</span>
              </li>

              <li class="col border border-primary py-1 px-2">
                <span class="fw-bold me-3">訂單備註</span>
                {{ tempOrder.message }}
              </li>
            </ul>
          </div>
          <h3 class="fs-md mb-3">選購商品</h3>

          <table class="table">
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              <tr v-for="item in tempOrder.products" :key="item.id" class="border border-primary">
                <th>
                  {{ item.product.title }}
                </th>
                <td>{{ item.qty }} / {{ item.product.unit }}</td>
                <td class="text-end">
                  {{ $format.currency(item.final_total) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click.prevent="$emit('view')">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '../../../mixins/modalMixin'

export default {
  props: {
    order: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  emits: ['view'],
  mixins: [modalMixin],
  data() {
    return {
      tempOrder: {},
      createDate: ''
    }
  },
  watch: {
    order() {
      this.tempOrder = this.order
    }
  },
  computed: {
    countProducts() {
      const productKeys = Object.keys(this.order.products)

      const totalNum = productKeys.reduce((acc, cur) => {
        acc += this.order.products[cur].qty
        return acc
      }, 0)
      return totalNum
    }
  },
  methods: {
    isPhone(num) {
      const phone = /^09[0-9]{8}$/
      return !phone.test(num) ? '格式有誤，請輸入正確的手機號碼' : true
    }
  },
  created() {
    this.tempOrder = this.order
  }
}
</script>
