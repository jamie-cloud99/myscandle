<template>
  <div class="banner position-relative scrollbar-hidden pb-5">
    <div class="d-flex justify-content-center">
      <img :src="banner.imgUrl" :alt="banner.title" class="d-block w-100 banner-img" />
    </div>

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
    <div class="flower position-absolute"></div>
    <div class="scrolldownArrow position-absolute"><RouterLink to="#us" class="display-3 text-light"><i class="bi bi-arrow-down-circle"></i></RouterLink></div>
  </div>
  <!-- 查看更多 動畫 -->
  <div class="container">
    <div class="pt-xl" id="us">
      <AboutUs ></AboutUs>
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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
        title: '宛若仙境的清新空氣-mys'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fadeInBannerSlogan()
    })
    this.moveFlower()
    this.scrollControl('.flower')
  },
  methods: {
    fadeInBannerSlogan() {
      const bannerSlogan = this.$refs.slogan
      bannerSlogan.classList.add('fade-in')
    },
    scrollControl(item) {
      let tl
      const triggerElement = item
      const windowWidth = window.innerWidth

      if (windowWidth < 768) {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top 50%',
            end: 'top 1%',
            scrub: 0.5
          }
        })

        tl.to(item, {
          top: '50%',
          left: '50%',
          yPercent: '-50', // translate(0, -100%)
          duration: 20,
          position: 'absolute'
        }).to(item, {
          top: '100%',
          left: '50%',
          yPercent: '-100', // translate(0, -100%)
          duration: 20,
          position: 'absolute'
        })
      } else if (windowWidth < 1200) {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top 70%',
            end: 'top 1%',
            scrub: 0.5
          }
        })

        tl.from(item, {
          top: '65%',
          right: 350,
          duration: 10,
          position: 'absolute'
        }).to(item, {
          top: '100%',
          right: '20%',
          yPercent: '-100',
          duration: 20,
          position: 'absolute'
        })
      } else {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,

            start: 'top 40%',
            end: 'top 1%',
            scrub: 0.5
          }
        })

        tl.from(item, {
          top: '60%',
          right: 370,
          duration: 10,
          position: 'absolute'
        }).to(item, {
          top: '100%',
          right: '20%',
          yPercent: '-100',
          duration: 20,
          position: 'absolute'
        })
      }
    },

    moveFlower() {
      gsap.to('.flower', {
        rotation: 360,
        duration: 3,
        onComplete: () => this.repeatScale('.flower')
      })
    },
    repeatScale(selector) {
      const timeline = gsap.timeline()
      timeline.to(selector, { scale: 0.5, duration: 1.5, opacity: 0.3, yoyo: true, repeat: -1 })
    }
  },
  created() {
    gsap.registerPlugin(ScrollTrigger)
  }
}
</script>

<style lang="scss">
.banner {
  overflow-x: hidden;
}

.banner-slogan {
  top: 50%;
  backdrop-filter: blur(1.5px);
  line-height: 1.5;

  opacity: 0;
  transform: translateY(250px);
  transition: opacity 1s 0.5s ease-out, transform 1s 0.5s ease-out;

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

.flower {
  width: 50px;
  height: 50px;
  background: center / contain no-repeat url('../../assets/images/others/flower.png');
  top: 60%;
  left: 140px;
  transform: translateY(-50%);
  @include pad {
    top: 40%;
    left: auto;
    right: 20%;
  }
  @include desktop {
    top: 50%;
    right: 20%;
  }
}

.scrolldownArrow {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  @include pad {
    bottom: 5px;
  }
  @include desktop {
    bottom: 5px;
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
