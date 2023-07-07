<template>
  <div class="container my-5">
    <nav aria-label="breadcrumb">
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
        <div class="col-1 d-none d-md-block">
          <ul>
            <li
              class="image-list mb-3 position-relative"
              v-for="img in imageList"
              :key="img"
              @click.prevent="changeImgView(img)"
            >
              <img :src="img" :alt="product.title" />
              <div
                v-show="tempImage === img"
                class="h-100 w-100 position-absolute bg-white top-0 opacity-50"
              ></div>
            </li>
          </ul>
        </div>
        <div class="col-md-5 mb-5">
          <img class="d-block" :src="tempImage" :alt="product.title" />
        </div>
        <div class="col-md-5 mb-5">
          <h2 class="h4 mb-3">{{ product.title }}</h2>
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
          <h4 class="fs-md mb-3">商品介紹 /</h4>
          <p  class="mb-4">
            {{ product.description }}
          </p>
          <h4 class="fs-md mb-3">香味 /</h4>
          <p v-html="wrapText(product.content)" class="mb-4"></p>
          <h4 v-if="product.specifications" class="fs-md mb-3">規格 /</h4>
          <p v-html="wrapText(product.specifications)"></p>
        </div>
      </div>
    </div>

    <hr class="my-5" />
    <RelatedProducts :related-products="relatedProducts"></RelatedProducts>
  </div>
</template>

<script>
const { VITE_API, VITE_PATH } = import.meta.env

import toastMixin from '../../mixins/toastMixin'
import QuantityBtn from '../../components/user/shop/QuantityBtn.vue'

import { mapState, mapActions } from 'pinia'
import cartStore from '../../stores/cartStore'
import statusStore from '../../stores/statusStore'
import RelatedProducts from '../../components/user/shop/RelatedProducts.vue'

export default {
  components: {
    QuantityBtn,
    RelatedProducts
  },
  mixins: [toastMixin],
  data() {
    return {
      product: {},
      quantity: 1,
      imageList: [],
      tempImage: '',
      relatedProducts: [],
      productsAll: []
    }
  },
  computed: {
    ...mapState(cartStore, ['cartList']),
    ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
    id() {
      return this.$route.params.productId
    }
  },
  watch: {
    id(newId, oldId) {
      if (newId !== oldId) {
        this.fetchProduct(newId)
      }
    }
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),

    async fetchProduct(id) {
      const productApi = `${VITE_API}api/${VITE_PATH}/product/${id}`
      const productsAllApi = `${VITE_API}api/${VITE_PATH}/products/all`
      try {
        const [productRes, productsAllRes] = await Promise.all([
          this.axios.get(productApi),
          this.axios.get(productsAllApi)
        ])
        if (productRes.data.success) {
          this.product = productRes.data.product
          this.productsAll = productsAllRes.data.products
          this.getCategoryProducts(this.product.category)
          this.concatImageList()
          this.tempImage = this.product.imageUrl
        }
      } catch (error) {
        this.handleError()
      }
    },
    wrapText(text) {
      if (text) return text.replace(/\n/g, '<br>')
    },
    getCategoryProducts(category) {
      this.relatedProducts = this.productsAll.filter(
        (item) => item.category === category && item.id !== this.id
      )
    },
    getQuantity(num) {
      this.quantity = num
    },
    concatImageList() {
      this.imageList = this.product.imagesUrl
        ? [this.product.imageUrl, ...this.product.imagesUrl]
        : [this.product.imageUrl]
    },
    changeImgView(image) {
      this.tempImage = image
    }
  },
  created() {
    this.fetchProduct(this.id)
  }
}
</script>
