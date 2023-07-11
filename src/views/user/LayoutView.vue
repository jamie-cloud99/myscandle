<template>
  <div class="bg-fix"></div>
  <NavbarComponent :scroll-y="scrollY"></NavbarComponent>
  <ToastMessages></ToastMessages>
  <LoadingComponent v-show="isLoading"></LoadingComponent>
  <router-view></router-view>
  <FooterComponent></FooterComponent>
</template>

<script>
import NavbarComponent from '../../components/user/layout/NavbarComponent.vue'
import FooterComponent from '../../components/user/layout/FooterComponent.vue'
import emitter from '../../methods/emitter'
import ToastMessages from '../../components/ToastMessages.vue'
import statusStore from '../../stores/statusStore'
import { mapState } from 'pinia'

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ToastMessages
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
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
    showHeaderBg() {
      if (this.$route.name ==='Home') {
        this.scrollY = 500
      } else if (this.$route.name ==='Shop') {
        this.scrollY = 250
      }
      else {
        this.scrollY = 0
      }
    }
  },
  watch: {
    $route: {
      handler: "showHeaderBg",
      immediate: true
    }
  },
  
}
</script>
