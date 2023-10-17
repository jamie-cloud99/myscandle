<template>
  <div class="container pt-5">
    <div class="py-5">
      <div class="d-sm-flex justify-content-between align-items-center mb-3 mb-md-5">
        <BreadcrumpComponent :nav-list="breadList" class="order-2 mb-4 mb-sm-0" />
        <div class="position-relative w-fit">
          <h1 class="h2 fw-semibold d-inline-block">搜尋結果</h1>
          <div class="decorate-circle"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="d-flex d-md-block mb-3">
            <h2 class="fs-5 mb-sm-3">搜尋關鍵字：</h2>
            <p class="text-primary py-1 px-3 bg-light rounded-md d-inline-block">
              {{ $route.query.kw }}
            </p>
          </div>
        </div>
        <div class="col-md-9 overflow-hidden">
          <div class="page-min-h">
            <ul v-if="filteredProducts.length" class="row gx-4 gx-lg-5 gy-4">
              <li v-for="product in filteredProducts" :key="product.id" class="col-sm-6 col-lg-4">
                <ProductCard :product="product" />
              </li>
            </ul>
            <div v-else class="py-5">
              <p class="fs-2 text-center">沒有符合條件的商品</p>
            </div>
          </div>
          <div class="d-flex justify-content-center pt-5">
            <PageComponent :pages="pagination" :items="filteredProducts" @change-page="paginate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productsStore from '@/stores/productsStore'
import PageComponent from '@/components/user/shop/PageComponent.vue'
import ProductCard from '@/components/user/shop/ProductCard.vue'
import BreadcrumpComponent from '@/components/user/layout/BreadcrumpComponent.vue'

export default {
  components: {
    ProductCard,
    PageComponent,
    BreadcrumpComponent
  },
  data() {
    return {
      breadList: [
        {
          path: '/',
          title: '首頁'
        },
        {
          path: '/shop',
          title: '商品一覽'
        },
        {
          path: '/search',
          title: '搜尋結果'
        }
      ]
    }
  },
  computed: {
    ...mapState(productsStore, ['product', 'pagination', 'filteredProducts', 'curKeyword'])
  },
  methods: {
    ...mapActions(productsStore, ['paginate', 'searchProducts'])
  },
  created() {
    this.searchProducts(this.$route.query.kw)
  }
}
</script>

<style lang="scss" scoped>
.page-min-h {
  min-height: 500px;
}
</style>
