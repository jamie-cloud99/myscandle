<template>
  <NavbarComponent></NavbarComponent>
  <div class="bg-fix"></div>
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
  computed: {
    ...mapState(statusStore, ['isLoading'])
  }
}
</script>
