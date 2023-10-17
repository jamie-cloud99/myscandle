<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item mx-2" :class="{ disabled: !pages.has_pre }">
        <RouterLink
          class="page-link rounded-sm"
          to="#"
          aria-label="Previous"
          @click.prevent="$emit('change-page', items, pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </RouterLink>
      </li>
      <li
        class="page-item mx-2"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <RouterLink
          class="page-link rounded-sm"
          to="#"
          @click.prevent="$emit('change-page', items, page)"
          >{{ page }}</RouterLink
        >
      </li>

      <li class="page-item mx-2" :class="{ disabled: !pages.has_next }">
        <RouterLink
          class="page-link rounded-sm"
          to="#"
          aria-label="Next"
          @click.prevent="$emit('change-page', items, pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </RouterLink>
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
