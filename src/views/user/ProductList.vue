<template>
  <img class="shop-bn-img object-fit-cover" src="src/assets/images/shop/shop-bn.webp" alt="" />
  <div class="container pt-5">
    <!-- <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/shop">商品一覽</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">所有商品</li>
      </ol>
    </nav> -->
    <div class="overflow-hidden py-2">
      <div class="row gx-5">
        <div class="col-md-3">
          <ul class="list-group mb-5">
            <li
              class="list-group-item"
              v-for="item in categoryList"
              :key="item"
              :class="{ active: item === categorySelected }"
              aria-current="true"
            >
              <a href="#" @click.prevent="selectCategory(item)">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="col-md-9">
          <div class="overflow-hidden">
            <div class="row gy-4">
              <div class="col-md-6 col-lg-4" v-for="product in products" :key="product.id">
                <ProductCard :product="product"></ProductCard>
              </div>
              <div class="d-flex justify-content-center py-2">
                <PageComponent :pages="pagination" :items="categoryProducts" @change-page="paginate"></PageComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.shop-bn-img {
  min-height: 250px;
  max-height: 300px;
  width: 100vw;
  object-position: 80% bottom;
}
</style>

<script>
const { VITE_API, VITE_PATH } = import.meta.env
import ProductCard from '../../components/user/shop/ProductCard.vue'
import PageComponent from '../../components/user/shop/PageComponent.vue'
import toastMixin from '../../mixins/toastMixin'

export default {
  components: {
    ProductCard,
    PageComponent
  },
  mixins: [toastMixin],
  data() {
    return {
      products: [],
      productsAll: [],
      tempProduct: {},
      pagination: {
        current_page: 1,
        total_pages: 1,
        has_next: true,
        has_pre: false
      },
      isLoading: true,
      categorySelected: '所有商品',
      categoryList: ['所有商品', '香薰蠟燭', '擴香瓶', '香氛噴霧', '精緻禮盒']
    }
  },
  methods: {
    async fetchAllProducts() {
      const api = `${VITE_API}api/${VITE_PATH}/products/all`
      try {
        const res = await this.axios.get(api)
        if (res.data.success) {
          this.productsAll = res.data.products
          this.selectCategory(this.categorySelected)
        }
      } catch (error) {
        this.handleError()
      }
    },
    selectCategory(category = '所有商品') {
      this.$router.push({ path: '/shop', query: { category } })
      this.categorySelected = category
      this.paginate(this.categoryProducts)
    },
    paginate(items, curPage = 1, perPage = 12) {
      const totalPages = Math.ceil(items.length / perPage)
      if (curPage > totalPages) {
        curPage = totalPages
      }

      const minIndex = (curPage - 1) * perPage
      const maxIndex = curPage * perPage
      const itemPaginated = items.slice(minIndex, maxIndex)

      const page = {
        current_page: curPage,
        total_pages: totalPages,
        has_pre: curPage > 1,
        has_next: curPage < totalPages
      }

      this.pagination = { ...page }
      this.products = [...itemPaginated]
      this.isLoading = false
    }
  },
  computed: {
    categoryProducts() {
      const productList =
        this.categorySelected === '所有商品'
          ? [...this.productsAll]
          : this.productsAll.filter((item) => item.category === this.categorySelected)

      return productList
    }
  },

  created() {
    this.fetchAllProducts()
  }
}
</script>
