<template>
  <h4 class="text-center py-3 mb-5">相關商品</h4>
  <div class="px-5">
    <SwiperContainer
      :autoplay="swiperAutoplay"
      :modules="modules"
      :slides-per-view="1"
      :breakpoints="swiperBreakpoints"
      :space-between="32"
    >
      <SwiperSlide class="h-auto" v-for="item in relatedProducts" :key="item.id">
        <ProductCard :product="item" />
      </SwiperSlide>
    </SwiperContainer>
  </div>
</template>

<script>
import { Autoplay } from 'swiper/modules'

import ProductCard from './ProductCard.vue'

export default {
  props: ['relatedProducts'],
  components: {
    ProductCard
  },
  data() {
    return {
      modules: [Autoplay],
      swiperBreakpoints: {
        576: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 3
        }
      },
      swiperAutoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }
    }
  }
}
</script>
