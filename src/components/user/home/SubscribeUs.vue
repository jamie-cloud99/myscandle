<template>
  <div data-aos="fade-up"
      data-aos-delay="150" class="d-flex flex-wrap justify-content-center align-items-center bg-primary py-5 rounded-md text-light gap-3">
    <div>
      <h3 class="mb-2 fw-bold">首次訂購現折 100 元 </h3>
      <p>立即訂閱電子報，輕鬆領取首購優惠</p>
    </div>
    <div class="input-group"><input type="email" class="form-control bg-light subscribe-input" placeholder="abc@gmail.com"><button type="button" class="subscribe-btn btn bg-light border-primary text-primary"><i class="bi bi-send-fill"></i></button></div>

  </div>
</template>

<script>
export default {
 
}
</script>

<style lang="scss" scoped>

.input-group {
  flex-wrap: nowrap;
  max-width: 320px;
}
.subscribe-input{
  width: 300px;
  height: 50px;
}

.subscribe-btn {
  border-width: 0 0 0 1px;
  padding-right: 15px;
  &:hover, &:focus {
    opacity: 0.8;
  }
}
</style>