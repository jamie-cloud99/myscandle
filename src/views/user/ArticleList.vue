<template>
  <div class="container pt-5">
    <div class="py-5">
      <div class="d-sm-flex justify-content-between align-items-center mb-3 mb-md-5">
        <BreadcrumpComponent :nav-list="breadList" class="order-2 mb-4 mb-sm-0" />
        <div class="position-relative w-fit">
          <h1 class="h2 fw-semibold d-inline-block">香氛研究室</h1>
          <div class="decorate-circle"></div>
        </div>
      </div>
      <div class="overflow-hidden">
        <ol>
          <li v-for="(item, index) in articleList" :key="item.id" class="d-md-flex">
            <p class="h1 fw-bold me-4 my-3">{{ index + 1 }}.</p>
            <div class="card bg-light overflow-hidden">
              <div class="row g-0">
                <div class="col-md-4 col-lg-2">
                  <img
                    :src="item.imgUrl"
                    class="article-img img-fluid rounded-start"
                    :alt="item.title"
                    referrerpolicy="no-referrer"
                  />
                </div>
                <div class="col-md-8 col-lg-10">
                  <div class="card-body">
                    <RouterLink :to="{ path: `/articles/${item.id}`, query: { title: item.title } }"
                      ><h5 class="card-title fw-bold">{{ item.title }}</h5></RouterLink
                    >
                    <p class="card-text">
                      {{ item.discription }}
                    </p>
                    <div class="d-flex justify-content-between">
                      <p class="card-text">
                        <small class="text-body-secondary">Last updated 3 days ago</small>
                      </p>
                      <RouterLink
                        :to="{ path: `/articles/${item.id}`, query: { title: item.title } }"
                        class="more-link"
                        >More<i class="bi bi-arrow-up-right ms-1 align-middle"></i
                      ></RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import BreadcrumpComponent from '@/components/user/layout/BreadcrumpComponent.vue'
export default {
  components: {
    BreadcrumpComponent
  },
  data() {
    return {
      articleList: [
        {
          id: 1,
          title: '挑選香氛蠟燭的完美指南',
          discription:
            '香氛蠟燭自古以來一直以它們獨特的魅力，為人們的生活和環境增添了一絲神秘的情感。在選擇香氛蠟燭之前，首先要考慮以下三點：香氣的目的、場合和情境及個人喜好。本文將提供一個完美的指南，以幫助您挑選最適合您需求的香氛蠟燭。',
          imgUrl: 'https://i.imgur.com/iojQpCs.jpg'
        },
        {
          id: 2,
          title: '香氛怎麼挑：香薰蠟燭、擴香瓶還是噴霧，哪一種最適合您的生活？',
          discription:
            '當您想要給家裡或辦公室增添一點香氣，應該怎麼選擇呢？想知道如何在香氛蠟燭、擴香瓶和香氛噴霧之間進行選擇，以滿足您的生活方式和喜好嗎？無論您是一個喜歡浪漫氛圍的浪漫主義者，還是忙碌的專業人士需要一種方便的選擇，讓我們一起探索如何找到最適合您的香氛，讓您的生活充滿愉悅的香味！',
          imgUrl: 'https://i.imgur.com/bfE7XDT.jpg'
        },
        {
          id: 3,
          title: '點燃秋冬魔法：家中香氛搭配讓您愛上冷天',
          discription:
            '秋冬季節是營造舒適家居氛圍的理想時機。透過香氛，您可以為您的家增添溫暖和美好的氛圍。我們將向您介紹一系列令人著迷的秋冬香氛，並提供有關如何將它們與家中擺設和裝飾相協調的實用建議。無論您是喜歡溫暖香料香氛的人，還是更傾向於清新冷冽的氛圍，我們都將幫助您在寒冷的日子中創建一個煥然一新的、充滿魔力的家居環境。',
          imgUrl: 'https://i.imgur.com/hrDjPGg.jpg'
        },
        {
          id: 4,
          title: '香氣交織的藝術：如何聰明地混合不同香氛',
          discription:
            '香氛混用是一種獨特而有趣的方式，可以打造出個人獨特的氛圍，但這也需要一些技巧。我們將分享如何聰明地混合不同類型的香氛，包括香水、蠟燭、擴香瓶等，以創造出一個令人陶醉的香氛環境。無論您是追求柔和的花香混合還是大膽的香辛料組合，我們將揭示香氛混用的秘訣，幫助您成為自家香氛的大師。',
          imgUrl: 'https://i.imgur.com/nHmVNsG.jpg'
        },
        {
          id: 5,
          title: '更接近大自然的呼吸—為何你應該使用純素香氛？',
          discription:
            '在現代生活中，我們常常追求簡單、自然和健康的選擇。純素香氛不僅關乎個人護膚和香氛體驗，更關心地球的永續和動植物的福祉。想知道它們如何與大自然和環境保護產生聯繫，以及如何讓您的美麗與倫理和環保相得益彰嗎？讓我們向您說一個關於重新連接自然，並做出更好選擇的故事。',
          imgUrl: 'https://i.imgur.com/oVpatMJ.jpg'
        }
      ],
      breadList: [
        {
          path: '/',
          title: '首頁'
        },
        {
          path: '/articles',
          title: '香氛研究室'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '../../assets/helpers/variables';
.article-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  max-height: 300px;
  @include desktop {
    max-height: 200px;
  }
}

.card-title {
  &:hover,
  &:active {
    opacity: 0.8;
  }
}

.card-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.more-link {
  &:hover,
  &:active {
    color: $primary;
    i::before {
      transform: translate(5px, -5px);
    }
  }
}
</style>
