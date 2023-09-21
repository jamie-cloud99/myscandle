<template>
  <div class="card border-0 bg-transparent h-100 overflow-hidden">
    <router-link to="">
     <div class="ratio ratio-1x1 overflow-hidden rounded-md">
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="product-img"
        loading="lazy"
        width="1000"
        height="1000"
      />
    </div>
    <div class="card-body pt-2 px-0 ">
      <h3 class="fs-6 mb-1">{{ item.title }}</h3>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div class="d-flex flex-column">
          <p class="">$ 599</p>
          <s class="text-secondary fs-sm align-bottom">$ 1,780</s>
        </div>
        <button type="button" class="btn btn-outline-primary rounded-sm py-1">加購</button>
      </div>
    </div>
    </router-link>
    
  </div>
</template>


<script>


export default {
  props: {
    item: Object
  }
 
}

</script>



