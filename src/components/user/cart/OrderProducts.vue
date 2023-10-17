<template>
  <ul class="list-group rounded-md overflow-hidden">
    <li class="list-group-item border-primary p-3" v-for="cart in cartList" :key="cart.id">
      <div class="d-flex">
        <img class="d-block cart-img" :src="cart.product.imageUrl" :alt="cart.product.title" />
        <div class="d-flex flex-column justify-content-between flex-grow-1">
          <div class="d-flex justify-content-between align-items-start">
            <h4 class="flex-grow-1 fs-6 ps-2 mb-0">{{ cart.product.title }}</h4>
            <p class="flex-grow-1 text-primary-emphasis fs-sm text-end ps-2">x {{ cart.qty }}</p>
          </div>
          <p class="fs-sm ps-2 mt-2 flex-grow-1">NT$ {{ $format.currency(cart.product.price) }}</p>
            <div class="d-flex justify-content-end align-items-center mt-2 ps-2">
              <s v-if="cart.total !== cart.final_total" >NT$ {{ $format.currency(cart.total) }}</s>
              <p class="text-primary fw-bold flex-grow-1" :class="{'ps-2': cart.total !== cart.final_total}">NT$ {{ $format.currency(cart.final_total) }}</p>
            </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import cartStore from '@/stores/cartStore'

export default {
  emits: ['open-del-modal'],
  components: {},
  data() {
    return {
      tempCart: {}
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading']),
    ...mapState(cartStore, ['cartList', 'cartsTotal'])
  },
  methods: {
    ...mapActions(cartStore, ['fetchCart'])
  },
  created() {
    this.fetchCart()
  }
}
</script>


