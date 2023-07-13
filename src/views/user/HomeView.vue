<template>
  <div class="banner position-relative">
    <img :src="banner.imgUrl" :alt="banner.title" class="d-block banner-img" />
    <div class="banner-slogan position-absolute rounded-md" ref="slogan">
      <h2 class="slogan-text text-light px-5 py-4 lh-normal">宛若仙境的清新空氣</h2>
      <button
        type="button"
        @click.prevent="$router.push('/shop')"
        class="slogan-btn btn btn-primary rounded-md px-4 ms-5 mb-3"
      >
        探索香氛
      </button>
    </div>
  </div>
  <!-- 查看更多 動畫 -->
  <div class="container">
    <div class="pt-5 mt-5">
      <AboutUs></AboutUs>
    </div>
    <div class="pt-5">
      <HotProducts></HotProducts>
    </div>
    <div class="pt-5 mt-5">
      <OurFeatures></OurFeatures>
    </div>

    <div class="mt-5">
      <!-- 需替換 -->
      <!-- <img src="src/assets/images/quiz/quiz2.png" alt=""> -->
    </div>
  </div>
</template>

<script>
import HotProducts from '../../components/user/home/HotProducts.vue'
import AboutUs from '../../components/user/home/AboutUs.vue'
import OurFeatures from '../../components/user/home/OurFeatures.vue'

export default {
  components: {
    HotProducts,
    AboutUs,
    OurFeatures
  },
  data() {
    return {
      banner: {
        imgUrl: '/src/assets/images/banner/main.jpg',
        title: '呼吸，每一口都香甜純粹-mys'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fadeInBannerSlogan()
    })
  },
  methods: {
    fadeInBannerSlogan() {
      const bannerSlogan = this.$refs.slogan
      bannerSlogan.classList.add('fade-in')
    }
  }
}
</script>

<style lang="scss">
.banner-slogan {
  top: 50%;
  backdrop-filter: blur(1.5px);
  line-height: 1.5;

  opacity: 0;
  transform: translateY(250px);
  transition: opacity 1s ease-out, transform 1s ease-out;

  @include pad {
    right: 5rem;
  }
  @include desktop {
    right: 8rem;
  }
}

.banner-slogan.fade-in {
  opacity: 1; // 动画结束后的透明度设为 1
  transform: translateY(-50%); // 动画结束后恢复初始位置
}

.banner-img {
  min-height: 500px;
  object-position: 60% 50%;
  object-fit: cover;
}

.slogan-text {
  letter-spacing: 0.05rem;
  font-weight: bolder;
  @include pad {
    font-size: 2.5rem;
  }
}

.slogan-btn {
  font-weight: bold;
  box-shadow: inset 0 0 20px rgba(179, 168, 168, 0.5), 0 0 20px rgba(255, 255, 255, 0.2);
  @include pad {
    font-size: 1.5rem;
  }

  &:hover {
    border: 1px solid;
    outline-color: rgba(255, 255, 255, 0);
    outline: 1px solid;
    outline-offset: 2px;
  }
}
</style>
