<template>
  <div class="container pt-xl">
    <div class="position-relative">
      <img
        class="d-block brand-bn object-fit-cover"
        src="/images/others/contact.jpg"
        alt="聯絡我們"
      />
      <div class="bg-overlay position-absolute"></div>
      <div class="position-absolute top-50 start-50 translate-middle">
        <h1 class="text-center h2 fw-bold mb-2 text-light">聯絡我們</h1>
        <h2 class="text-center h3 fw-medium mb-3 text-light text-opacity-85">
          寫下你的問題，專人立即聯繫
        </h2>
      </div>
    </div>

    <div class="row justify-content-center mt-5">
      <div class="col-lg-6">
        <VForm
          ref="form"
          v-slot="{ errors }"
          @submit="onSubmit"
          class="text-primary-emphasis bg-light border border-light rounded-md p-4"
        >
          <div class="mb-3">
            <label for="title" class="form-label">主旨<span class="text-danger">*</span></label>
            <VField
              type="text"
              class="form-control bg-transparent border-bottom border-primary rounded-0"
              id="title"
              placeholder=""
              name="主旨"
              rules="required"
              :class="{ 'is-invalid': errors['主旨'] }"
            >
            </VField>
            <ErrorMessage name="主旨" class="invalid-feedback"></ErrorMessage>
          </div>
          
          <div class="mb-3">
            <label for="message" class="form-label">意見回饋 / 問題描述</label>
            <VField
              as="textarea"
              class="form-control bg-transparent border-bottom border-primary rounded-0"
              id="message"
              placeholder=""
              name="問題"
            >
            </VField>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">姓名<span class="text-danger">*</span></label>
            <VField
              type="text"
              class="form-control bg-transparent border-bottom border-primary rounded-0"
              id="name"
              placeholder=""
              name="姓名"
              rules="required"
              :class="{ 'is-invalid': errors['姓名'] }"
            >
            </VField>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">手機<span class="text-danger">*</span></label>
            <VField
              type="tel"
              class="form-control bg-transparent border-bottom border-primary rounded-0"
              id="phone"
              placeholder="0912345678"
              name="手機"
              :rules="isPhone"
              :class="{ 'is-invalid': errors['手機'] }"
            >
            </VField>
            <ErrorMessage name="手機" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email<span class="text-danger">*</span></label>
            <VField
              type="email"
              class="form-control bg-transparent border-bottom border-primary rounded-0"
              id="email"
              placeholder="abc@gmail.com"
              name="email"
              rules="email|required"
              :class="{ 'is-invalid': errors['email'] }"
            >
            </VField>
          </div>
          <div class="d-flex pt-2">
            <button type="submit" class="btn btn-primary ms-auto" :disabled="btnLoading">
              <span>送出</span
              ><span
                v-if="btnLoading"
                class="spinner-border spinner-border-sm ms-2"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'pinia'
import statusStore from '../../stores/statusStore'


export default {
  computed: {
    ...mapState(statusStore, ['btnLoading'])
  },
  methods: {
    ...mapActions(statusStore, ['submitContactForm']),
    isPhone(num) {
      const phone = /^09[0-9]{8}$/
      return !phone.test(num) ? '格式有誤，請輸入正確的手機號碼' : true
    },
    onSubmit() {
      this.submitContactForm()
      this.$refs.form.resetForm()
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-overlay {
  inset: 0;
  background: rgba(#000000, 0.4);
}

.brand-bn {
  width: 100%;
  max-height: 300px;
}

.brand-img {
  width: 100%;
  max-height: 400px;
  @include desktop {
    max-height: 300px;
  }
}

.text-opacity-85 {
  opacity: 0.85;
}

.form-label {
  font-weight: 500;
}
</style>
