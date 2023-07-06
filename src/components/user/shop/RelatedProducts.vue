<template>
  <h4 class="text-center py-3 mb-5">相關商品</h4>
  <div class="px-5">
    <Swiper
      :autoplay="swiperAutoplay"
      :modules="modules"
      :slides-per-view="1"
      :breakpoints="swiperBreakpoints"
      :space-between="32"
      class="mySwiper"
    >
      <SwiperSlide class="" v-for="item in relatedProducts" :key="item.id">
        <ProductCard :product="item"></ProductCard>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

import ProductCard from './ProductCard.vue'

export default {
  props: ['relatedProducts'],
  components: {
    ProductCard,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Autoplay],
      swiperBreakpoints: {
        576: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
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

<style lang="scss">

</style>