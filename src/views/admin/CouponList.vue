<template>
  <div class="text-end my-4">
    <button class="btn btn-primary" @click="openModal(true)">新增優惠券</button>
  </div>
  <div class="d-flex justify-content-center table-responsive">
    <table class="table mt-4">
      <thead>
        <tr class="align-middle">
          <th width="120">優惠名稱</th>
          <th width="100">折扣(%)</th>
          <th width="150">到期日</th>
          <th width="100">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="coupon in coupons" :key="coupon.id" class="border-bottom">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}</td>
          <td>{{ $format.date(coupon.due_date) }}</td>
          <td>
            <span class="text-success" v-if="coupon.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="d-sm-flex">
              <button
                class="d-block btn btn-outline-primary btn-sm mb-2 mb-sm-0 me-sm-2"
                @click="openModal(false, coupon)"
              >
                編輯
              </button>
              <button
                class="d-block btn btn-outline-danger btn-sm"
                @click="openDeleteModal(coupon)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mt-4 mb-5">
    <PaginationComponent :pages="pagination" @change-page="fetchCoupons"></PaginationComponent>
  </div>

  <CouponModal ref="couponModal" :coupon="tempCoupon" @confirm-edit="updateCoupon"></CouponModal>
  <DelModal ref="deleteModal" :item="tempCoupon" @confirm-deletion="confirmDeletion"></DelModal>
  <LoadingComponent v-show="isLoading"></LoadingComponent>
</template>

<script>
const { VITE_API, VITE_PATH } = import.meta.env
import PaginationComponent from '../../components/admin/PaginationComponent.vue'
import CouponModal from '../../components/admin/modal/CouponModal.vue'
import DelModal from '../../components/admin/modal/DelModal.vue'
import toastMixin from '../../mixins/toastMixin'

export default {
  components: {
    PaginationComponent,
    CouponModal,
    DelModal
  },
  mixins: [toastMixin],
  data() {
    return {
      coupons: [],
      pagination: {},
      isNew: true,
      tempCoupon: {},
      isLoading: true
    }
  },
  methods: {
    async fetchCoupons(page = 1) {
      const api = `${VITE_API}api/${VITE_PATH}/admin/coupons?page=${page}`
      try {
        const res = await this.axios.get(api)
        if (res.data.success) {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          this.isLoading = false
        }
      } catch (error) {
        this.handleError()
      }
    },
    async updateCoupon(item) {
      this.isLoading = true
      let api = `${VITE_API}api/${VITE_PATH}/admin/coupon`
      let methods = 'post'
      if (!this.isNew) {
        api = `${VITE_API}api/${VITE_PATH}/admin/coupon/${item.id}`
        methods = 'put'
      }
      try {
        const res = await this.axios[methods](api, { data: item })
        if (res.data.success) {
          await this.fetchCoupons(this.pagination.current_page)
          this.$refs.couponModal.hideModal()
          this.showSuccessToast(res.data.message)
        } else {
          this.showFailToast(res.data.message.join('、'))
        }
      } catch (error) {
        this.handleError()
      }
    },
    async confirmDeletion(item) {
      this.isLoading = true
      const api = `${VITE_API}api/${VITE_PATH}/admin/coupon/${item.id}`
      try {
        const res = await this.axios.delete(api)
        if (res.data.success) {
          await this.fetchCoupons(this.pagination.current_page)
          this.$refs.deleteModal.hideModal()
          this.showSuccessToast(res.data.message)
        } else {
          this.showFailToast(res.data.message)
        }
      } catch (error) {
        this.handleError()
      }
    },
    openModal(isNew, item) {
      this.isNew = isNew
      const today = new Date().getTime() / 1000
      isNew
        ? (this.tempCoupon = { is_enabled: 1, due_date: today })
        : (this.tempCoupon = { ...item })
      this.$refs.couponModal.showModal()
    },
    openDeleteModal(item) {
      this.tempCoupon = { ...item }
      this.$refs.deleteModal.showModal()
    },
  },
  created() {
    this.fetchCoupons()
  }
}
</script>
