<template>
  <ul class="categories-list d-flex justify-content-center align-items-center text-body py-4">
    <li>
      <button type="button" class="categories-list-item position-relative h5 px-4 py-2 mx-2 active"><span class="categories-item-text">熱銷商品</span></button>
    </li>
    <li>
      <button type="button" class="categories-list-item position-relative h5 px-4 mx-2 py-2"><span class="categories-item-text">當季新品</span></button>
    </li>
    <li>
      <button type="button" class="categories-list-item position-relative h5 px-4 mx-2 py-2"><span class="categories-item-text">送禮推薦</span></button>
    </li>
  </ul>
</template>


<style lang="scss">


.categories-item-text{
  position: relative;
  z-index: 10;
}



</style>