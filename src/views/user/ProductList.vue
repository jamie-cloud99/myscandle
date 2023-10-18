<template>
  <img
    class="shop-bn-img object-fit-cover"
    src="https://i.imgur.com/6pbKl60.png"
    alt="Mys商品一覽"
    referrerpolicy="no-referrer"
  />
  <div class="container pt-3 overflow-hidden">
    <div class="d-sm-flex justify-content-between align-items-center mb-3">
      <BreadcrumpComponent :nav-list="breadList" class="order-2 mb-4 mb-sm-0" />
      <div class="position-relative w-fit">
        <h1 class="h2 fw-semibold d-inline-block">商品一覽</h1>
        <div class="decorate-circle"></div>
      </div>
    </div>
    <div class="overflow-hidden py-2">
      <div class="row gx-4 gx-lg-5">
        <div class="col-md-3">
          <FilterComponent class="pt-5" />
        </div>
        <div class="col-md-9">
          <div class="d-md-flex">
            <div class="w-sm-50 pb-4">
              <SwiperContainer
                :slides-per-view="3"
                :space-between="8"
                :breakpoints="{
                  420: {
                    slidesPerView: 4
                  },
                  576: {
                    slidesPerView: 5,
                    spaceBetween: 16
                  }
                }"
                class="overflow-auto scrollbar-hidden"
              >
                <SwiperSlide
                  class="text-nowrap"
                  v-for="item in categoryList"
                  :key="item"
                  aria-current="true"
                >
                  <button
                    type="button"
                    class="category-btn btn btn-light"
                    :class="{ active: item === categorySelected }"
                    @click="changeCategory(item)"
                  >
                    {{ item }}
                  </button>
                </SwiperSlide>
              </SwiperContainer>
            </div>
          </div>
          <div v-if="products.length" class="overflow-hidden">
            <ul class="row gy-4">
              <li class="col-sm-6 col-lg-4" v-for="product in products" :key="product.id">
                <ProductCard :product="product" />
              </li>
              <div class="d-flex justify-content-center py-2">
                <PageComponent
                  :pages="pagination"
                  :items="filteredProducts"
                  @change-page="paginate"
                />
              </div>
            </ul>
          </div>
          <div v-else class="mt-5 pt-5">
            <p class="fs-2 text-center">沒有符合條件的商品</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import productsStore from '@/stores/productsStore'
import BreadcrumpComponent from '@/components/user/layout/BreadcrumpComponent.vue'
import FilterComponent from '@/components/user/shop/FilterComponent.vue'
import ProductCard from '@/components/user/shop/ProductCard.vue'
import PageComponent from '@/components/user/shop/PageComponent.vue'

export default {
  components: {
    ProductCard,
    PageComponent,
    FilterComponent,
    BreadcrumpComponent
  },
  data() {
    return {
      breadList: [
        {
          title: '',
          path: ''
        }
      ]
    }
  },
  methods: {
    ...mapActions(productsStore, ['fetchAllProducts', 'paginate', 'selectCategory']),
    changeCategory(item) {
      this.$router.push({ path: '/shop', query: { category: item } })
      this.selectCategory(item)
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading']),
    ...mapState(productsStore, [
      'categoryProducts',
      'categoryList',
      'categorySelected',
      'products',
      'pagination',
      'filteredProducts'
    ])
  },
  watch: {
    categorySelected: {
      handler() {
        const newList = [
          {
            path: '/',
            title: '首頁'
          },
          {
            path: '/shop',
            title: '商品一覽'
          },
          {
            path: '/shop',
            title: this.categorySelected
          }
        ]
        this.breadList = [...newList]
      },
      immediate: true
    }
  },
  created() {
    this.fetchAllProducts()
  }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.shop-bn-img {
  height: 100px;
  width: 100vw;
  object-position: bottom;
}

.swiper-slide {
  width: fit-content !important;
}

.category-btn {
  border: 0;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  color: inherit;
  font-weight: 500;
  letter-spacing: 0.1rem;
  &:hover {
    color: $light;
    font-weight: 700;
  }
  &.active {
    background: $primary !important;
    color: $light !important;
  }
}
</style>
