<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <VForm v-slot="{ errors }">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="customFile" class="form-label"
                    >商品首圖
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input
                    @change="uploadImage"
                    ref="fileInput"
                    type="file"
                    id="customFile"
                    class="form-control border"
                  />
                </div>
                <div class="mb-3">
                  <label for="customFile" class="form-label"
                    >其他圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input
                    @change="uploadImage"
                    ref="fileInput"
                    type="file"
                    id="customFile"
                    class="form-control border"
                  />
                </div>
                <img class="img-fluid" alt="" />
                <!-- 延伸技巧，多圖 -->
                <div class="mt-5">
                  <div class="mb-3 input-group">
                    <input type="url" class="form-control border" placeholder="請輸入連結" />
                    <button type="button" class="btn btn-outline-danger">移除</button>
                  </div>
                  <div>
                    <button class="btn btn-outline-primary btn-sm d-block w-100">新增圖片</button>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label"
                    >商品名稱<span class="text-danger">*</span></label
                  >
                  <VField
                    name="商品名稱"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control border"
                    id="title"
                    rules="required"
                    placeholder="請輸入商品名稱"
                    :class="{ 'is-invalid': errors['商品名稱'] }"
                  >
                  </VField>
                  <ErrorMessage name="商品名稱" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label"
                      >商品類別<span class="text-danger">*</span></label
                    >
                    <VField
                      name="商品類別"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control border"
                      id="category"
                      rules="required"
                      placeholder="請輸入商品類別"
                      :class="{ 'is-invalid': errors['商品類別'] }"
                    >
                    </VField>
                    <ErrorMessage name="商品類別" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="unit" class="form-label"
                      >單位<span class="text-danger">*</span></label
                    >
                    <VField
                      name="單位"
                      v-model="tempProduct.unit"
                      type="text"
                      class="form-control border"
                      id="unit"
                      rules="required"
                      placeholder="請輸入單位"
                      :class="{ 'is-invalid': errors['單位'] }"
                    >
                    </VField>
                    <ErrorMessage name="單位" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label"
                      >原價<span class="text-danger">*</span></label
                    >
                    <VField
                      name="原價"
                      v-model.number="tempProduct.origin_price"
                      type="number"
                      class="form-control border"
                      id="origin_price"
                      placeholder="請輸入原價"
                      rules="required"
                      :class="{ 'is-invalid': errors['原價'] }"
                    >
                    </VField>
                    <ErrorMessage name="原價" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label"
                      >售價<span class="text-danger">*</span></label
                    >
                    <VField
                      name="售價"
                      v-model.number="tempProduct.price"
                      type="number"
                      class="form-control border"
                      id="price"
                      placeholder="請輸入售價"
                      rules="required"
                      :class="{ 'is-invalid': errors['售價'] }"
                    >
                    </VField>
                    <ErrorMessage name="售價" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <hr />
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control border"
                    id="description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control border"
                    id="content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                      :checked="Boolean(is_enabled)"
                    />
                    <label class="form-check-label" for="is_enabled"> 啟用商品 </label>
                  </div>
                </div>
              </div>
            </div>
          </VForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', tempProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    },
    isNew: {
      type: Boolean
    }
  },
  data() {
    return {
      modal: {},
      tempProduct: {}
    }
  },
  watch: {
    product() {
      this.tempProduct = this.product
    }
  },
  methods: {
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
