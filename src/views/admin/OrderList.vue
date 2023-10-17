<template>
  <div class="d-flex justify-content-center table-responsive">
    <table class="table mt-4">
      <thead>
        <tr class="align-middle">
          <th width="120">訂購日期</th>
          <th width="150">訂單編號</th>
          <th width="100">訂購人</th>
          <th class="text-end px-md-4" width="120">金額</th>
          <th width="100">付款狀態</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="border-bottom">
          <td>{{ $format.date(order.create_at) }}</td>
          <td>{{ order.id }}</td>
          <td>{{ order.user.name }}</td>
          <td class="text-end px-md-4">{{ $format.currency(order.total) }}</td>
          <td>
            <span class="text-success" v-if="order.is_paid">已付款</span>
            <span class="text-muted" v-else>未付款</span>
          </td>
          <td>
            <div class="d-md-flex">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm mb-2 mb-md-0 me-md-2"
                @click="openModal(order)"
              >
                查看
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDeleteModal(order)"
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
    <PaginationComponent :pages="pagination" @change-page="fetchOrders" />
  </div>

  <OrderModal ref="orderModal" :order="tempOrder" @view="closeModal" />
  <DelModal ref="deleteModal" :item="tempOrder" @confirm-deletion="confirmDeletion" />
  <LoadingComponent v-show="isLoading" />
</template>

<script>
const { VITE_API, VITE_PATH } = import.meta.env

import PaginationComponent from '@/components/admin/PaginationComponent.vue'
import OrderModal from '@/components/admin/modal/OrderModal.vue'
import DelModal from '@/components/admin/modal/DelOrderModal.vue'
import toastMixin from '@/mixins/toastMixin'

export default {
  components: {
    PaginationComponent,
    OrderModal,
    DelModal
  },
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isLoading: true
    }
  },
  mixins: [toastMixin],
  methods: {
    async fetchOrders(page = 1) {
      const api = `${VITE_API}api/${VITE_PATH}/admin/orders?page=${page}`
      try {
        const res = await this.axios.get(api)
        console.log('fetchOrder', res)
        if (res.data.success) {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        }
      } catch (error) {
        this.handleError()
      }
    },
    async confirmDeletion(id) {
      const api = `${VITE_API}api/${VITE_PATH}/admin/order/${id}`
      try {
        const res = await this.axios.delete(api)
        if (res.data.success) {
          this.fetchOrders(this.pagination.current_page)
          this.$refs.deleteModal.hideModal()
          this.showSuccessToast(res.data.message)
        } else {
          this.showFailToast(res.data.message)
        }
      } catch (error) {
        this.handleError()
      }
    },
    async clearOrders() {
      const api = `${VITE_API}api/${VITE_PATH}/admin/orders/all`
      try {
        const res = await this.axios.delete(api)
        if (res.data.success) {
          this.showSuccessToast(res.data.message)
        } else {
          this.showFailToast(res.data.message)
        }
      } catch (error) {
        this.handleError()
      }
    },

    closeModal() {
      this.$refs.orderModal.hideModal()
    },

    openModal(order) {
      this.tempOrder = JSON.parse(JSON.stringify(order))
      this.$nextTick(() => {
        this.$refs.orderModal.showModal()
      })
    },
    openDeleteModal(order) {
      this.tempOrder = JSON.parse(JSON.stringify(order))
      this.$refs.deleteModal.showModal()
    }
  },
  created() {
    this.fetchOrders()
  }
}
</script>
