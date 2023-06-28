<template>
  <router-link :to="`/product/${product.id}`" class="card border-0 bg-transparent h-100 overflow-hidden">
    <div class="ratio ratio-1x1">
      <img :src="product.imageUrl" :alt="product.title" class="product-img rounded-md" loading="lazy" width="1000" height="1000"/>
    </div>   
    <div class="card-body pt-3 pb-0">
      <h3 class="fs-6 mb-1">{{ product.title }}</h3>
      <div class="d-flex align-items-center mb-2">
        <p class="align-baseline">NT$ {{ $format.currency(product.price) }}
          <s class="text-secondary fs-sm ms-2 align-baseline">NT$ {{ $format.currency(product.origin_price) }}</s>
        </p>
        
      </div>
    </div>
    <div class="card-footer bg-transparent border-0">
      <button type="button" class="btn btn-outline-primary w-100 rounded-sm px-3">加入購物車</button>
    </div>
  </router-link>
</template>

<script> 
export default {
  props: ['product']
}

</script>

<style lang="scss">
.product-img{
  object-fit: cover;
}
</style>
