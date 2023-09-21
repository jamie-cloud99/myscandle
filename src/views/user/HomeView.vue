<template>
  <div class="banner position-relative scrollbar-hidden pb-5">
    <div class="d-flex justify-content-center">
      <img
        :src="$format.getImageUrl(banner.path)"
        :alt="banner.title"
        class="d-block w-100 banner-img"
      />
    </div>

    <ul class="d-none d-md-block menu-pc position-absolute top-50 text-light fs-4 fw-bold">
      <li v-for="item in menuCategories" :key="item">
        <router-link to="#" class="menu-pc-item px-3 py-2" @click="goToShop(item)">{{
          item
        }}</router-link>
      </li>
    </ul>

    <div class="banner-slogan position-absolute rounded-md" ref="slogan">
      <h1 class="slogan-text text-light px-5 py-4 lh-normal">宛若仙境的清新香氣</h1>
      <button
        type="button"
        @click.prevent="$router.push('/shop')"
        class="slogan-btn btn btn-primary rounded-md px-4 ms-5 mb-3"
      >
        探索香氛
      </button>
    </div>
    <div class="scrolldownArrow position-absolute">
      <RouterLink to="#us" class="display-3 text-light"
        ><i class="bi bi-arrow-down-circle"></i
      ></RouterLink>
    </div>
  </div>
  <div class="container">
    <div class="pt-xl position-relative" id="us">
      <AboutUs></AboutUs>
    </div>
    <div class="pt-5">
      <HotProducts></HotProducts>
    </div>
    <div class="pt-5 mt-lg-5">
      <OurFeatures></OurFeatures>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productsStore from '../../stores/productsStore'
import statusStore from '../../stores/statusStore'
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
        path: 'banner/main.jpg',
        title: '宛若仙境的清新空氣-mys'
      }
    }
  },
  computed: {
    ...mapState(productsStore, ['menuCategories'])
  },
  methods: {
    ...mapActions(productsStore, ['selectCategory']),
    ...mapActions(statusStore, ['readyPage']),
    goToShop(item) {
      this.selectCategory(item)
      this.$router.push({ path: '/shop', query: { category: item } })
    }
  },
  mounted() {
    this.readyPage()
  }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '../../assets/helpers/variables';

.banner {
  overflow-x: hidden;
}

.menu-pc {
  z-index: 100;
  left: 5rem;
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
  @include desktop {
    left: 10rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    background: $light;
    left: -1rem;
    height: 205px;
    width: 1px;
    z-index: 100;
  }
}

.menu-pc-item {
  &:hover {
    color: $primary;
    opacity: 90%;
    background: $light;
    border-radius: 3rem;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  }
}

.banner-slogan {
  top: 50%;
  backdrop-filter: blur(1.5px);
  line-height: 1.5;
  transform: translateY(-50%);

  @include pad {
    right: 5rem;
  }
  @include desktop {
    right: 8rem;
  }
}

.banner-img {
  min-height: 500px;
  object-position: 60% 50%;
  object-fit: cover;
  @include desktop {
    height: 100vh;
  }
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

.scrolldownArrow {
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  @include pad {
  }
  @include desktop {
    bottom: 4rem;
  }

  &::before {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    z-index: -1;
    content: '';
    width: 36px;
    height: 36px;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
    border-radius: 100%;
    opacity: 0;
    animation: sdb03 3s infinite;
    box-sizing: border-box;
  }
}

@keyframes sdb03 {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  60% {
    box-shadow: 0 0 0 60px rgba(255, 255, 255, 0.1);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
