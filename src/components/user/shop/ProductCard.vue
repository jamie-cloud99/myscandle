<template>
  <RouterLink
    :to="`/product/${product.id}`"
    class="card border-0 bg-transparent h-100 overflow-hidden"
  >
    <div class="ratio ratio-1x1 overflow-hidden rounded-md">
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="product-img"
        loading="lazy"
        width="1000"
        height="1000"
      />
    </div>
    <div class="card-body pt-3 pb-0">
      <h3 class="fs-6 mb-1">{{ product.title }}</h3>
      <div class="d-flex align-items-center justify-content-between flex-wrap mb-2 align-baseline">
        <p>NT$ {{ $format.currency(product.price) }}</p>
        <s v-if="product.price !== product.origin_price" class="text-secondary fs-sm"
          >NT$ {{ $format.currency(product.origin_price) }}</s
        >
      </div>
    </div>
    <div class="card-footer bg-transparent border-0">
      <button
        type="button"
        class="btn btn-outline-primary w-100 rounded-sm px-3"
        @click.prevent="addToCart(product.id)"
        :disabled="cartLoadingItem === product.id"
      >
        加入購物車
        <span
          v-if="cartLoadingItem === product.id"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span v-if="cartLoadingItem === product.id" class="visually-hidden">Loading...</span>
      </button>
    </div>
  </RouterLink>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'

export default {
  props: ['product'],
  computed: {
    ...mapState(cartStore, ['cartList']),
    ...mapState(statusStore, ['isLoading', 'cartLoadingItem'])
  },
  methods: {
    ...mapActions(cartStore, ['addToCart'])
  }
}
</script>

<style lang="scss">
.product-img {
  object-fit: cover;
  transition: all 300ms ease-in-out;
  &:hover {
    scale: 110%;
  }
}
</style>
