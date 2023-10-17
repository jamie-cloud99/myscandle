<template>
  <div class="subtitle py-5 mb-5">
    <h3 class="value-title text-light align-middle">Our Value</h3>
  </div>

  <ul class="row border-top border-bottom border-primary border-opacity-50 my-md-3">
    <li
      data-aos="fade-up"
      data-aos-delay="250"
      class="col-md-3 value-item border-md-end border-bottom-lg-none border-primary border-opacity-50"
      v-for="item in features"
      :key="item.title"
    >
      <div class="value-content px-3 py-4">
        <p class="fs-4 mb-4"><i class="bi" :class="item.icon"></i></p>
        <h4 class="fs-md fw-bold mb-3">{{ item.title }}</h4>
        <p>{{ item.description }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          title: '天然純素',
          description: '我們選用天然植物蠟、植萃精油取代人工香精，香味清新無負擔',
          icon: 'bi-flower2'
        },
        {
          title: '環保永續',
          description: '可重複使用環保罐裝，愛護地球資源',
          icon: 'bi-tree-fill'
        },
        {
          title: '質感美學',
          description: '優雅設計，可當作居家擺設，讓美麗成為日常',
          icon: 'bi-balloon-heart-fill'
        },
        {
          title: '手工製造',
          description: '法國頂級調香師親自調配，舒服層次令人眷戀',
          icon: 'bi-droplet-half'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.subtitle {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://i.imgur.com/sXAeKug.jpg'), url('../images/feature/value.jpg');
  background-attachment: fixed;

  border-radius: 3rem 0 3rem 0;
}

.border-bottom-lg-none:not(:last-of-type) {
  border-bottom: 1px solid #000;
  @include pad {
    border-bottom: 0;
  }
}

.border-md-end:not(:last-of-type) {
  @include pad {
    border-right: 1px solid black;
  }
}

.value-item {
  cursor: pointer;
  &:nth-child(odd) {
    background: $light;
    // &:hover {
    //   background: $light;
    // }
  }
  &:nth-child(even) {
    background: $red-brown-30;
  }
  &:hover {
    background: $red-brown;
    color: $light;
  }
}
</style>
