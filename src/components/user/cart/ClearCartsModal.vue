<template>
  <div
    ref="modal"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content bg-light">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            確定要清空購物車嗎？
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          購物車清空後將無法復原，確定要永久刪除？
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('confirm-clear')"
          >
            清空購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '../../../mixins/modalMixin'


export default {
  emits: ['confirm-clear'],

  mixins: [modalMixin],

}
</script>