<template>
  <CustomBanner :content="banner" />
  <div class="container pb-lg-5 px-4">
    <article class="mt-5">
      <h3 class="text-md-center h5 fw-bold mb-3 mb-lg-5 text-opacity-75">
        北歐秘境傳來的香氣，帶你享受心靈與感官的奇妙之旅。
      </h3>
      <div class="content lh-lg">
        <div class="row mb-3 mb-lg-5 justify-content-center row-gap-3 align-items-start">
          <div class="col-md-6 col-lg-5">
            <p class="mb-2 mb-lg-4">
              在瑞典語中，"Mys" 意味舒適、溫馨的氛圍，是瑞典人生活中極其重要的哲學。每當你點燃 Mys
              的蠟燭，一切煩憂都將隨著香氛消散，只剩下愜意與歡樂，正是最美好的 mys 時刻。
            </p>
            <p>
              每個 Mys
              香氛都是歐陸頂級調香師親自調配的心血。我們融入瑞典的自然美景和生活哲學，使香氣包裹你的記憶，帶你走近瑞典森林，感受四季交替中的美好時光。
            </p>
          </div>
          <div class="col-md-6 col-lg-5">
            <img
              class="brand-img object-fit-cover"
              src="/images/others/brand-1.jpg"
              alt=" Mys香氛來自瑞典的生活哲學"
            />
          </div>
        </div>
        <div
          class="row mb-3 mb-lg-5 flex-row-reverse justify-content-center row-gap-3 align-items-start"
        >
          <div class="col-md-6 col-lg-5">
            <p class="mb-2 mb-lg-4">
              除了香氛的溫暖魔力，Mys
              也將質感美學融入每一個產品設計。我們的蠟燭不僅是香氛產品，更是居家擺設的藝術品，讓美麗成為你的日常。
            </p>
            <p>
              不止於此，Mys
              香氛堅持純素成分，用天然植物蠟和植萃精油取代人工香精，讓香味保持清新自然。我們深知，環保永續是我們的責任，因此特別設計了可重複使用的環保罐裝，為未來世代保留一片美好的家園。
            </p>
          </div>
          <div class="col-md-6 col-lg-5">
            <img
              class="brand-img object-fit-cover"
              src="/images/others/brand-2.jpg"
              alt="Mys香氛堅持純素成分"
            />
          </div>
        </div>

        <div class="row mb-3 mb-lg-5 justify-content-center row-gap-3 align-items-start">
          <div class="col-md-6 col-lg-5">
            <p class="mb-2 mb-lg-4">
              Mys
              香氛，不僅僅是一個品牌，更是一種生活態度。我們希望透過這份香氣，讓人們重拾對細緻生活的熱愛，找回內心的平和自在。
            </p>
            <p class="mb-2 mb-lg-4">
              在這個瞬息萬變的世界裡，Mys
              希望能陪伴你，帶給你一份來自瑞典的舒適溫馨哲學，讓每個瞬間都成為最美好的 mys 時光。
            </p>
            <RouterLink class="btn btn-outline-primary fw-semibold" to="/shop"
              >尋找你的命定香氛<i class="bi bi-arrow-up-right ms-2 align-middle"></i
            ></RouterLink>
          </div>
          <div class="col-md-6 col-lg-5">
            <img
              class="brand-img object-fit-cover"
              src="https://i.imgur.com/lS9nCWy.jpg"
              alt="美好的 mys 時光"
              referrerpolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import CustomBanner from '@/components/user/others/CustomBanner.vue'

export default {
  components: {
    CustomBanner
  },
  data() {
    return {
      banner: {
        title: '品牌故事',
        subtitle: ' 瑞典人的 mys 哲學',
        imgUrl: 'https://i.imgur.com/Y02ej83.jpg'
      }
    }
  }
}
</script>

<style lang="scss">
.brand-img {
  width: 100%;
  height: 400px;
  @include pad {
    height: 300px;
  }
}

.text-opacity-75 {
  opacity: 0.75;
}
</style>
