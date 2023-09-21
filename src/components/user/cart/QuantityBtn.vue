<template>
  <div class="d-flex justify-content-center align-items-center">
    <button
      class="btn quantity-btn btn-outline-primary rounded-circle flex-shrink-0"
      type="button"
      @click.prevent="updateNum('minus')"
      :disabled="tempQuantity <= 1 || cart.id===cartLoadingItem"
    >
      <i class="bi bi-dash"></i></button
    ><input
      class="form-control quantity text-center border border-primary bg-transparent rounded-md mx-2"
      type="number"
      min="1"
      v-model.number="tempQuantity"
      disabled
    />
    <div v-if="cart.id===cartLoadingItem" class="spinner-border text-primary spinner-border-sm" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <button v-else
      class="btn quantity-btn btn-outline-primary rounded-circle flex-shrink-0"
      type="button"
      @click.prevent="updateNum('add')"
      :disabled="tempQuantity >= 10 || cart.id===cartLoadingItem"
    >
      <i class="bi bi-plus"></i>
    </button>
    
  </div>
</template>

<script>
import {mapState, mapActions} from 'pinia'
import statusStore from '../../../stores/statusStore'
import cartStore from '../../../stores/cartStore'

export default {
  props: {
    cart: {
      type: Object
    },
  },
  data() {
    return {
      tempQuantity: 1
    }
  },
 
  computed: {
    ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
    ...mapState(cartStore, ['cartList'])
  },
  methods: {
    ...mapActions(cartStore, ['updateCart']),
    updateNum(action) {
      action === 'add' ? ++this.tempQuantity : --this.tempQuantity
      this.updateCart(this.cart, this.tempQuantity)
      
    },
    
  },
  created() {
    this.tempQuantity = this.cart.qty
  }
}
</script>

<style lang="scss" scoped>
.quantity-btn {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
}

.quantity {
  height: 2rem;
  width: 4rem;
}

.bi::before {
  line-height: 1.5;
  vertical-align: 0.1em;
}
</style>
