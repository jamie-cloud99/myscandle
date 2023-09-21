import { defineStore } from 'pinia'

export default defineStore('slideStore', {
  state: () => ({
    swiperBreakpoints: {
      576: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      }
    },
    swiper: null,
    curSlideShowed: 1,
    slides: {
      totalSlides: 1,
      curSlide: 1,
      havePrev: false,
      haveNext: true,
      slideShowed: {
        default: 1,
        sm: 2,
        lg: 3
      }
    }
  }),
  actions: {
    goNext() {
      this.slides.curSlide++
      this.swiper.slideNext()
    },
    goPrev() {
      this.slides.curSlide--
      this.swiper.slidePrev()
    },
    onSwiper(swiper) {
      this.swiper = swiper
    },
    updateCurSlideShowed() {
      if (window.innerWidth < 576) {
        this.curSlideShowed = this.slides.slideShowed.default
      } else if (window.innerWidth < 992) {
        this.curSlideShowed = this.slides.slideShowed.sm
      } else {
        this.curSlideShowed = this.slides.slideShowed.lg
      }
    },
    enableGoSlide() {
      this.slides.havePrev = this.slides.curSlide > 1 ? true : false
      this.slides.haveNext =
        this.slides.curSlide < this.slides.totalSlides - (this.curSlideShowed - 1) ? true : false
    }
  }
})
