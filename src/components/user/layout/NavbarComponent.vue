<template>
  <nav class="navbar navbar-expand-md sticky-top bg-light">
    <div class="container d-md-flex justify-content-between">

      <h1 class="">
        <span class="visually-hidden">mys香氛</span>
        <RouterLink to="/"><img src="@/assets/images/logo/mys.svg" alt="mys" class="logo-img" height="27"></RouterLink></h1>
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="navbar-nav align-items-center ms-md-4">
          <li class="nav-item mx-2">
            <RouterLink to="/shop" class="nav-link" aria-current="page">商品一覽</RouterLink>
          </li>
          <li class="nav-item mx-2">
            <RouterLink to="/about" class="nav-link" href="#">關於我們</RouterLink>
          </li>
        </ul>
      </div>
      <ul class="d-none d-md-flex align-items-center">
        <li class="nav-search border-dark rounded-pill">
          <button type="button" class="btn border-0"><i class="bi bi-search fs-5"></i><span class="d-md-none ms-2">會員專區</span></button>
          <input type="search" class="form-control search-input" placeholder="搜尋商品名稱">
          <button type="button" class="search-close"><i class="bi bi-x fs-4"></i></button>
        </li>
        <li><button type="button" class="btn border-0"><i class="bi bi-person-fill fs-4"></i><span class="d-md-none ms-2">會員專區</span></button></li>
        <li><button type="button" class="btn border-0" @click.prevent="openCartModal"><i class="bi bi-handbag-fill fs-5"></i><span class="d-md-none ms-2">購物車</span></button></li>
      </ul>
    </div>
  </nav>
</template>


<style lang="scss">
.navbar{
  height: 55px;
  background: url('src/assets/images/background/bg.png');
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);


}

.logo-img{
  height: 40px;
  width: auto;
  padding-top: 0.5rem;
  
}

.navbar-toggler:focus{
  box-shadow: none;
}

.nav-search{
  display: flex;
  &.expand{
    border: 1px solid black;
  }
}

.search-input, .search-close{
  display: none;
  font-size: 0.875rem;
}

.expand .search-input{
  display: block;
  background-color: inherit;
  &:focus{
    border: 0;
    box-shadow: none;
  }
}

.expand .search-close{
  display: block;
}



</style>

<script>  
import { mapState } from 'pinia'
import cartStore from '../../../stores/cartStore'

export default {
  computed: {
    ...mapState(cartStore, ['cartList'])
  },
  methods: {
    openCartModal() {
      this.$router.push('/cart')
    }
  }

}

</script>

