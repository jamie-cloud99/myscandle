<template>
  <div class="text-end my-4">
    <button class="btn btn-primary" @click="openModal(true)">新增產品資料</button>
  </div>
  <div class="d-flex justify-content-center table-responsive">
    <table class="table mt-4">
      <thead>
        <tr class="align-middle">
          <th width="120">類別</th>
          <th width="300">產品名稱</th>
          <th class="text-end px-md-4" width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="product in products" :key="product.id" class="border-bottom">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end px-md-4">{{ $format.currency(product.price) }}</td>
          <td>
            <span class="text-success" v-if="product.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="d-md-flex">
              <button
                class="btn btn-outline-primary btn-sm mb-2 mb-md-0 me-md-2"
                @click="openModal(false, product)"
              >
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(product)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class=" mt-4 mb-5">
    <PaginationComponent 
        :pages="pagination" @change-page="fetchPageProducts"></PaginationComponent>
  </div>

  <ProductModal ref="productModal" :product="tempProduct" :is-new="isNew"
    @update-product="updateProduct"
  ></ProductModal>
  <DelModal ref="deleteModal" :item="tempProduct" @confirm-deletion="confirmDeletion"></DelModal>
</template>

<script>
const { VITE_API, VITE_PATH } = import.meta.env
import ProductModal from '../../components/admin/modal/ProductModal.vue'
import DelModal from '../../components/admin/modal/DelModal.vue'
import PaginationComponent from '../../components/admin/PaginationComponent.vue'

export default {
  components: {
    ProductModal,
    DelModal,
    PaginationComponent
  },
  data() {
    return {
      tempProduct: {},
      products: [],
      pagination: {},
      isNew: true
    }
  },
  methods: {
    async fetchPageProducts(page = 1) {
      const api = `${VITE_API}api/${VITE_PATH}/admin/products?page=${page}`
      const res = await this.axios.get(api)
      if (res.data.success) {
        this.products = res.data.products
        this.pagination = res.data.pagination
      }
    },
    async updateProduct(item) {
      let api = `${VITE_API}api/${VITE_PATH}/admin/product`
      let methods = 'post'
      if (!this.isNew) {
        api = `${VITE_API}api/${VITE_PATH}/admin/product/${item.id}`
        methods = 'put'
      }
      try {
        await this.axios[methods](api, { data: item })
        const { current_page } = this.pagination
        this.fetchPageProducts(current_page)
        this.$refs.productModal.hideModal()
      } catch (error) {
        console.log(error)
      }
    },
    async confirmDeletion(item) {
      const api = `${VITE_API}api/${VITE_PATH}/admin/product/${item.id}`
      try {
        const res = await this.axios.delete(api)
        if(res.data.success) { console.log('刪除商品成功') } 
        const { current_page } = this.pagination
        this.fetchPageProducts(current_page)
        this.$refs.deleteModal.hideModal()
      } catch (error) {
        console.log(error)
      }
    },
    openModal(isNew, item) {
      this.isNew = isNew
      if (isNew) {
        this.tempProduct = {
          unit: '個',
          is_enabled: 1,
          imageUrls: []
        }
      } else {
        this.tempProduct = {...item}
      }
      this.$refs.productModal.showModal()
    },
    openDeleteModal(item) {
      this.tempProduct = item
      this.$refs.deleteModal.showModal()
    },
  },
  created() {
    this.fetchPageProducts()
  }
}
</script>


