<template>
  <SwiperContainer :modules="modules" @swiper="onSwiper">
    <template #container-start>
      <ul
        class="categories-list d-flex justify-content-center align-items-center text-body py-4 mb-3"
      >
        <li
          data-aos="fade-up"
          data-aos-delay="50"
          v-for="item in pickedProducts"
          :key="item.category"
        >
          <button
            @click="changeCategory(item)"
            type="button"
            class="categories-list-item position-relative h5 px-4 py-2 mx-2"
            :class="{ active: item.category === this.tempCategory.category }"
          >
            <span class="categories-item-text">{{ item.category }}</span>
          </button>
        </li>
      </ul>
    </template>

    <SwiperSlide class="px-3" v-for="category in pickedProducts" :key="category.categoryTitle">
      <h3 data-aos="fade-up" data-aos-delay="50" class="h3 text-center mb-3">
        {{ category.categoryTitle }}
      </h3>
      <p data-aos="fade-up" data-aos-delay="150" class="text-center mb-5">
        {{ category.description }}
      </p>
      <div class="d-none d-lg-block">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <RouterLink
              data-aos="fade-up-right"
              data-aos-delay="500"
              :to="'/product/' + category.products[0].id"
              class="card rounded-md border-primary h-100 overflow-hidden"
            >
              <div class="ratio ratio-1x1 overflow-hidden">
                <img
                  :src="category.products[0].imageUrl"
                  :alt="category.products[0].title"
                  class="product-img"
                  loading="lazy"
                />
              </div>
              <div class="card-body pb-lg-0">
                <div class="card-title fs-md fw-bold">{{ category.products[0].title }}</div>
                <div class="d-flex align-items-center">
                  <div class="badge rounded-pill text-bg-light fs-6 fw-normal lh-base">
                    {{ category.products[0].category }}
                  </div>
                  <p class="text-secondary ms-auto">
                    NT$ {{ $format.currency(category.products[0].price) }}
                  </p>
                </div>
              </div>
              <div class="card-footer bg-transparent border-top-0 pt-0"></div>
            </RouterLink>
          </div>
          <div class="col-md-6">
            <div class="d-none d-md-flex flex-column">
              <RouterLink
                data-aos="fade-up-left"
                data-aos-delay="500"
                :to="'/product/' + category.products[1].id"
                class="card rounded-md border-primary overflow-hidden mb-3 mb-lg-4"
              >
                <div class="d-flex">
                  <div class="w-60 ratio ratio-1x1 overflow-hidden">
                    <img
                      :src="category.products[1].imageUrl"
                      :alt="category.products[1].title"
                      class="product-img"
                      loading="lazy"
                    />
                  </div>
                  <div class="w-40 d-flex flex-column">
                    <div class="card-body">
                      <div class="card-title fs-md fw-bold mb-3">
                        {{ category.products[1].title }}
                      </div>
                      <div class="badge rounded-pill text-bg-light fs-6 fw-normal lh-base mb-3">
                        {{ category.products[1].category }}
                      </div>
                      <p class="text-secondary ms-auto">
                        NT$ {{ $format.currency(category.products[1].price) }}
                      </p>
                    </div>
                    <div class="card-footer bg-transparent border-primary">
                      <a class="text-end" href="#"
                        >查看商品<i class="bi bi-arrow-right-short ms-2"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </RouterLink>
              <RouterLink
                data-aos="fade-up-left"
                data-aos-delay="300"
                data-aos-duration="700"
                :to="'/product/' + category.products[2].id"
                class="card rounded-md border-primary overflow-hidden"
              >
                <div class="d-flex">
                  <div class="w-60 ratio ratio-1x1 overflow-hidden">
                    <img
                      :src="category.products[2].imageUrl"
                      :alt="category.products[2].title"
                      class="product-img"
                      loading="lazy"
                    />
                  </div>
                  <div class="w-40 d-flex flex-column">
                    <div class="card-body">
                      <div class="card-title fs-md fw-bold mb-3">
                        {{ category.products[2].title }}
                      </div>
                      <div class="badge rounded-pill text-bg-light fs-6 fw-normal lh-base mb-3">
                        {{ category.products[2].category }}
                      </div>
                      <p class="text-secondary ms-auto">
                        NT$ {{ $format.currency(category.products[2].price) }}
                      </p>
                    </div>
                    <div class="card-footer bg-transparent border-primary">
                      <a class="text-end" href="#"
                        >查看商品<i class="bi bi-arrow-right-short ms-2"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <ul class="d-block d-lg-none">
        <li v-for="product in category.products" :key="product.id" class="mb-3 mb-md-4">
          <RouterLink
            data-aos="zoom-in-up"
            data-aos-duration="600"
            :to="'/product/' + product.id"
            class="product-card card rounded-md border-primary h-100 overflow-hidden"
          >
            <div class="ratio ratio-1x1">
              <img :src="product.imageUrl" :alt="product.title" loading="lazy" class="d-block" />
            </div>
            <div class="card-body pb-lg-0">
              <div class="card-title fs-md fw-bold">{{ product.title }}</div>
              <div class="d-flex align-items-center">
                <div class="badge rounded-pill text-bg-light fs-6 fw-normal lh-base">
                  {{ product.category }}
                </div>
                <p class="text-secondary ms-auto">NT$ {{ $format.currency(product.price) }}</p>
              </div>
            </div>
            <div class="card-footer bg-transparent border-top-0 pt-0"></div>
          </RouterLink>
        </li>
      </ul>
    </SwiperSlide>
  </SwiperContainer>
</template>

<script>
import { Pagination } from 'swiper/modules'
import 'swiper/css/pagination'

export default {
  data() {
    return {
      pickedProducts: [
        {
          category: '熱銷商品',
          categoryTitle: '經典人氣排行',
          description: '百年時光錘鍊，溫柔香氣縈繞鼻息，戒不掉的經典好味',
          products: [
            {
              order: 1,
              id: '-NZ-AlESxfIyGHgYr16n',
              title: '普羅旺斯薰衣草香薰蠟燭',
              price: 2200,
              category: '蠟燭',
              imageUrl:
                'https://storage.googleapis.com/vue-course-api.appspot.com/margo/1688565581427.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=DvUtB47xL2lsahMUqqXu9TCPvHFcYI%2B7qag%2Bxxgw4CiCVHV%2FmaSL%2B9uSDnt%2BisikU4E2r2UXFLhzNo890eIE0BgYxHLI55P21kqHttUEHHcBuMSld%2BuIGjqNbwT8o9M8pBumpYzR9DPQQrgsHw%2FbcTk4VvAzWzgDdgiZX%2Fj523WARO0NJC0G3sW%2B1taE1I6MxRd2ZY2UTayzZHtH%2FKBYbFOmMCz9JUsDdzPWmf0C%2F%2FuHlVAW5RQVci6Am%2Blz%2FyKVPiem71VePpvYeLKZbd4JBnxELSz5Vv2Tz%2F8z%2BQhsQeZhSjThnr0quYa83aORHGT1%2FG9whag6VirpSafuau%2FBUQ%3D%3D'
            },
            {
              order: 2,
              id: '-NYQz5YhWLBGKfVkujm0',
              title: '峇里島假期香薰蠟燭',
              price: 1200,
              category: '蠟燭',
              imageUrl:
                'https://storage.googleapis.com/vue-course-api.appspot.com/margo/1688699773868.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=iiR%2BhGOW%2BYs3EVqTBl6H05noMmePVGvZEMX7yBw69fXKSklPnB05rIMhn2tK%2BHpPT26akc0wSyap%2FWe23mceCCLoUocay7bYk%2F3%2BpCz%2FmnGFoilMpDB%2B9Br9Q77%2F8F5zigzV67hmw1Xiiuj1Svs0aQtn0tUdI46OKzzjQE3ZQ%2Bgyik%2BwMhxCMWSk8xnCwWW5dhMK6M%2BeP4UF9xfIgoorfFELnPQSJ5AZkqk08lGER2hgLQMASdw6cohbqQGnni6F0o2AOwd5f2nVOW6ifqRbPJpa5cAezjnUvrQX2AWJonZHCG3fPFqUcppMBelL0COK1qCNVkrsF9u5fzPYewg9JQ%3D%3D'
            },
            {
              order: 3,
              id: '-NT3yQxxYkAyc3xv6rcg',
              title: '絲柏森林精油擴香瓶',
              price: 2580,
              category: '擴香瓶',
              imageUrl:
                'https://storage.googleapis.com/vue-course-api.appspot.com/margo/1688696497286.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VikcQFLCyCFJTCuBY3gGDWk9klDwZPi7FD71g8N4zruwqBssHeZn7wYVYdW%2F3kQREdVAEt2XV6a8ct1nH9ph4winK7cUHjtU7Z3OHFmBM9PgVfwbkL2K95edkYkB%2FvQA0MraDl78C0a3xrAaprjuHfwh6LLPyoN5mWpydbatyGZ4J27PsJ3SsPxEEYNCD9kJfFdyYXIAc%2B7yv%2Bx5M5jMx3w0LDoTIoR6YA3Z%2BUnpCv6V76Wt%2Fj%2Fv2RcDheA81pr8XfgHzmIK1o%2BFy9J6Sg%2BgoIiBhGG7woVar9QPyORv3JV1uw66tvNbsTlu7vCB9eb2yQb78%2F0gxabpF1wU602Ygg%3D%3D'
            }
          ]
        },
        {
          category: '當季新品',
          categoryTitle: '仲夏輕盈香氣',
          description: '乾淨、零距離的清新香味，可鹽可甜的嗅覺沁涼法',
          products: [
            {
              order: 1,
              id: '-NZa_xrvcjg_vX0hJbM_',
              title: '香柚檸檬香薰蠟燭',
              price: 2200,
              category: '蠟燭',
              imageUrl:
                'https://storage.googleapis.com/vue-course-api.appspot.com/margo/1688569509726.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=gePzPgX8rXZJoB2L%2F7RprkQ5zS4514EEdNw%2FspvNOCCkp9EIR20%2BQmCiaHqiDkJHqV1EJP74%2BhAuJOYa62jmSlXS2yw1qb08Rg0MweszVrOqS3svWw5KgMtMG%2BLV4AlBPky%2FibISYBX5d6%2Fjwxv%2BmWcl9b0raeSP%2FliY5GY3K061nnaiBKqqiEiHml9AWmwlX9wbP2Y5Zf15UqdxzkoB%2F8QgXVQanWi9Oq%2Bit4uzXdPmugK97Mj1RFO9YjtCLKisZleJjhVCglvJqpkYalLAgNVW0vo0uhzW6vRlsV%2FSELz9l2cV8pdACzYr7HQx22U87hrmKo5BnjKc%2FsaYAIpP8g%3D%3D'
            },
            {
              order: 2,
              id: '-NSylAG21UoblKCGiWCF',
              title: '恬靜鼠尾草純素居家香氛',
              price: 1280,
              category: '香氛噴霧',
              imageUrl:
                'https://storage.googleapis.com/vue-course-api.appspot.com/margo/1688636971243.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UlI7F08OC86CrFASbkKX5wyoXJpGWCDMAPXAG9wC8WiBHuuhyZ1e1aTT%2BhXyQ3HIaLIgq6cot3U9R11pfDuchbF9%2FBt1LktEu4X8dOnB1HSLFnVJfAwZGBE4sAG%2FtTH6jh6kdKbZbsaJzqxzEE4EllXS83U5GTJQ9cnyJ58v268fMf53MI1VRTd0p7oOnS9Q6phbtgW3m5QJt%2FI1ZeUi3fNEJch%2Fe4PdRxZawirfvsFSQrb1Y4h9Fdjyf9%2FjiBwDEY8HPmTbGJYICFKEjuwJ5R0LLIafETK0asWWtcC1RkhyIOkaJgWFqLXsTspcJ8y6943zXv%2FtR1dBkVeFH6ipgQ%3D%3D'
            },
            {
              order: 3,
              id: '-NYQlM7MyCLNqUr3kVJR',
              title: '酸甜番茄精油擴香瓶',
              price: 2580,
              category: '擴香瓶',
              imageUrl:
                'https://storage.googleapis.com/vue-course-api.appspot.com/margo/1688712657288.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=MAu87H541MJ1ECs9yWXt%2BkyrL%2Bbe%2BhEEwovi3KbNhkcJyU8pT0oXUHJjvKt%2BwVR3w5ly6cUDC6U1TYovgMj%2BokcyhVJIqcxVnSOD8%2BsLirlwthvkytlxkBkkhXDTTPRcMoQ9ZxrOUYH8F%2Fz2QjGBL9MM0JVw5gv8CuceN3P%2BiEAsEAaAox3%2BgutkVR41SZCZcoB3%2FM0DAxe%2B6pqqg6biMNg7Ix00W0HV0pl2upsLW9OJcPscvdXM6YSweVnELQyK8JkdWQA2jytYTEvdIK0iV4Al5Tn%2BmXcA4XZdB1myyt8qeF%2FQ7lCcvtk%2BzQfckP7BFVwhAaV7DrGPao7iT%2FiX1Q%3D%3D'
            }
          ]
        },
        {
          category: '送禮推薦',
          categoryTitle: '浪漫收藏禮盒',
          description: '精心設計禮盒與不敗香氛組合，收到就是滿滿幸福',
          products: [
            {
              order: 1,
              id: '-NSykrvOKcheww_ZgLxf',
              title: '香氣風景禮盒',
              price: 2430,
              category: '禮盒',
              imageUrl:
                'https://storage.googleapis.com/vue-course-api.appspot.com/margo/1688722268231.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Ux6HK%2F3v9hgKQwYYldxV1GnxOby0G2QG8RkZ9A01rECZCB31IE0B2AWXzzpFx8wQxjCPfB9L1%2BINl1O6kjiQ1mE3RJoUbjAuJRsaO9j57%2FVrThx7ZUKTJnElQzbwB1XLhLrsGXS6fukAcHL3Fe8I0RgHg%2Bc7mJwFcWWKxIv77k2%2F0PGih6eiiheP%2BS7E5iaaGJXPetol5uwYgSR1G1b%2FBi2bnOW%2Fq7o0GuSyGRVX7pWpoEafoNm9pTBwqUU3IXNdDbjD3%2BtMI2Ij8az78knuoGbdc6VBXZ%2BnBybZHPZktIAZJAetl9uOeMHlhiXYq1pW8kygOyLQqatKSOWYMOX9LQ%3D%3D'
            },
            {
              order: 2,
              id: '-NZirMsXs_TGRfGCaba_',
              title: '夏日三重奏蠟燭禮盒',
              price: 1990,
              category: '禮盒',
              imageUrl:
                'https://storage.googleapis.com/vue-course-api.appspot.com/margo/1688708403860.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VIHbfFW3jHrvHOdXVkYYK%2BJqRmb%2FJAhZLCAZ7TzxTqB4Kz5ciX%2F4duIc7RzMFXqwCcPoN0DYaJvvRpTb3SRrYL7DjU9r8TPCCzLAwdnvS4Yg%2BqtfChAnB0yaQSHI5XrjABwu7EPKojYRC9aeEavorwp4stdCWN04Qd4qWyBQ%2B45ue2ZDtPowefaYyjhSiRxc%2BYwiOFbRf58YKKiNGEJs2T0agNGSPYzMSlHhGWxELirzbQSKSidY6Ju%2FqxbPBA8kg1LQpqGq4j%2FswklIJUAjW14Y8p6rlF3QKsgJLeD0av2cGEX02o9KGmTmWMh%2Fmd6unozclV5iw8kDw1EYcH4qlA%3D%3D'
            },
            {
              order: 3,
              id: '-NZiXrA-sQhNjLp-DvKh',
              title: '玫瑰馬卡龍蠟燭禮盒',
              price: 2650,
              category: '禮盒',
              imageUrl:
                'https://storage.googleapis.com/vue-course-api.appspot.com/margo/1688702852824.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=WBRqCehS65yXmjqyFBA0J41MB6%2BU%2FCwJcM%2F8%2BFIqSbhmhahxQ22wU04Pi7DtHD7K8bryg9402IJuCXK%2BviuFEL3gQ5xyHS7KE3ocpR0Skclu%2BgoFdksBglbhXsWoV7VThafjtX0GCbljrLp3NYBLRI6k%2Bqw6UxdIF0w1UGuHsaZ5EaeX%2Fy%2FC%2BwuJQaucbpEfq2Qp03U4DHz8lDTaZXynbAsAbpLukQYRniVsgaeK31Z8imuedlVPk8OOgwzlPeu6%2BWANgaadVu2kMWCLzZdfQW1PSC5ZCUgEopyhahU7BlstIVhdCG7EatpZ3IMxagDbHHlEELRiiP%2BODVtdEHhQQQ%3D%3D'
            }
          ]
        }
      ],
      modules: [Pagination],
      tempCategory: { category: '熱銷商品' },
      swiper: null
    }
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
    },
    changeCategory(item) {
      this.tempCategory = { ...item }
      const index = this.pickedProducts.indexOf(item)
      this.swiper.slideTo(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.categories-item-text {
  position: relative;
  z-index: 10;
}

.product-card {
  max-width: 500px;
  margin: 0 auto;
}

.product-img {
  display: block;
  object-fit: cover;
  transition: all 300ms ease-in-out;
  &:hover {
    scale: 110%;
  }
}
</style>
