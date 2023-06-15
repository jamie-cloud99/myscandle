<template>
  <img class="shop-bn-img object-fit-cover" src="src/assets/images/shop/shop-bn.png" alt="" />
  <div class="container mt-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/shop">商品一覽</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">所有商品</li>
      </ol>
    </nav>
    <div class="overflow-hidden my-5">
      <div class="row gx-5">
        <div class="col-md-3">
          <ul class="list-group">
            <li class="list-group-item active" aria-current="true">所有商品</li>
            <li class="list-group-item">香薰蠟燭</li>
            <li class="list-group-item">擴香瓶</li>
            <li class="list-group-item">香氛噴霧</li>
            <li class="list-group-item">融蠟燈</li>
          </ul>
        </div>
        <div class="col-md-9">
          <div class="overflow-hidden">
            <div class="row gy-4">
            <div class="col-md-6 col-lg-4" v-for="i in 10" :key="'i'+ i">
              <ProductCard></ProductCard>
            </div>
            <div class="d-flex justify-content-center">
              <PageComponent></PageComponent>
            </div>
            
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.shop-bn-img {
  min-height: 300px;
  max-height: 350px;
  width: 100vw;
  object-position: 60% bottom;
}
</style>


<script>
import ProductCard from "../../components/user/shop/ProductCard.vue"
import PageComponent from "../../components/user/shop/PageComponent.vue"

export default{
  components: {
    ProductCard,
    PageComponent
  }
}
</script>
