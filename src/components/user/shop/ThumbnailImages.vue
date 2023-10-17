<template>
  <ul class="d-flex d-md-block column-gap-2">
    <li
      class="image-item mb-3 position-relative cursor-pointer"
      v-for="img in imageList"
      :key="img"
      @click="changeImgView(img)"
    >
      <div class="overflow-hidden small-img">
        <img :src="img" :alt="product.title" class="d-block w-100 h-100 object-fit-cover" />
      </div>
      <div
        v-show="tempImage === img"
        class="h-100 small-img position-absolute bg-white top-0 opacity-50"
      ></div>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productsStore from '@/stores/productsStore'

export default {
  computed: {
    ...mapState(productsStore, ['imageList', 'tempImage', 'product'])
  },
  methods: {
    ...mapActions(productsStore, ['changeImgView'])
  }
}
</script>

<style lang="scss" scoped>
.small-img {
  width: 80px;
}

.max-w-80 {
  max-width: 80px;
}

.cursor-pointer {
  cursor: pointer;
}

.image-item img {
  transition: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  &:hover {
    scale: 1.1;
  }
}
</style>
