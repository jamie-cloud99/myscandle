<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb mb-0">
      <li
        v-for="(item, index) in navList"
        :key="item.title"
        class="breadcrumb-item"
        :class="{ active: index === navList.length - 1 }"
      >
        <RouterLink :to="item.path">{{ item.title }}</RouterLink>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    navList: Array
  }
}
</script>
