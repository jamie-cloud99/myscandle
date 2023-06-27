<template>
  <div
    ref="modal"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-light">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <VForm v-slot="{ errors }" @submit="$emit('confirm-edit', tempCoupon)">
          <div class="modal-body">
            <div class="row gx-2">
              <div class="col-md-6 mb-3">
                <label for="title" class="form-label"
                  >優惠券名稱<span class="text-danger">*</span></label
                >
                <VField
                  v-model="tempCoupon.title"
                  type="text"
                  class="form-control border"
                  id="title"
                  placeholder="請輸入名稱"
                  name="優惠券名稱"
                  rules="required"
                  :class="{ 'is-invalid': errors['優惠券名稱'] }"
                >
                </VField>
                <ErrorMessage name="優惠券名稱" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="col-md-6 mb-3">
                <label for="code" class="form-label"
                  >優惠券代碼<span class="text-danger">*</span></label
                >
                <VField
                v-model="tempCoupon.code"
                  type="text"
                  class="form-control border"
                  id="code"
                  placeholder="請輸入代碼"
                  name="優惠代碼"
                  :rules="isCode"
                  :class="{ 'is-invalid': errors['優惠代碼'] }"
                >
                </VField>
                <ErrorMessage name="優惠代碼" class="invalid-feedback"></ErrorMessage>
                
              </div>
            </div>
            <div class="row gx-2">
              <div class="col-md-6 mb-3">
                <label for="discount" class="form-label"
                  >折扣百分比<span class="text-danger">*</span></label
                >
                <VField
                  v-model.number="tempCoupon.percent"
                  type="number"
                  class="form-control border"
                  id="discount"
                  placeholder="請輸入折扣"
                  min="1"
                  max="100"
                  name="折扣"
                  :rules="isPercent"
                  :class="{ 'is-invalid': errors['折扣'] }"
                >
                </VField>
                <ErrorMessage name="折扣" class="invalid-feedback"></ErrorMessage>
                <p class="form-text">請輸入正整數，例如 70% (7 折)請輸入：70</p>
              </div>
              <div class="col-md-6 mb-3">
                <label for="due_date" class="form-label"
                  >到期日<span class="text-danger">*</span></label
                >
                <VField
                v-model="dueDate" type="date" class="form-control border" id="due_date"
                  name="到期日"
                  rules="required"
                  :class="{ 'is-invalid': errors['到期日'] }"
                >
                </VField>
                <ErrorMessage name="到期日" class="invalid-feedback"></ErrorMessage>
                
                <p class="form-text">日期格式 月/日/西元年，例如：09/19/2025</p>
              </div>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  v-model="tempCoupon.is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  啟用優惠券<span class="text-danger">*</span>
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="submit" class="btn btn-primary">確認</button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '../../../mixins/modalMixin'

export default {
  mixins: [modalMixin],
  props: {
    coupon: {}
  },
  emits: ['confirm-edit'],
  data() {
    return {
      tempCoupon: {},
      dueDate: ''
    }
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')
      this.dueDate = dateAndTime[0]
    },
    dueDate() {
      this.tempCoupon.due_date = Math.floor(new Date(this.dueDate) / 1000)
    }
  },
  methods: {
    isPercent(num) {
      const tensDigit = /^[0-9]{1,2}$|^100$/
      return !tensDigit.test(num) ? '請輸入1-100的整數' : true
    },
    isCode(text) {
      if(!text) return '優惠代碼 為必填'
      const regex = /^[A-Za-z0-9]{5,10}$/
      return !regex.test(text) ? '請輸入5-10個字元，可接受英文字母大小寫、數字' : true
    }
  }
}
</script>
