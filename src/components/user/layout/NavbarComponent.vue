<template>
  <div class="header py-2" :class="{ 'bg-primary': isScrollDown }">
    <div class="container d-flex justify-content-between">
      <button
        type="button"
        class="d-md-none menu-btn"
        @click="toggleMenu"
        :class="{ active: showMenu }"
      >
        <span class="navicon"></span>
      </button>
      <ul class="menu pt-3 fw-semibold">
        <li class="menu-item mb-2 text-light py-3">
          <h3 class="fs-1 fw-bold">
            <RouterLink to="/shop" class="d-block" @click.prevent="goToShop(null)">
              商品一覽
            </RouterLink>
          </h3>
        </li>
        <li v-for="item in menuCategories" :key="item" class="mb-2">
          <div class="position-relative">
            <RouterLink
              to="#"
              class="menu-item link-light fs-5 p-3 d-block"
              @click.prevent="goToShop(item)"
              >{{ item }}</RouterLink
            >
            <span class="menu-item-active position-absolute text-light"
              ><i class="bi bi-egg-fill"></i
            ></span>
          </div>
        </li>
        <li class="menu-item mb-2 text-light py-3">
          <h3 class="fs-1 fw-bold">
            <RouterLink to="/brand" class="d-block" @click.prevent="toggleMenu">
              品牌故事
            </RouterLink>
          </h3>
        </li>
        <li class="menu-item mb-2 text-light py-3">
          <h3 class="fs-1 fw-bold">
            <RouterLink to="/contactus" class="d-block" @click.prevent="toggleMenu">
              聯絡我們
            </RouterLink>
          </h3>
        </li>
      </ul>
      <div class="d-flex align-items-center">
        <RouterLink to="/" class="d-flex align-items-end gap-2">
          <img src="/images/logo/mys-light.svg" alt="mys香氛" class="logo-img" />
          <h5 class="font-galada text-light fs-1 fs-lg-2">MyS</h5>
        </RouterLink>
        <div class="d-none d-md-flex ms-3">
          <RouterLink to="/shop" class="shop-link px-3 py-1 rounded-md fw-semibold"
            >商品一覽</RouterLink
          >
          <RouterLink to="/brand" class="shop-link px-3 py-1 rounded-md fw-semibold"
            >品牌故事</RouterLink
          >
        </div>
      </div>
      <ul class="d-flex me-2">
        <li>
          <div class="position-relative">
            <button
              type="button"
              class="nav-btn btn border-0 position-relative fs-5"
              @click="toggleSearch"
              :class="{ active: showSearchBox }"
            >
              <i class="bi bi-search"></i>
            </button>
            <div class="search-pos position-absolute" :class="{ expand: showSearchBox }">
              <SearchDropdown @search="goSearch"/>
            </div>
          </div>
        </li>
        <li>
          <button
            type="button"
            class="nav-btn btn border-0 position-relative fs-5"
            @click="toggleCartPreview"
          >
            <i class="bi bi-handbag-fill"></i
            ><span v-if="countCart" class="position-absolute cart-number badge rounded-pill bg-danger">
              {{ countCart }}
              <span class="visually-hidden">cart number</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import cartStore from '@/stores/cartStore'
import productsStore from '@/stores/productsStore'
import SearchDropdown from './SearchDropdown.vue'

export default {
  props: ['scrollY'],
  components: {
    SearchDropdown
  },
  data() {
    return {
      isScrollDown: true,
      showMenu: false,
      showSearchBox: false
    }
  },
  computed: {
    ...mapState(cartStore, ['cartList']),
    ...mapState(statusStore, ['showCart']),
    ...mapState(productsStore, ['menuCategories']),
    countCart() {
      return this.cartList.reduce((acc, cur) => (acc += cur.qty), 0)
    }
  },
  methods: {
    ...mapActions(cartStore, ['fetchCart']),
    ...mapActions(statusStore, ['toggleCartPreview']),
    ...mapActions(productsStore, ['selectCategory', 'searchProducts']),
    watchScroll(height = 0) {
      this.isScrollDown = window.scrollY >= height ? true : false
      this.showShopBtn = window.scrollY >= height ? true : false
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    goToShop(item) {
      this.toggleMenu()
      if (item === null) {
        this.$router.push('/shop')
      } else {
        this.selectCategory(item)
        this.$router.push({ path: '/shop', query: { category: item } })
      }
    },
    toggleSearch() {
      this.showSearchBox = !this.showSearchBox
    },
    goSearch(keyword) {
      this.searchProducts(keyword)
      this.toggleSearch()
      this.$router.push({ path: '/search', query: { kw: keyword } })
    }
  },
  watch: {
    scrollY() {
      if (this.scrollY === 0) {
        this.isScrollDown = true
      }
    }
  },
  created() {
    this.fetchCart()
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.watchScroll(this.scrollY)
    })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', () => {
      this.watchScroll(this.scrollY)
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.header {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 500;
}

.logo-img {
  height: 44px;
  width: auto;
}

.shop-link {
  font-size: 1.15rem;
  letter-spacing: 0.1rem;
  color: $light;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  &:hover {
    background: $light;
    color: $primary;
  }
}

.badge.cart-number {
  pointer-events: none;
  top: 2px;
  left: 1.75rem;
}

.navicon {
  background: $light;
  display: block;
  height: 2px;
  position: relative;
  transition: background 0.2s ease-out;
  width: 1.25rem;

  &::before,
  &::after {
    z-index: 1000;
    background: $light;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    transition: all 0.2s ease-out;
    width: 100%;
  }
  &::before {
    top: -0.5rem;
  }
  &::after {
    top: 0.5rem;
  }
}

.active .navicon {
  background: transparent;

  &::before {
    top: 0;
    transform: rotate(-45deg);
  }
  &::after {
    top: 0;
    transform: rotate(45deg);
  }
}

.menu {
  display: none;
  position: fixed;
  inset: 0;
  width: 100%;
  background: $primary;
  z-index: 800;
}

.menu-btn.active ~ .menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0 6rem;
}

.menu-item {
  letter-spacing: 0.5rem;

  &:active ~ .menu-item-active {
    display: block;
  }
}

.menu-item-active {
  display: none;
  top: 50%;
  right: -1rem;
  transform: translateY(-50%);
}

.search-pos {
  bottom: -1rem;
  right: 0;
  max-height: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  transform: translateY(100%);
  transition: all 300ms ease-in-out;
  &.expand {
    max-height: 400px;
  }
}

.nav-btn {
  color: $light;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  &:hover,
  &:active,
  &.active {
    background: $light;
    color: $primary;
  }
}
</style>
