<template>
  <div class="d-none d-md-block">
    <h2 class="fw-semibold h6 fs-lg-5 opacity-75"><i class="bi bi-funnel me-2"></i>篩選</h2>
    <hr class="border-2 border-primary opacity-100 mt-2 mb-0" />
    <ul class="px-2">
      <li
        v-for="(range, index) in priceRanges"
        :key="range[0]"
        class="form-check py-2 py-lg-3 border-bottom border-primary"
      >
        <input
          type="checkbox"
          name="filter"
          :id="`filter${index}`"
          class="form-check-input"
          :value="range"
          @change="togglePriceRange"
          :disabled="index === 1 && selectedPriceRanges.length === 3"
        />
        <label :for="`filter${index}`" class="form-check-label fw-medium">{{
          formatPriceRange(range, index)
        }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import productsStore from '@/stores/productsStore'

export default {
  data() {
    return {
      priceRanges: [
        [1000, 1500],
        [1500, 2500],
        [2500, 99999]
      ],
      selectedPriceRanges: []
    }
  },

  methods: {
    ...mapActions(productsStore, ['filterProducts']),
    formatPriceRange(range, index) {
      if (index !== this.priceRanges.length - 1) {
        return `NT$${range[0]} - NT$${range[1]}`
      } else {
        return `NT$${range[0]} 以上`
      }
    },
    togglePriceRange(e) {
      const priceRange = JSON.stringify(e.target.value.split(','))
      const index = this.selectedPriceRanges.indexOf(priceRange)

      index !== -1
        ? this.selectedPriceRanges.splice(index, 1)
        : this.selectedPriceRanges.push(priceRange)

      this.filterProducts(this.selectedPriceRanges)
    }
  }
}
</script>
