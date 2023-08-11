<template>
  <div class="row justify-content-center align-items-center" ref="about">
    <div class="col-md-5 mb-4" ref="intro">
      <img
        class="d-none d-md-block logo-lg mb-5 ps-4"
        src="/images/logo/mys.svg"
        alt="mys"
      />
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
      <img src="/images/aboutus/about.png" alt="aboutus" />
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
      tl.from(this.$refs.intro, { autoAlpha: 0, scale: 0, y: 20, duration: 0.5 })
      .from(this.$refs['intro-img'], { autoAlpha: 0, x: 50, duration: 0.4 })

      ScrollTrigger.create({
        trigger: this.$refs.about,
        start: 'top 80%',
        end: 'top 10%',
        onEnter: () => tl.restart(),
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

<style lang="scss">

.logo-lg {
  height: 4rem;
  width: auto;
}
</style>
