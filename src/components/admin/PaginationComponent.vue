<template>
  <nav aria-label="Page navigation" class="mb-5">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('change-page', pages.current_page - 1)"
        >
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="$emit('change-page', page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('change-page', pages.current_page + 1)"
        >
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  emits: ['change-page']
}
</script>

<style lang="scss" scoped>
.bi::before {
  line-height: 1;
  vertical-align: middle;
}
.page-item:first-of-type .page-link {
  border-radius: 0.35rem 0 0 0.35rem;
}

.page-item:last-of-type .page-link {
  border-radius: 0rem 0.35rem 0.35rem 0;
}
</style>
