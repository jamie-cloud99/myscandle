<template>
  <NavbarComponent></NavbarComponent>
  <div class="bg-fix"></div>
  <router-view></router-view>
  <FooterComponent></FooterComponent>
</template>

<script>
import NavbarComponent from '../../components/user/layout/NavbarComponent.vue';
import FooterComponent from '../../components/user/layout/FooterComponent.vue';

export default{
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>