<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item mx-2" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link rounded-sm"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('change-page', pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item mx-2"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link rounded-sm" href="#" @click.prevent="$emit('change-page', page)">{{
          page
        }}</a>
      </li>

      <li class="page-item mx-2" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link rounded-sm"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('change-page', pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
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
