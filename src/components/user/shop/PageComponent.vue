<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item mx-2" :class="{ disabled: !pages.has_pre }">
        <button
          class="page-link rounded-sm"
          type="button"
          aria-label="Previous"
          @click="$emit('change-page', items, pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li
        class="page-item mx-2"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <button
          class="page-link rounded-sm"
          type="button"
          @click="$emit('change-page', items, page)"
          >{{ page }}</button
        >
      </li>

      <li class="page-item mx-2" :class="{ disabled: !pages.has_next }">
        <button
          class="page-link rounded-sm"
          type="button"
          aria-label="Next"
          @click="$emit('change-page', items, pages.current_page + 1)"
        >
          <span aria-hidden="true" class="d-block">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages', 'items'],
  emits: ['change-page']
}
</script>
