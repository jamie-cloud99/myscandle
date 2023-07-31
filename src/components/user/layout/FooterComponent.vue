<template>
  <div class="pt-5 mt-5">
    <div class="container px-3 ps-5">
      <div class="row pb-5">
        <div class="col-6 col-md-4 mb-4">
          <h4 class="fs-6 fw-bold mb-4">關於我們</h4>
          <ul>
            <li><RouterLink to="/brand" class="mb-2">品牌故事</RouterLink></li>
            <li><a href="" class="mb-2">聯絡我們</a></li>
          </ul>
        </div>
        <div class="col-6 col-md-4 mb-4">
          <h4 class="fs-6 fw-bold mb-4">商品一覽</h4>
          <ul>
            <li v-for="item in menuCategories" :key="item"><a href="#" class="mb-2" @click.prevent="goToShop(item)">{{ item }}</a></li>
          </ul>
        </div>
        <div class="col-md-4 my-4 mt-md-0 mb-md-4">
          <h4 class="fs-6 fw-bold mb-4">
            <img class="logo-md" src="src/assets/images/logo/mys.svg" alt="" />
          </h4>
          <ul>
            <li class="mb-2">營業時間：Mon-Fri 9:00 - 18:00</li>
            <li class="mb-2">電話：04 2344 9833</li>
            <li><a href="mailto:mys@gmail.com" class="mb-2">E-mail：mys@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div class="d-md-flex justify-content-end border-top border-primary fs-sm py-3">
        <p class="me-md-4">本站僅作為網頁作品練習使用</p>
        <p>mys 2023 © All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productsStore from '../../../stores/productsStore'

export default{
  computed: {
    ...mapState(productsStore, ['menuCategories'])
  },
  methods: {
    ...mapActions(productsStore,['selectCategory']),
    goToShop(item) {
      this.selectCategory(item)
      this.$router.push({ path: '/shop', query: { category: item}})
    },
  }
}

</script>

<style lang="scss">
.logo-md {
  height: 3rem;
  width: auto;
}
</style>
