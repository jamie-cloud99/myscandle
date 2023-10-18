<template>
  <h2 class="h5 text-primary-emphasis my-2">收件資訊</h2>
  <VForm
    v-slot="{ errors }"
    @submit="submit(order)"
    ref="form"
    class="text-primary-emphasis border-top border-primary mt-3 py-3"
  >
    <div class="mb-3">
      <label for="name" class="form-label">收件人姓名<span class="text-danger">*</span></label>
      <VField
        v-model.trim="order.name"
        type="text"
        class="form-control bg-transparent border border-primary"
        id="name"
        placeholder=""
        name="姓名"
        rules="required"
        :class="{ 'is-invalid': errors['姓名'] }"
      />

      <ErrorMessage name="姓名" class="invalid-feedback" />
    </div>
    <div class="mb-3">
      <label for="phone" class="form-label">收件人手機<span class="text-danger">*</span></label>
      <VField
        v-model="order.tel"
        type="tel"
        class="form-control bg-transparent border border-primary"
        id="phone"
        placeholder="0912345678"
        name="手機"
        :rules="isPhone"
        :class="{ 'is-invalid': errors['手機'] }"
      />

      <ErrorMessage name="手機" class="invalid-feedback" />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">收件人 email<span class="text-danger">*</span></label>
      <VField
        v-model.trim="order.email"
        type="email"
        class="form-control bg-transparent border border-primary"
        id="email"
        placeholder="abc@gmail.com"
        name="email"
        rules="email|required"
        :class="{ 'is-invalid': errors['email'] }"
      />

      <ErrorMessage name="email" class="invalid-feedback" />
    </div>
    <div class="mb-3">
      <h3 class="h6">收件地址</h3>
    </div>
    <div class="mb-3">
      <label for="city" class="form-label">縣市<span class="text-danger">*</span></label>
      <VField
        v-model="order.city"
        @change="filterAreas(order.city)"
        as="select"
        class="form-select bg-transparent border border-primary"
        id="city"
        name="縣市"
        rules="required"
        :class="{ 'is-invalid': errors['縣市'] }"
      >
        <option class="text-secondary fs-sm" value="">請選擇縣市</option>
        <option class="" :value="item.CityName" v-for="item in cityAreas" :key="item.CityName">
          {{ item.CityName }}
        </option>
      </VField>
      <ErrorMessage name="縣市" class="invalid-feedback" />
    </div>
    <div class="mb-3">
      <label for="area" class="form-label">鄉鎮市區<span class="text-danger">*</span></label>
      <VField
        v-model="order.area"
        as="select"
        class="form-select bg-transparent border border-primary"
        id="area"
        name="鄉鎮市區"
        rules="required"
        :class="{ 'is-invalid': errors['鄉鎮市區'] }"
      >
        <option class="text-secondary fs-sm" value="">請選擇鄉鎮市區</option>
        <option class="" :value="item.AreaName" v-for="item in selectedCityAreas" :key="item.A">
          {{ item.AreaName }}
        </option>
      </VField>
      <ErrorMessage name="鄉鎮市區" class="invalid-feedback" />
    </div>
    <div class="mb-3">
      <label for="road" class="form-label">路名、巷弄號樓<span class="text-danger">*</span></label>
      <VField
        v-model.trim="order.road"
        type="text"
        class="form-control bg-transparent border border-primary"
        id="road"
        placeholder="路名、巷弄號樓"
        name="完整路名、巷弄號樓"
        rules="required"
        :class="{ 'is-invalid': errors['完整路名、巷弄號樓'] }"
      />

      <ErrorMessage name="完整路名、巷弄號樓" class="invalid-feedback" />
    </div>
    <div class="mb-3">
      <label for="message" class="form-label">留言</label>
      <VField
        as="textarea"
        v-model.trim="message"
        class="form-control bg-transparent border border-primary"
        id="message"
        name="留言"
      />
    </div>
    <div class="d-flex pt-2">
      <button type="submit" class="btn btn-primary ms-auto" :disabled="orderLoading">
        <span>送出訂單</span
        ><span
          v-if="orderLoading"
          class="spinner-border spinner-border-sm ms-2"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    </div>
  </VForm>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import toastStore from '@/stores/toastStore'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'

export default {
  data() {
    return {
      order: {},
      cityAreas: [],
      selectedCityAreas: [],
      message: '',
      tempOrder: {}
    }
  },
  computed: {
    ...mapState(statusStore, ['orderLoading']),
    ...mapState(cartStore, ['orderSubmitted'])
  },
  methods: {
    ...mapActions(cartStore, ['submitOrder']),
    ...mapActions(toastStore, ['handleError']),
    isPhone(num) {
      const phone = /^09[0-9]{8}$/
      return !phone.test(num) ? '格式有誤，請輸入正確的手機號碼' : true
    },
    async fetchCityAreas() {
      const api =
        'https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/CityCountyData.json'

      try {
        const res = await this.axios.get(api)
        if (res.status === 200) {
          this.cityAreas = res.data
        }
      } catch (error) {
        this.handleError()
      }
    },
    filterAreas(city) {
      this.selectedCityAreas = this.cityAreas.find((item) => item.CityName === city)?.AreaList || []
    },

    async submit(order) {
      this.tempOrder.name = order.name
      this.tempOrder.tel = order.tel
      this.tempOrder.email = order.email
      this.tempOrder.address = order.city + order.area + order.road
      await this.submitOrder(this.tempOrder, this.message)
      this.$refs.form.resetForm()

      this.$router.push('/cart/checkout')
    }
  },
  created() {
    this.fetchCityAreas()
  }
}
</script>
