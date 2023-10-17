<template>
  <div class="search-block">
    <div class="search-input position-relative">
      <input type="text" class="form-control" v-model="keyword" placeholder="請輸入商品關鍵字" />
      <button
        type="button"
        class="search-btn py-0 border-start border-primary"
        @click="$emit('search', keyword)"
      >
        <i class="bi bi-search"></i>
      </button>
    </div>
    <ul class="d-flex pt-3 pb-2 flex-wrap">
      <li v-for="item in keywordList" :key="item" class="mx-1 mb-2">
        <button type="button" class="btn tag-btn" @click="$emit('search', item)">{{ item }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import productsStore from '@/stores/productsStore'

export default {
  emits: ['search'],
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    ...mapState(productsStore, ['keywordList'])
  }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';
.search-block {
  position: relative;
  width: 300px;
  height: 150px;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: $primary;
    opacity: 0.75;
    z-index: -1;
    border-radius: 0.5rem;
  }
}

.search-btn {
  position: absolute;
  top: 0;
  right: 0;
  padding-left: 10px;
  padding-right: 15px;
  width: 40px;
  height: 36px;
  line-height: 36px;
  color: $primary;
  border-radius: 0 1rem 1em 0;
  &:hover {
    background: $light;
    font-size: 18px;
  }
}

.tag-btn {
  background: $light;
  padding: 2px 8px;
  color: $primary-text-emphasis;
  &:hover,
  &:active,
  &:focus {
    opacity: 0.8;
    background: $light;
  }
}
</style>
