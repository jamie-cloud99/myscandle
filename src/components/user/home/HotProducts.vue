<template>
  <h3 class="h3 text-center mb-3">經典熱銷香調</h3>
  <p class="text-center mb-5">百年時光錘鍊，溫柔香氣縈繞鼻息，戒不掉的經典好味</p>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card rounded-md border-primary h-100 overflow-hidden">
        <img src="@/assets/images/specialCategories/hot1.webp" alt="" class="card-img-top" />
        <div class="card-body pb-lg-0">
          <div class="card-title fs-md fw-bold">法國杜松薰衣草擴香</div>
          <div class="d-flex align-items-center">
            <div class="badge rounded-pill text-bg-light fs-6 fw-normal lh-base">擴香瓶</div>
            <p class="text-secondary ms-auto">$ 1,599</p>
          </div>
        </div>
        <div class="card-footer bg-transparent border-top-0 pt-0">
          
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="d-none d-md-flex flex-column">
        <div class="card rounded-md border-primary overflow-hidden mb-3 mb-lg-4">
          <div class="d-flex">
            <div class="w-60">
              <img src="@/assets/images/specialCategories/hot2.webp" alt="" class="d-block h-100 object-fit-cover" />
            </div>
            <div class="w-40 d-flex flex-column">
              <div class="card-body">
                <div class="card-title fs-md fw-bold mb-3">峇里島假期香薰蠟燭</div>
                <div class="badge rounded-pill text-bg-light fs-6 fw-normal lh-base mb-3">蠟燭</div>
                <p class="text-secondary ms-auto">$ 1,599</p>
              </div>
              <div class="card-footer bg-transparent border-primary">
                <a class="text-end" href="#">查看商品<i class="bi bi-arrow-right-short ms-2"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="card rounded-md border-primary overflow-hidden">
          <div class="d-flex">
            <div class="w-60">
              <img src="@/assets/images/specialCategories/hot3.webp" alt="" class="d-block h-100 object-fit-cover" />
            </div>
            <div class="w-40 d-flex flex-column">
              <div class="card-body">
                <div class="card-title fs-md fw-bold mb-3">檸檬香橙香薰蠟燭</div>
                <div class="badge rounded-pill text-bg-light fs-6 fw-normal lh-base mb-3">蠟燭</div>
                <p class="text-secondary ms-auto">$ 1,599</p>
              </div>
              <div class="card-footer bg-transparent border-primary">
                <a class="text-end" href="#">查看商品<i class="bi bi-arrow-right-short ms-2"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    specialCategory: {
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>
