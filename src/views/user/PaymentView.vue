<template>
  <div class="container pt-5">
    <ul class="d-flex justify-content-center align-items-start pt-5">
    <li
      class="d-flex flex-column justify-content-center align-items-center mx-3"
      v-for="item in progress"
      :key="'step' + item.step"
      :class="{active: item.step === paymentStep}"
    >
      <p class="step-item rounded-circle text-center mb-3">{{ item.step }}</p>
      <p class="step-title">{{ item.title }}</p>
    </li>
  </ul>
  </div>
  <router-view></router-view>
</template>

<script>
import { mapState } from 'pinia'
import statusStore from '../../stores/statusStore'

export default {
  data() {
    return {
      progress: [
        {
          step: 1,
          title: '購物車'
        },
        {
          step: 2,
          title: '訂購資訊'
        },
        {
          step: 3,
          title: '結帳'
        }
      ],
    }
  },
  computed: {
    ...mapState(statusStore, ['paymentStep'])
  },
}
</script>

<style lang="scss">
.step-item {
  height: 3rem;
  width: 3rem;
  line-height: 3rem;
}

.cart-img {
  height: 5rem;
  width: 5rem;
  object-fit: cover;
  @include pad {
    height: 7rem;
    width: 7rem;
  }
}
</style>
