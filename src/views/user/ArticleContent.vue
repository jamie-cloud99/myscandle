<template>
  <div class="container pt-5">
    <div class="py-5">
      <div class="d-lg-flex justify-content-between align-items-center mb-3 mb-md-4">
        <BreadcrumpComponent :nav-list="breadList" class="order-2 mb-4 mb-lg-0" />
        <div class="position-relative w-fit">
          <h1 class="h2 fw-semibold d-inline-block">挑選香氛蠟燭的完美指南</h1>
          <div class="decorate-circle"></div>
        </div>
      </div>

      <div class="d-flex">
        <div class="col-md-7">
          <div class="content">
            <img
              class="banner-img"
              src="https://i.imgur.com/iojQpCs.jpg"
              alt="挑選香氛蠟燭的完美指南"
            />
            <p>
              香氛蠟燭自古以來一直以它們獨特的魅力，為人們的生活和環境增添了一絲神秘的情感。無論是用於緩解壓力、營造浪漫氛圍，還是為家居增添個性化的氛圍，香氛蠟燭都有著無限的魅力。然而，在市場上，有著各種各樣的香氛蠟燭可供選擇，所以如何挑選合適的蠟燭成了一個重要問題。本文將提供一個完美的指南，以幫助您挑選最適合您需求的香氛蠟燭。
            </p>
            <h2>一、理解自己的需求</h2>
            <p>在選擇香氛蠟燭之前，首先要明確您的需求。考慮以下因素：</p>
            <ol>
              <li>A. 香氣的目的：您是想要放鬆身心、提高專注力，還是營造浪漫氛圍？</li>
              <li>B. 場合和情境：您是要在家中使用，還是作為禮物送給他人？</li>
              <li>C. 個人喜好：您喜歡哪種香味，是果香、花香、木香還是香辛料香？</li>
            </ol>
            <img
              src="https://images.unsplash.com/photo-1557761830-8d36eedd1718?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070"
              alt=""
            />
            <h2>二、香氛蠟燭的成分</h2>
            <p>香氛蠟燭的成分 了解蠟燭的成分對於選擇合適的香氛至關重要。主要包括：</p>
            <ol>
              <li>
                A.
                蠟燭基礎材料：蠟燭通常由大豆蠟、棕櫚蠟、蜂蠟等製成，每種蠟燭基礎材料都有不同的特性。
              </li>
              <li>B. 香氣成分：不同的蠟燭可能包含多種香氣成分，您可以查看標籤以瞭解具體成分。</li>
              <li>
                C.
                顏色與外觀：蠟燭的外觀也是選擇的一部分，您可以根據房間的風格和個人喜好來選擇顏色和外觀。
              </li>
            </ol>
            <img
              src="https://images.unsplash.com/photo-1602409339188-95d178a611a0?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2069"
              alt=""
            />
            <h2>三、選擇合適的香氣</h2>
            <p>
              了解不同的香調對於挑選香氛蠟燭至關重要。一些常見的香調包括花香、水果香、木香和香辛料香。選擇時，要考慮香調是否符合您的需求，例如，對於提高專注力，您可以選擇薰衣草或檀香等香調。此外，也要關注品牌和品質，以確保您購買的香氛蠟燭具有良好的香味。
            </p>
            <h2>四、考慮安全因素</h2>
            <p>
              蠟燭的種類和使用方式也是重要的考慮因素。確保您購買的蠟燭符合安全標準，並適用於您的使用場合。另外，蠟燭的點燃和熄滅需要謹慎操作，以確保安全。品質通常與價格有關，但不是唯一的因素。品牌的信譽也很重要，因此在選購蠟燭時，要查閱評價和評論，以了解其他消費者的經驗。
            </p>
            <img
              src="https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070"
              alt=""
            />
            <h2>五、香氛蠟燭的保養和使用</h2>
            <p>
              一旦選擇了合適的香氛蠟燭，還需要知道如何正確地使用和保養它們。這包括點燃方式、控制燃燒時間，以及存放和保養方法。
            </p>
            <h2>六、結語</h2>
            <p>
              香氛蠟燭是一種能為我們的生活和空間增添美好氛圍的產品。通過理解自己的需求、選擇合適的香氣，考慮安全和品質，以及正確的使用和保養，您可以挑選到完美的香氛蠟燭，享受一種優雅的生活方式。希望這個指南對您有所幫助，讓您能夠充分享受香氛蠟燭的療癒和愉悅。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadcrumpComponent from '@/components/user/layout/BreadcrumpComponent.vue'
export default {
  components: {
    BreadcrumpComponent
  },
  data() {
    return {
      breadList: [
        {
          path: '/',
          title: '首頁'
        },
        {
          path: '/articles',
          title: '香氛研究室'
        },
        {
          path: '/articles/1',
          title: '挑選香氛蠟燭的完美指南'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-img {
  object-fit: cover;
  display: block;
  aspect-ratio: 16 / 9;
  margin: 1rem 0;
}

.content {
  h2 {
    font-size: 1.25rem;
    margin: 1rem 0;
  }
  p {
    margin-bottom: 0.5rem;
  }

  img {
    margin: 1rem 0;
    display: block;
    object-fit: cover;
  }
}
</style>
