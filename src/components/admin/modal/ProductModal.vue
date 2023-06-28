<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-light">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close border-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <VForm v-slot="{ errors }" @submit="comfirmSubmit(tempProduct)">
          <div class="modal-body">
            <div class="row">
              <div class="col-12 mb-3">
                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
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
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label"
                      >商品類別<span class="text-danger">*</span></label
                    >
                    <VField
                      name="商品類別"
                      v-model="tempProduct.category"
                      as="select"
                      class="form-select border"
                      id="category"
                      rules="required"
                      placeholder="請輸入商品類別"
                      :class="{ 'is-invalid': errors['商品類別'] }"
                    >
                      <option class="text-secondary fs-sm" value="">請選擇類別</option>
                      <option class="" :value="item" v-for="item in categoryList" :key="item">{{ item }}</option>
                    </VField>
                    <ErrorMessage name="商品類別" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="row gx-2">
                  <div class="mb-3 col-md-4">
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
                  <div class="mb-3 col-md-4">
                    <label for="origin_price" class="form-label"
                      >定價<span class="text-danger">*</span></label
                    >
                    <VField
                      name="定價"
                      v-model.number="tempProduct.origin_price"
                      type="number"
                      class="form-control border"
                      id="origin_price"
                      placeholder="請輸入定價"
                      :rules="isPrice"
                      :class="{ 'is-invalid': errors['定價'] }"
                    >
                    </VField>
                    <ErrorMessage name="定價" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="mb-3 col-md-4">
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
                      :rules="isCheaperPrice"
                      :class="{ 'is-invalid': errors['售價'] }"
                    >
                    </VField>
                    <ErrorMessage name="售價" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <hr />
                <div class="row gx-2">
                  <div class="mb-3 col-sm-6">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea
                      v-model="tempProduct.description"
                      type="text"
                      class="form-control border"
                      id="description"
                      placeholder="請輸入產品描述"
                    ></textarea>
                  </div>
                  <div class="mb-3 col-sm-6">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea
                      v-model="tempProduct.content"
                      type="text"
                      class="form-control border"
                      id="content"
                      placeholder="請輸入產品說明內容"
                    ></textarea>
                  </div>
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
                      :checked="Boolean(tempProduct.is_enabled)"
                    />
                    <label class="form-check-label" for="is_enabled"> 啟用商品 </label>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="mb-3">
                  <label for="customFile" class="form-label"
                    >商品首圖
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input
                    @change="uploadImage(1)"
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
                    v-for="i in 5"
                    :key="'i' + i"
                    @change="uploadImage(i)"
                    ref="otherInput"
                    type="file"
                    id="customFile"
                    class="form-control border mb-2"
                  />
                </div>
                <img class="img-fluid" :alt="tempProduct.title" :src="tempProduct.imageUrl" />
                <div class="mt-5">
                  <h3 class="text-secondary fs-6 mb-3">圖片上傳限制</h3>
                  <ul class="text-secondary">
                    <li class="fs-sm pb-1">1. 圖片長寬須小於 1024 * 1024 px</li>
                    <li class="fs-sm pb-1">2. 圖片大小須小於 1 MB</li>
                    <li class="fs-sm pb-1">3. 圖片格式僅限 jpg、jpeg 與 png</li>
                    <li class="fs-sm pb-1">4. 檔案名稱須小於 32 個字元</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="submit" class="btn btn-primary">確認</button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '../../../mixins/modalMixin'

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
  emits: ['update-product'],
  mixins: [modalMixin],

  data() {
    return {
      tempProduct: {},
      categoryList: ['香薰蠟燭', '擴香瓶', '香氛噴霧', '精緻禮盒']
    }
  },
  watch: {
    product() {
      this.tempProduct = this.product
    }
  },
  methods: {
    isPrice(num) {
      const priceRegex = /^[0-9]+$/
      return !priceRegex.test(num) ? '售價請輸入正整數' : true
    },
    isCheaperPrice(num) {
      const priceRegex = /^[0-9]+$/
      if (!priceRegex.test(num)) return '售價請輸入正整數'
      if (this.tempProduct.price > this.tempProduct.origin_price) return '售價不得高於定價'
      return true
    },
    comfirmSubmit(values) {
      this.$emit('update-product', values)
    },

    uploadImage(order) {
      if (order === 1) {
        const img = this.$refs.fileInput.files[0]
        const formData = new FormData()
        formData.append('file-to-upload', img)
        const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/upload`
        this.$http.post(api, formData).then((res) => {
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl
            this.imgRendered = res.data.imageUrl
          }
        })
      } else {
        const img = this.$refs.otherInput.files[0]
        const formData = new FormData()
        formData.append('file-to-upload', img)

        const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/upload`
        this.$http.post(api, formData).then((res) => {
          if (res.data.success) {
            this.tempProduct.imageUrls[order] = res.data.imageUrl
          }
        })
      }
    }
  }
}
</script>
