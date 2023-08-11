<template>
  <ul class="d-flex d-md-block column-gap-2">
    <li
      class="image-list mb-3 position-relative"
      v-for="img in imageList"
      :key="img"
      @click.prevent="changeImgView(img)"
    >
      <img :src="img" :alt="product.title" class="small-img d-block h-100 object-fit-cover" />
      <div
        v-show="tempImage === img"
        class="h-100 w-100 max-w-80 position-absolute bg-white top-0 opacity-50"
      ></div>
    </li>
  </ul>
</template>


<script> 
import { mapState, mapActions } from 'pinia' 
import productsStore from '../../../stores/productsStore'

export default {
  computed: {
    ...mapState(productsStore, ['imageList', 'tempImage', 'product'])
  },
  methods: {
    ...mapActions(productsStore, ['changeImgView'])
  }
}
</script>


<style lang="scss">
.small-img {
  width: 80px;
}

.max-w-80 {
  max-width: 80px;
}
</style>