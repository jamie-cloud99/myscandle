<template>
  <img class="shop-bn-img object-fit-cover" src="/images/shop/shop-bg-img.webp" alt="" />
  <div class="container pt-lg-5">
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
              <a href="#" @click.prevent="changeCategory(item)">{{ item }}</a>
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
 height: 100px;
  width: 100vw;
  object-position: bottom;
}
</style>

<script>
import ProductCard from '../../components/user/shop/ProductCard.vue'
import PageComponent from '../../components/user/shop/PageComponent.vue'
import statusStore from '../../stores/statusStore'
import productsStore from '../../stores/productsStore'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    ProductCard,
    PageComponent
  },

  methods: {
    ...mapActions(productsStore,['fetchAllProducts', 'paginate', 'selectCategory']),
    changeCategory(item) {
      this.$router.push({ path: '/shop', query: { category: item } })
      this.selectCategory(item)
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading']),
    ...mapState(productsStore, ['categoryProducts', 'categoryList', 'categorySelected', 'products', 'pagination'])
  },

  created() {
    this.fetchAllProducts()
  }
}
</script>
