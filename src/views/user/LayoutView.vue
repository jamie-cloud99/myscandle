<template>
  <div class="bg-fix"></div>
  <NavbarComponent :scroll-y="scrollY" />
  <OffCanvaCart />
  <ToastMessages />
  <LoadingComponent v-show="isLoading" />
  <RouterView />
  <FooterComponent />
  <ScrollToTop />
</template>

<script>
import { mapState } from 'pinia'
import statusStore from '@/stores/statusStore'
import NavbarComponent from '@/components/user/layout/NavbarComponent.vue'
import OffCanvaCart from '@/components/user/layout/OffCanvaCart.vue'
import FooterComponent from '@/components/user/layout/FooterComponent.vue'
import ToastMessages from '@/components/user/layout/ToastMessages.vue'
import ScrollToTop from '@/components/user/layout/ScrollToTop.vue'

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ToastMessages,
    OffCanvaCart,
    ScrollToTop
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
