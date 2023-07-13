<template>
  <div class="container py-5">
    <nav aria-label="breadcrumb" class="mt-5">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/shop">商品一覽</RouterLink></li>
        <li class="breadcrumb-item" aria-current="page">
          <RouterLink to="/shop?query=所有商品" class="text-nowrap">{{
            product.category
          }}</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="overflow-hidden my-5">
      <div class="row justify-content-between">
        <div class="col-md-1 order-2 order-md-0">
          <ThumbnailImages></ThumbnailImages>
        </div>
        <div class="col-md-5 text-center mb-5 order-1">
          <img class="" :src="tempImage" :alt="product.title" />
        </div>
        <div class="col-md-5 mb-5 order-3">
          <h1 class="h4 mb-3">{{ product.title }}</h1>
          <h3 class="fs-6 text-highlight mb-4">{{ product.notes }}</h3>
          <p class="h4 mb-5">
            NT$ {{ $format.currency(product.price) }}
            <s class="fs-6 text-secondary ms-3">NT$ {{ $format.currency(product.origin_price) }}</s>
          </p>
          <div class="row">
            <div class="col-lg-4 mb-3 mt-1">
              <QuantityBtn :quantity="quantity" @update="getQuantity"></QuantityBtn>
            </div>
            <div class="col-lg-8 mb-3">
              <button
                type="button"
                class="btn btn-primary w-100 rounded-sm px-3"
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

          <hr class="my-3" />
          <h2 class="fs-md mb-3">商品介紹 /</h2>
          <p  class="mb-4">
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

import { mapState, mapActions } from 'pinia'
import cartStore from '../../stores/cartStore'
import statusStore from '../../stores/statusStore'
import productsStore from '../../stores/productsStore'

export default {
  components: {
    QuantityBtn,
    RelatedProducts,
    ThumbnailImages
  },
  data() {
    return {
      quantity: 1,
    }
  },
  computed: {
    id() {
      return this.$route.params.productId
    },
    ...mapState(cartStore, ['cartList']),
    ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
    ...mapState(productsStore, ['product', 'tempImage', 'relatedProducts'])
  },
  watch: {
    id(newId, oldId) {
      if (newId !== oldId) {
        this.fetchProduct(newId)
      }
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
    ...mapActions(productsStore, ['fetchProduct'])
  },
  created() {
    this.fetchProduct(this.id)
  }
}
</script>
