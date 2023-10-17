<template>
  <RouterLink class="top-link" :class="topClass" to="#" @click="scrollToTop">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 6"><path d="M12 6H0l6-6z" /></svg>
    <span class="visually-hidden">Back to top</span>
  </RouterLink>
</template>

<script>
export default {
  data() {
    return {
      topClass: ''
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    toggleBtn() {
      this.topClass = window.scrollY > 300 ? 'show' : 'hide'
    }
  },

  mounted() {
    window.addEventListener('scroll', this.toggleBtn)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.toggleBtn)
  }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.top-link {
  transition: all 0.25s ease-in-out;
  position: fixed;
  bottom: 0;
  right: 0;
  display: inline-flex;

  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin: 0 1rem 2rem 0;
  border-radius: 50%;
  padding: 0.15rem;
  width: 50px;
  height: 50px;
  background-color: #fcf6f0;
  z-index: 300;

  svg {
    fill: #000;
    width: 18px;
    height: 9px;
  }

  @include pad {
    margin: 0 2rem 3rem 0;
    padding: 0.15rem;
    width: 60px;
    height: 60px;
    svg {
      width: 18px;
      height: 9px;
    }
  }

  &.show {
    visibility: visible !important;
    opacity: 1 !important;
  }
  &.hide {
    visibility: hidden;
    opacity: 0;
  }

  &:hover {
    background-color: #f2ebdd;

    svg {
      fill: #000000;
    }
  }
}
</style>
