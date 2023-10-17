<template>
  <div class="container-fluid container-lg pt-5 pt-lg-xl px-0 px-lg-4">
    <div class="position-relative">
      <img
        class="d-block banner-img object-fit-cover"
        :src="content.imgUrl"
        :alt="`MyS${content.title}`"
        referrerpolicy="no-referrer"
      />
      <div class="bg-overlay position-absolute"></div>
      <div class="banner-content position-absolute top-50 start-50 translate-middle">
        <h1 class="text-center h2 fw-bold mb-3 text-light">{{ content.title }}</h1>
        <h2 class="text-center fs-5 fs-lg-3 fw-medium text-light text-opacity-85">
          {{ content.subtitle }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: Object
  }
}
</script>

<style lang="scss" scoped>
.bg-overlay {
  inset: 0;
  background: rgba(#000000, 0.4);
}

.banner-img {
  width: 100%;
  height: 200px;
  @include pad {
    height: 300px;
  }
}

.banner-content {
  width: 300px;
  @include desktop {
    width: 800px;
  }
}
.text-opacity-85 {
  opacity: 0.85;
}
</style>
