<template>
  <div class="bg-fix"></div>
  <NavbarComponent :scroll-y="scrollY"></NavbarComponent>
  <OffCanvaCart></OffCanvaCart>
  <ToastMessages></ToastMessages>
  <LoadingComponent v-show="isLoading"></LoadingComponent>
  <router-view></router-view>
  <FooterComponent></FooterComponent>
</template>

<script>
import NavbarComponent from '../../components/user/layout/NavbarComponent.vue'
import OffCanvaCart from '../../components/user/layout/OffCanvaCart.vue'
import FooterComponent from '../../components/user/layout/FooterComponent.vue'
import emitter from '../../methods/emitter'
import ToastMessages from '../../components/user/layout/ToastMessages.vue'
import statusStore from '../../stores/statusStore'
import { mapState } from 'pinia'

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ToastMessages,
    OffCanvaCart
  },
  provide() {
    return {
      emitter
    }
  },
  data() {
    return {
      scrollY: 100
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading', 'showCart'])
  },
  methods: {
    showHeaderBg() {
      if (this.$route.name === 'Home') {
        this.scrollY = 300
      } else if (this.$route.name === 'Shop') {
        this.scrollY = 10
      } else {
        this.scrollY = 0
      }
    },
    disableScroll() {
      if (this.showCart) {
        document.body.style.position = 'fixed'
      } else {
        document.body.style.position = ''
      }
    }
  },
  watch: {
    $route: {
      handler: 'showHeaderBg',
      immediate: true,
      deep: true
    },
    showCart: {
      handler: 'disableScroll'
    }
  }
}
</script>
