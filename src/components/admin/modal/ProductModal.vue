<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-light">
          <h2 class="modal-title h5" id="productModalLabel">
            <span>編輯產品資料</span>
          </h2>
          <button
            type="button"
            class="btn-close border-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <VForm ref="productForm" v-slot="{ errors }" @submit="comfirmSubmit(tempProduct)">
          <div class="modal-body">
            <div class="mb-3">
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
                    <option class="" :value="item" v-for="item in categoryList" :key="item">
                      {{ item }}
                    </option>
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
              <div class="row gx-2">
                <div class="mb-3 col-sm-6">
                  <label for="note" class="form-label">香調</label>
                  <select
                    v-model="tempProduct.notes"
                    type="text"
                    class="form-select border"
                    id="note"
                  >
                    <option class="text-secondary fs-sm" value="" disabled>請選擇香調</option>
                    <option :value="item" v-for="item in notesList" :key="item"> {{ item }}</option>
                </select>
                </div>
                <div class="mb-3 col-sm-6">
                  <label for="specifications" class="form-label">商品規格</label>
                  <textarea
                    v-model="tempProduct.specifications"
                    type="text"
                    class="form-control border"
                    id="specifications"
                    placeholder="請輸入產品規格"
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

            <div class="row">
              <div class="col-sm-6">
                <h3 class="fs-md mb-3">上傳商品圖片</h3>
              </div>
              <div class="col-sm-6">
                <button type="button" class="fs-6 d-flex mb-3 w-100" @click="toggleUpLoadLimits">
                  <span>圖片上傳限制</span>
                  <span class="mx-3"><i class="bi bi-question-circle"></i></span>
                </button>
                <ul
                  class="img-limits text-secondary bg-light-subtle p-2"
                  :class="{ 'show-limits': showImgLimits }"
                >
                  <li class="fs-sm pb-1">1. 圖片長寬須小於 1024 * 1024 px</li>
                  <li class="fs-sm pb-1">2. 圖片大小須小於 1 MB</li>
                  <li class="fs-sm pb-1">3. 圖片格式僅限 jpg、jpeg 與 png</li>
                  <li class="fs-sm pb-1">4. 每個商品最多上傳 6 張圖片</li>
                </ul>
              </div>
            </div>

            <div class="bg-light bg-opacity-25 rounded-sm p-3 my-3">
              <h4 class="fs-6 mb-3">圖片預覽</h4>
              <div class="row gy-4">
                <div class="col-sm-6 col-md-4 d-flex flex-column">
                  <img
                    v-if="tempProduct.imageUrl"
                    class="img-fluid object-cover flex-grow-1"
                    :alt="tempProduct.title"
                    :src="tempProduct.imageUrl"
                  />
                  <div
                    v-else
                    class="img-template d-flex justify-content-center align-items-center bg-white h-100 w-100 flex-grow-1"
                  >
                    <span v-if="imageLoading===0" class="spinner-border text-dark" role="status" aria-hidden="true"></span>
                    <span v-else><i class="bi bi-image h3"></i></span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mt-2">
                    <p class="fs-sm">首圖</p>
                    <button type="button" class="btn btn-outline-dark border-0 btn-sm ms-auto me-2"
                      @click.prevent="deleteImage(0)" ><i class="fs-sm bi bi-trash text-center"></i>
                    </button>
                    <label for="main-img" class="btn btn-light btn-sm"
                    :class="{disabled: tempProduct.imageUrl}"
                      ><i class="fs-sm bi bi-upload text-center"></i>
                      <input
                        @change="uploadImage(0)"
                        id="main-img"
                        ref="fileInput"
                        type="file"
                        class="d-none"
                      />
                    </label>
                  </div>
                </div>
                <div class="col-sm-6 col-md-4 d-flex flex-column" v-for="i in 5" :key="'i' + i">
                  <div v-if="tempProduct.imagesUrl && tempProduct.imagesUrl[i - 1]">
                    <img
                      class="img-fluid flex-grow-1"
                      :alt="tempProduct.title"
                      :src="tempProduct.imagesUrl[i - 1]"
                    />
                    
                  </div>
                  <div
                    v-else
                    class="img-template d-flex justify-content-center align-items-center bg-white h-100 w-100 flex-grow-1"
                  > 
                  
                  <span v-if="imageLoading===i" class="spinner-border text-dark" role="status" aria-hidden="true"></span>
                  <span v-else><i class="bi bi-image h3"></i></span>
                    
                    
                  </div>
                  <div class="d-flex justify-content-between align-items-center mt-2">
                    <p class="fs-sm">商品圖 - {{ i + 1 }}</p>
                    <button type="button" class="btn btn-outline-dark border-0 btn-sm ms-auto me-2"
                    @click.prevent="deleteImage(i)"><i class="fs-sm bi bi-trash text-center"></i>
                    </button>
                    <label :for="'other-img' + i" class="btn btn-light btn-sm"
                      v-if="tempProduct.imagesUrl"
                      :class="{disabled: tempProduct.imagesUrl[i-1]}" ><i class="fs-sm bi bi-upload text-center"></i>
                      <input
                        @change="uploadImage(i)"
                        :id="'other-img' + i"
                        :ref="'otherInput' + i"
                        type="file"
                        class="d-none"
                      />
                    </label>
                  </div>
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
        return {
          imagesUrl: []
        }
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
      categoryList: ['香薰蠟燭', '擴香瓶', '香氛噴霧', '精緻禮盒'],
      notesList: ['花香調', '東方調', '柑苔調', '薰苔調', '清新調', '木質調', '美食調'],
      showImgLimits: false,
      imageLoading: null
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
      const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/upload`
      this.imageLoading = order
      if (order === 0) {
        const img = this.$refs.fileInput.files[0]
        const formData = new FormData()
        formData.append('file-to-upload', img)

        this.$http.post(api, formData).then((res) => {
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl
            this.imgRendered = res.data.imageUrl
            this.imageLoading = null
          }
        })
      } else {
        const img = this.$refs[`otherInput${order}`][0].files[0]
        const formData = new FormData()
        formData.append('file-to-upload', img)

        this.$http.post(api, formData).then((res) => {
          if (res.data.success) {
            this.tempProduct.imagesUrl[order - 1] = res.data.imageUrl
            this.imageLoading = null
          }
        })
      }
      
    },
    deleteImage(order) {
      order === 0 
        ? this.tempProduct.imageUrl = ''
        : this.tempProduct.imagesUrl[order-1] = ''
    },
    toggleUpLoadLimits() {
      this.showImgLimits = !this.showImgLimits
    },
  },
}
</script>

<style lang="scss">
.img-limits {
  display: none;
}

.show-limits {
  display: block;
}

.img-template {
  min-width: 120px;
  min-height: 120px;
}
</style>
