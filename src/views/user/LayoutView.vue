<template>
  <NavbarComponent></NavbarComponent>
  <div class="bg-fix"></div>
  <ToastMessages></ToastMessages>
  <router-view></router-view>
  <FooterComponent></FooterComponent>
</template>

<script>
import NavbarComponent from '../../components/user/layout/NavbarComponent.vue'
import FooterComponent from '../../components/user/layout/FooterComponent.vue'
import emitter from '../../methods/emitter'
import ToastMessages from '../../components/ToastMessages.vue'

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
  }
}
</script>
