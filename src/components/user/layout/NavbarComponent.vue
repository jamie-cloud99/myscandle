<template>
  <div class="header py-2" :class="{ 'bg-primary': isScrollDown }">
    <div class="container d-flex justify-content-between">
      <button type="button" class="d-md-none menu-btn" @click.prevent="toggleMenu" :class="{active: showMenu}"><span class="navicon"></span></button>
      <ul class="menu pt-3">
        <li class="mb-2"><router-link to="/shop" class="menu-item link-light fs-5 p-3" @click.prevent="toggleMenu">SHOP</router-link></li>
        <li v-for="item in menuCategories" :key="item" class="mb-2"><a class="menu-item link-light fs-5 p-3" @click.prevent="goToShop(item)">{{ item }}</a></li>
      </ul>
      <div class="d-flex align-items-center">
        <RouterLink to="/">
          <span class="visually-hidden">mys香氛</span>
          <img src="/images/logo/mys-light.svg" alt="mys香氛" class="logo-img" />
        </RouterLink>
        <RouterLink to="/shop" class="shop-link ms-5 px-2 link-light" :class="{ 'd-md-block': showShopBtn }">SHOP</RouterLink>
      </div>
      <ul class="navbar-nav">
        <li class="me-2">
          <button
            type="button"
            class="btn border-0 position-relative"
            @click.prevent="toggleCartPreview"
          >
            <i class="bi bi-handbag-fill text-light fs-5"></i
            ><span class="position-absolute cart-number badge rounded-pill bg-danger">
              {{ countCart }}
              <span class="visually-hidden">unread messages</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
$light: #f2edde;
$primary: #804D1E;

.header {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 500;
}

.logo-img {
  height: 44px;
  width: auto;
  padding-top: 0.25rem;
}

.shop-link {
  display: none;
  font-size: 1.15rem;
  letter-spacing: 0.1rem;
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

.active .navicon{
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
  align-items: center;
}

.menu-item {
  letter-spacing: 0.1rem;
}


.nav-search {
  display: flex;
  &.expand {
    border: 1px solid black;
  }
}

.search-input,
.search-close {
  display: none;
  font-size: 0.875rem;
}

.expand .search-input {
  display: block;
  background-color: inherit;
  &:focus {
    border: 0;
    box-shadow: none;
  }
}

.expand .search-close {
  display: block;
}
</style>

<script>
import { mapState, mapActions } from 'pinia'
import statusStore from '../../../stores/statusStore'
import cartStore from '../../../stores/cartStore'
import productsStore from '../../../stores/productsStore'

export default {
  props: ['scrollY'],
  data() {
    return {
      isScrollDown: true,
      showShopBtn: false,
      showMenu: false,
      // menuCategories: []
    }
  },
  computed: {
    ...mapState(cartStore, ['cartList']),
    ...mapState(statusStore, ['showCart']),
    ...mapState(productsStore, ['menuCategories']),
    countCart() {
      return this.cartList.reduce((acc, cur) => acc +=cur.qty,0)
    },
  },
  methods: {
    ...mapActions(cartStore, ['fetchCart']),
    ...mapActions(statusStore, ['toggleCartPreview']),
    ...mapActions(productsStore, ['selectCategory']),
    watchScroll(height = 0) {
      this.isScrollDown = window.scrollY >= height ? true : false
      this.showShopBtn = window.scrollY >= height ? true : false
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    goToShop(item) {
      this.selectCategory(item)
      this.toggleMenu()
      this.$router.push({ path: '/shop', query: { category: item}})
    },
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
