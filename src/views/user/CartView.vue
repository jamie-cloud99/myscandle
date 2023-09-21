<template>
  <div class="container">
    <div class="row py-4">
      <div class="col-lg-8 pt-3 mb-5 mb-lg-0">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h2 class="h5 fw-semibold ps-0 ps-md-3">購物車清單</h2>
          <button
            type="button"
            class="btn btn-outline-primary py-2"
            @click.prevent="openClearModal"
          >
            全部刪除
          </button>
        </div>
        <CartTable />
        <ClearCartsModal ref="clearCartsModal" @confirm-clear="clearAllCarts" />
      </div>
      <div class="col-lg-4 pt-3 mb-5 mb-lg-0">
        <h3 class="h5 fw-semibold py-2 mb-3 ps-2">使用優惠券</h3>
        <div class="coupon-group d-flex ps-2 mb-2">
          <input
            type="text"
            placeholder="輸入優惠碼"
            class="form-control coupon-input bg-transparent border border-primary mb-3 mb-lg-0"
            v-model.lazy="coupon"
          />
          <button
            type="button"
            class="btn btn-light border-primary ms-lg-3"
            @click.prevent="useCoupon(coupon)"
            :disabled="couponLoading"
          >
            <span
              v-if="couponLoading"
              class="spinner-border text-primary spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-else>套用</span>
          </button>
        </div>
        <p v-if="couponMessage" class="coupon-message text-primary my-auto ps-2">
          {{ couponMessage }}
        </p>
        <table class="table text-end mx-2 mt-4">
          <tbody>
            <tr class="">
              <td class="text-start">商品總計</td>
              <td class="">NT$ {{ $format.currency(cartsTotal.total) }}</td>
            </tr>
            <tr>
              <td class="text-start">運費</td>
              <td class="">NT$ 0</td>
            </tr>
            <tr>
              <td class="text-start">優惠折抵</td>
              <td class="text-primary">
                - NT$ {{ $format.currency(cartsTotal.total - cartsTotal.final_total) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="border-top border-primary">
              <td class="text-start">結帳總金額</td>
              <td class="fs-md">NT$ {{ $format.currency(cartsTotal.final_total) }}</td>
            </tr>
          </tfoot>
        </table>

        <div class="d-flex justify-content-between align-items-center mt-4 mt-lg-5">
          <RouterLink
            to="/shop"
            class="go-back-link d-flex align-items-center text-primary-emphasis py-2"
            ><i class="bi bi-chevron-left me-2"></i>繼續購物</RouterLink
          >
          <button type="button" class="btn btn-primary btn-lg rounded-md" @click="openOrderPage">
            前往結帳
          </button>
        </div>
      </div>
    </div>

    <div class="px-3 my-5">
      <div class="row">
        <div class="col-lg-8 bg-primary bg-opacity-25 rounded-md order-2 py-4">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="fs-5 px-4 fw-semibold">別錯過這些...</h3>
            <div class="d-flex">
              <button
                type="button"
                class="btn swiper-btn"
                @click="goPrev"
                :disabled="!slides.havePrev"
              >
                <i class="bi bi-chevron-left"></i>
              </button>
              <button
                type="button"
                class="btn swiper-btn"
                @click="goNext"
                :disabled="!slides.haveNext"
              >
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          <div class="px-2 pt-4">
            <SwiperContainer
              @swiper="onSwiper"
              :slides-per-view="1"
              :breakpoints="swiperBreakpoints"
              :space-between="16"
            >
              <SwiperSlide
                class="col-lg-4"
                v-for="product in recommendedProducts"
                :key="product.id"
              >
                <ProductCard :product="product" />
              </SwiperSlide>
            </SwiperContainer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '../../stores/cartStore'
import statusStore from '../../stores/statusStore'
import slideStore from '../../stores/slideStore'
import ProductCard from '../../components/user/shop/ProductCard.vue'
import CartTable from '../../components/user/cart/CartTable.vue'
import ClearCartsModal from '../../components/user/cart/ClearCartsModal.vue'

export default {
  components: {
    ProductCard,
    CartTable,
    ClearCartsModal
  },
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
      coupon: 'new95'
    }
  },
  computed: {
    ...mapState(cartStore, ['cartList', 'couponMessage', 'cartsTotal', 'recommendedProducts']),
    ...mapState(statusStore, ['isLoading', 'couponLoading']),
    ...mapState(slideStore, ['slides', 'curSlideShowed', 'swiper', 'swiperBreakpoints'])
  },
  methods: {
    ...mapActions(cartStore, ['useCoupon', 'openCart', 'clearCarts']),
    ...mapActions(slideStore, [
      'enableGoSlide',
      'goNext',
      'goPrev',
      'onSwiper',
      'updateCurSlideShowed'
    ]),
    openOrderPage() {
      this.$router.push('/cart/order')
    },
    openClearModal() {
      this.$refs.clearCartsModal.showModal()
    },
    clearAllCarts() {
      this.clearCarts()
      this.$refs.clearCartsModal.hideModal()
    }
  },
  watch: {
    slides: {
      handler() {
        this.enableGoSlide()
      },
      deep: true
    },
    recommendedProducts() {
      this.slides.totalSlides = this.recommendedProducts.length
    }
  },
  created() {
    this.openCart()
  },
  mounted() {
    window.addEventListener('resize', this.updateCurSlideShowed)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateCurSlideShowed)
  }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '../../assets/helpers/variables';
.coupon-group {
  flex-direction: column;

  @include desktop {
    flex-direction: row;
  }
}

.coupon-group .coupon-input {
  padding-left: 1rem;
  flex: 1;
  min-width: 9rem;
}

.swiper-btn {
  border: 0;

  &:hover:not(:disabled),
  &:active {
    background: $primary;
    color: $light;
  }
}

.go-back-link:hover {
  text-underline-offset: 4px;
  text-decoration: underline;
  text-decoration-color: $primary;
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: auto;
}
</style>
