<template>
  <div class="container py-5">
    <BreadcrumpComponent :nav-list="breadList" class="pt-lg-5"></BreadcrumpComponent>
    <div class="overflow-hidden my-3 my-sm-5">
      <div class="row justify-content-between">
        <div class="col-md-2 col-xl-1 order-2 order-md-0">
          <ThumbnailImages></ThumbnailImages>
        </div>
        <div class="col-md-5 text-center mb-3 mb-md-5 order-1">
          <img class="object-fit-cover" :src="tempImage" :alt="product.title" />
        </div>
        <div class="col-md-5 mb-5 order-3">
          <h1 class="h4 mb-3">{{ product.title }}</h1>
          <h3 class="fs-6 text-highlight mb-4">{{ product.notes }}</h3>
          <p class="h4 mb-5">
            NT$ {{ $format.currency(product.price) }}
            <s class="fs-6 text-secondary ms-3">NT$ {{ $format.currency(product.origin_price) }}</s>
          </p>
          <div class="row gy-3 gy-sm-0 gy-md-3 gy-lg-0 mb-2">
            <div class="col-sm-7 col-md-12 col-lg-6 col-xl-4 mt-1 mb-md-0">
              <QuantityBtn :quantity="quantity" @update="getQuantity"></QuantityBtn>
            </div>
            <div class="col-sm-5 col-md-12 col-lg-6 col-xl-8">
              <div class="d-flex justify-content-center justify-content-sm-start">
                <button
                  type="button"
                  class="cart-btn btn btn-primary w-100 rounded-sm px-3"
                  @click.prevent="addToCart(product.id, quantity)"
                  :disabled="cartLoadingItem === product.id"
                >
                  加入購物車
                  <span
                    v-if="cartLoadingItem === product.id"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span v-if="cartLoadingItem === product.id" class="visually-hidden"
                    >Loading...</span
                  >
                </button>
              </div>
            </div>
          </div>

          <hr class="my-3" />
          <h2 class="fs-md mb-3">商品介紹 /</h2>
          <p class="mb-4">
            {{ product.description }}
          </p>
          <h2 class="fs-md mb-3">香味 /</h2>
          <p v-html="wrapText(product.content)" class="mb-4"></p>
          <h2 v-if="product.specifications" class="fs-md mb-3">規格 /</h2>
          <p v-html="wrapText(product.specifications)"></p>
        </div>
      </div>
    </div>

    <hr class="my-5" />
    <RelatedProducts :related-products="relatedProducts"></RelatedProducts>
  </div>
</template>

<script>
import QuantityBtn from '../../components/user/shop/QuantityBtn.vue'
import RelatedProducts from '../../components/user/shop/RelatedProducts.vue'
import ThumbnailImages from '../../components/user/shop/ThumbnailImages.vue'
import BreadcrumpComponent from '../../components/user/layout/BreadcrumpComponent.vue'

import { mapState, mapActions } from 'pinia'
import cartStore from '../../stores/cartStore'
import statusStore from '../../stores/statusStore'
import productsStore from '../../stores/productsStore'

export default {
  components: {
    QuantityBtn,
    RelatedProducts,
    ThumbnailImages,
    BreadcrumpComponent
  },
  data() {
    return {
      quantity: 1,
      breadList: [
        {
          path: '/',
          title: '首頁'
        }
      ]
    }
  },
  computed: {
    id() {
      return this.$route.params.productId
    },
    ...mapState(cartStore, ['cartList']),
    ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
    ...mapState(productsStore, ['product', 'tempImage', 'relatedProducts', 'categorySelected'])
  },
  watch: {
    id(newId, oldId) {
      if (newId !== oldId) {
        this.fetchProduct(newId), this.recordHistoryView(this.product)
      }
    },
    product: {
      handler() {
        const newList = [
          {
            path: `/shop/?category=${this.categorySelected}`,
            title: this.categorySelected
          },
          {
            path: `/products/${this.id}`,
            title: this.product.title
          }
        ]
        this.breadList = [...this.breadList, ...newList]
      },
      deep: true
    }
  },
  methods: {
    wrapText(text) {
      if (text) return text.replace(/\n/g, '<br>')
    },
    getQuantity(num) {
      this.quantity = num
    },
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(productsStore, ['fetchProduct', 'recordHistoryView'])
  },
  created() {
    this.fetchProduct(this.id)
  },
  mounted() {
    this.recordHistoryView(this.product)
  }
}
</script>

<style lang="scss" scoped>
.cart-btn {
  max-width: 420px;
}
</style>
