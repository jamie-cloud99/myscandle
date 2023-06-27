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
      <tbody class="">
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
                class="btn btn-outline-primary btn-sm mb-2 mb-md-0 me-md-2"
                @click="openModal()"
              >
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal()">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mt-4 mb-5">
    <PaginationComponent :pages="pagination" @change-page="fetchOrders"></PaginationComponent>
  </div>
</template>

<script>
const { VITE_API, VITE_PATH } = import.meta.env

import PaginationComponent from '../../components/admin/PaginationComponent.vue'

export default {
  components: {
    PaginationComponent
  },
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      messages: [],
      isLoading: true
    }
  },
  methods: {
    async fetchOrders(page = 1) {
      const api = `${VITE_API}api/${VITE_PATH}/admin/orders?page=${page}`
      try {
        const res = await this.axios.get(api)
        if (res.data.success) {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.messages = res.data.messages
          this.isLoading = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    openModal() {},
    openDeleteModal() {}
  },
  created() {
    this.fetchOrders()
  }
}
</script>
