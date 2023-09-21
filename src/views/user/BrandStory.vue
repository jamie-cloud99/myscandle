<template>
  <div class="container pt-xl pb-5 px-4">
    <div class="position-relative">
      <img class="d-block brand-bn object-fit-cover" src="/images/others/brand.jpg" alt="MyS品牌故事">
      <div class="bg-overlay position-absolute"></div>
      <div class="position-absolute top-50 start-50 translate-middle">
        <h1 class=" text-center h2 fw-bold mb-2 text-light"><span class="font-galada">MyS</span> 品牌故事</h1>
        <h2 class="text-center h3 fw-medium mb-3 text-light text-opacity-85">舒適溫馨的瑞典哲學</h2>
      </div>
    </div>
    <article class="mt-5">
      
      <h3 class="text-center h5 fw-bold mb-5 text-opacity-75">北歐秘境傳來的香氣，帶你享受心靈與感官的奇妙之旅。</h3>
      <div class="content lh-lg">
        <div class="row mb-5 justify-content-center row-gap-3 align-items-start">
          <div class="col-md-6 col-lg-5">
            <p class="mb-4">
              在瑞典語中，"Mys" 意味舒適、溫馨的氛圍，是瑞典人生活中極其重要的哲學。每當你點燃 Mys
              的蠟燭，一切煩憂都將隨著香氛消散，只剩下愜意與歡樂。這種簡簡單單的時光，正是最美好的
              mys 時刻。
            </p>
            <p>
              每一瓶 Mys
              香氛都是歐陸頂級調香師親自調配的心血。他們將瑞典的自然美景和瑞典人內在的生活哲學融入香氛的每一個層次，使香氣包裹你的記憶，帶你走近瑞典的自然森林，感受四季交替中的美好時光。
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
        <div class="row mb-5 flex-row-reverse justify-content-center row-gap-3 align-items-start">
          <div class="col-md-6 col-lg-5">
            <p class="mb-4">
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

        <div class="row mb-5 justify-content-center row-gap-3 align-items-start">
          <div class="col-md-6 col-lg-5">
            <p class="mb-4">
              Mys
              香氛，不僅僅是一個品牌，更是一種生活態度。我們希望透過這份香氣，讓人們重拾對細緻生活的熱愛，找回內心的平和自在。
            </p>
            <p class="mb-4">
              在這個瞬息萬變的世界裡，Mys
              希望能陪伴你，帶給你一份來自瑞典的舒適溫馨哲學，讓每個瞬間都成為最美好的 mys 時光。
            </p>
            <router-link class="btn btn-outline-primary fw-semibold"  to="/shop">尋找你的命定香氛<i class="bi bi-arrow-up-right ms-2 align-middle"></i></router-link>
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


<style lang="scss">
.bg-overlay {
  inset: 0;
  background: rgba( #000000, 0.4);
}

.brand-bn {
  width: 100%;
  max-height: 300px;
}

.brand-img {
  width: 100%;
  max-height: 400px;
  @include desktop {
    max-height: 300px;
  }
}

.text-opacity-75 {
  opacity: 0.75;
}

.text-opacity-85 {
  opacity: 0.85;
}
</style>
