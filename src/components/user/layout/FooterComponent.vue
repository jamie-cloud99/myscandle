<template>
  <div class="pt-5 mt-5">
    <div class="container px-3 ps-5">
      <div class="row pb-5">
        <div class="col-6 col-md-4 mb-4">
          <h4 class="fs-6 fw-bold mb-4">關於我們</h4>

          <ul>
            <li class="menu-item">
              <div class="position-relative">
                <RouterLink to="/brand" class="menu-item d-block mb-2"> 品牌故事 </RouterLink>
                <span class="menu-item-active position-absolute text-primary z-1"
                  ><i class="bi bi-egg-fill"></i
                ></span>
              </div>
            </li>
            <li>
              <div class="position-relative">
                <RouterLink to="/contactus" class="menu-item d-block mb-2"> 聯絡我們 </RouterLink>
                <span class="menu-item-active position-absolute text-primary z-1"
                  ><i class="bi bi-egg-fill"></i
                ></span>
              </div>
            </li>
            <li>
              <div class="position-relative">
                <RouterLink to="/articles" class="menu-item d-block mb-2"> 香氛研究室 </RouterLink>
                <span class="menu-item-active position-absolute text-primary z-1"
                  ><i class="bi bi-egg-fill"></i
                ></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-6 col-md-4 mb-4">
          <h4 class="fs-6 fw-bold mb-4">商品一覽</h4>
          <ul>
            <li v-for="item in menuCategories" :key="item" class="menu-item">
              <div class="position-relative">
                <RouterLink to="#" class="menu-item d-block mb-2" @click.prevent="goToShop(item)">{{
                  item
                }}</RouterLink>
                <span class="menu-item-active position-absolute text-primary z-1"
                  ><i class="bi bi-egg-fill"></i
                ></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-4 my-4 mt-md-0 mb-md-4">
          <div class="d-flex align-items-center mb-3">
            <h4 class="font-galada fs-2 display-lg-3">MyS</h4>
            <RouterLink to="/login" class="btn btn-light ms-3">登入後台</RouterLink>
          </div>
          <ul>
            <li class="mb-2">營業時間：Mon-Fri 9:00 - 18:00</li>
            <li class="mb-2"><a href="tel:+886-423449833"> 電話：04-2344-9833</a></li>
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
import productsStore from '@/stores/productsStore'

export default {
  computed: {
    ...mapState(productsStore, ['menuCategories'])
  },
  methods: {
    ...mapActions(productsStore, ['selectCategory']),
    goToShop(item) {
      this.selectCategory(item)
      this.$router.push({ path: '/shop', query: { category: item } })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-item {
  &:hover {
    font-weight: 700;
  }
  &:hover ~ .menu-item-active {
    display: block;
  }
}

.menu-item-active {
  display: none;
  top: 50%;
  left: -1.5rem;

  transform: translateY(-50%);
}
</style>
