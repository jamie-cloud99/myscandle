<template>
  <div class="d-flex justify-content-center align-items-center">
    <button class="btn quantity-btn btn-outline-primary rounded-circle flex-shrink-0" type="button"
    @click.prevent="minusNum" :disabled="tempQuantity<=1">
      <i class="bi bi-dash"></i></button
    ><input
      class="form-control quantity text-center border border-primary bg-transparent mx-2"
      type="number"
      min="1"
      v-model.number="tempQuantity"
    />
    <button class="btn quantity-btn btn-outline-primary rounded-circle flex-shrink-0" type="button"
      @click.prevent="addNum" :disabled="tempQuantity>=10">
      <i class="bi bi-plus"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    quantity: {
      type: Number,
      default: 1
    }
  },
  emits: ['add', 'minus'],
  data() {
    return {
      tempQuantity: 1
    }
  },
  methods: {
    addNum() {
      this.tempQuantity++
      this.$emit('add', this.tempQuantity)
    },
    minusNum () {
      this.tempQuantity--
      this.$emit('minus', this.tempQuantity)
    }
  }
}

</script>


<style lang="scss">
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
