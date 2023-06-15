<template>
  
  <div class="banner position-relative">
    <img :src="banner.imgUrl" :alt="banner.title" class="d-block banner-img">
    <div class="banner-slogan position-absolute rounded-md">
      <h2 class="slogan-text text-light px-5 py-4 lh-normal">宛若仙境的清新空氣</h2>
      <button type="button" class="slogan-btn btn btn-light rounded-md px-4 ms-5 mb-3">探索香氛</button>
    </div>
  </div>
  <!-- 查看更多 動畫 -->
  <div class="container">

    <div class="pt-5 mt-5">
      <AboutUs></AboutUs>
    </div>
    <div class="pt-5 mt-5">
      <SpecialCategories></SpecialCategories>
    </div>
    <div class="pt-5">
      <HotProducts></HotProducts>
    </div>
    <div class="pt-5 mt-5">
      <OurFeatures></OurFeatures>
    </div>

    <div class="mt-5">
      <!-- 需替換 -->
      <!-- <img src="src/assets/images/quiz/quiz2.png" alt=""> -->
    </div>
    
    
  </div>
  
</template>


<script>
import SpecialCategories from '../../components/user/home/SpecialCategories.vue';
import HotProducts from '../../components/user/home/HotProducts.vue';
import AboutUs from '../../components/user/home/AboutUs.vue';
import OurFeatures from '../../components/user/home/OurFeatures.vue';

export default{
  components:{
    SpecialCategories,
    HotProducts,
    AboutUs,
    OurFeatures
  },
  data(){
    return{
      banner: {
        imgUrl: '/src/assets/images/banner/main.jpg',
        title: '呼吸，每一口都香甜純粹-mys'
      },
      SpecialCategories: [
        {
          title: '經典從容香調',
          description: '百年時光錘鍊，溫柔香氣縈繞鼻息，戒不掉的經典好味',
          category: '熱銷商品',
        },
        {
          title: '綻放仲夏情調',
          description: '月光下茉莉，伴隨夏的奇思妙想迷人綻放',
          category: '當季新品',
        },
        {
          title: '浪漫收藏禮盒',
          description: '精心設計的包裝禮盒，與不敗香氛組合，傳遞你分享幸福的喜悅',
          category: '送禮推薦',
        }
      ],
      products: [

      ]
    }
  }

}

</script>


<style lang="scss">



.banner-img{
  min-height: 500px;
  object-position: 60% 50%;
  object-fit: cover;
}

.banner-slogan{
  top: 50%;

  transform: translateY(-50%);
  backdrop-filter: blur(1.5px);
  line-height: 1.5;

  @include pad{
    right: 5rem;
  }
  @include desktop{
    right: 8rem;
  }
}

.slogan-text{
  letter-spacing: 0.05rem;
  font-weight: bolder;
  @include pad{
    font-size: 2.5rem;
  }
}

.slogan-btn{
  font-weight: bold;
  @include pad{
    font-size: 1.5rem;
  }
}

</style>
