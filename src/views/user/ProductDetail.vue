<template>
  <div class="container my-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/shop">商品一覽</RouterLink></li>
        <li class="breadcrumb-item" aria-current="page">
          <RouterLink to="/shop?query=所有商品" class="text-nowrap">{{ product.category }}</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="overflow-hidden my-5">
      <div class="row justify-content-between">
        <div class="col-1 d-none d-md-block">
          <ul>
            <li class="mb-3">
              <img
                src="https://carrierefreres.com/media/catalog/product/cache/b53a7bebfe4e7b87173d57fde1fb1c7b/c/f/cf-pdp-bougie-lavande01-1600x1600.jpg"
                alt=""
              />
            </li>
            <li class="mb-3">
              <img
                src="https://carrierefreres.com/media/catalog/product/cache/b53a7bebfe4e7b87173d57fde1fb1c7b/c/f/cf-pdp-bougie-lavande02-1600x1600.jpg"
                alt=""
              />
            </li>
            <li class="mb-3">
              <img
                src="https://carrierefreres.com/media/catalog/product/cache/b53a7bebfe4e7b87173d57fde1fb1c7b/c/f/cf-pdp-bougie-lavande03-1600x1600.jpg"
                alt=""
              />
            </li>
          </ul>
        </div>
        <div class="col-md-5 mb-5">
          <img
            class="d-block"
            :src="product.imageUrl"
            :alt="product.title"
          />
        </div>
        <div class="col-md-5 mb-5">
          <h2 class="h4 mb-3">{{ product.title }}</h2>
          <h3 class="fs-6 text-highlight mb-4">薰苔調</h3>
          <p class="h4 mb-5">NT$ {{ $format.currency(product.price) }} <s class="fs-6 text-secondary ms-3">NT$ {{ $format.currency(product.origin_price) }}</s></p>
          <div class="row">
            <div class="col-md-4">
              <QuantityBtn :quantity="quantity" @add="getQuantity" @minus="getQuantity"></QuantityBtn>
            </div>
            <div class="col-md-8">
              <button type="button" class="btn btn-primary w-100 rounded-sm px-3">加入購物車</button>
            </div>
          </div>

          <hr class="my-3" />
          <h4 class="fs-md mb-3">商品介紹 /</h4>
          <p class="mb-4">
            {{ product.description }}
          </p>
          <h4 class="fs-md mb-3">香味 /</h4>
          <p>{{ product.content }}</p>
        </div>
      </div>
    </div>

    <hr class="my-5">
    <h4 class="text-center py-3 mb-5">相關商品</h4>
    <div class="overflow-hidden">
      <div class="row">
        <div class="col-md-3" v-for="item in relatedProducts" :key="item.id">
          <ProductCard :product="item"></ProductCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_API, VITE_PATH } = import.meta.env

import toastMixin from '../../mixins/toastMixin'
import QuantityBtn from '../../components/user/shop/QuantityBtn.vue'
import ProductCard from '../../components/user/shop/ProductCard.vue'


export default {
  props: ['productId'],
  components: {
    QuantityBtn,
    ProductCard
  },
  mixins: [toastMixin],
  data() {
    return {
      product: {},
      quantity: 1,
      relatedProducts: [],
      productsAll: []
    }
  },
  methods: {
    async fetchProduct(id) {
      const productApi = `${VITE_API}api/${VITE_PATH}/product/${id}`
      const productsAllApi = `${VITE_API}api/${VITE_PATH}/products/all`
      try {
        const [productRes, productsAllRes] = await Promise.all([this.axios.get(productApi), this.axios.get(productsAllApi)])
        if (productRes.data.success) {
          this.product = productRes.data.product
          this.productsAll = productsAllRes.data.products
          this.getCategoryProducts(this.product.category);
        }
      } catch (error) {
        this.handleError()
      }
    },
    async getCategoryProducts(category) {
      this.relatedProducts = this.productsAll.filter((item) => item.category === category)
    },
    getQuantity(num) {
      this.quantity = num
    }
  },
  created() {
    this.fetchProduct(this.productId)
  }

}
</script>
