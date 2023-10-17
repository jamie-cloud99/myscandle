<template>
  <h3 class="about-title position-absolute start-50 translate-middle-x z-n1 text-center">
    ABOUT US
  </h3>
  <div class="row justify-content-center align-items-center" ref="about">
    <div class="col-md-5 mb-4" ref="intro">
      <h4 class="font-galada fs-1 display-lg-2 ps-4 mb-3">MyS</h4>
      <p class="mb-4 ps-4">
        Mys 在瑞典語中表示舒適、溫馨的氛圍，<br
          class="d-md-none d-xl-block"
        />是瑞典人重要的生活哲學。
      </p>
      <p class="ps-4">
        點上蠟燭，和親朋好友在舒服香氣裡談天，<br
          class="d-md-none d-xl-block"
        />簡簡單單，就是最好的 mys 時光。
      </p>
    </div>
    <div class="col-md-6" ref="intro-img">
      <img src="/images/aboutus/aboutus.svg" alt="aboutus" />
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default {
  methods: {
    showAnimation() {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power1.out' } })
      tl.from(this.$refs.intro, { autoAlpha: 0, scale: 0, y: 20, duration: 0.5 }).from(
        this.$refs['intro-img'],
        { autoAlpha: 0, x: 50, duration: 0.4 }
      )

      ScrollTrigger.create({
        trigger: this.$refs.about,
        start: 'top 80%',
        end: 'top 10%',
        onEnter: () => tl.restart()
      })
    }
  },
  created() {
    gsap.registerPlugin(ScrollTrigger)
  },
  mounted() {
    this.showAnimation()
  }
}
</script>

<style lang="scss" scoped>
.about-title {
  letter-spacing: 0.5rem;
  font-weight: 900;
  font-size: 100px;
  white-space: nowrap;
  top: 0.2rem;
  opacity: 0.2;
  font-size: xx-large;
  @include desktop {
    top: 1rem;
    letter-spacing: 1rem;
    font-size: 100px;
  }
}
</style>
