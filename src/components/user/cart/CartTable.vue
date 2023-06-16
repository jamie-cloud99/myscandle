<template>
  <div class="d-block d-md-none">
    <div class="border border-primary p-3">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img class="cart-img" src="@/assets/images/specialCategories/hot1.webp" alt="" />
          <div>
            <h4 class="flex-grow-1 fs-6 px-2 mb-0">杜松薰衣草香薰蠟燭</h4>
            <p class="fs-sm px-2">$ 1,599</p>
          </div>
        </div>
        <i class="bi bi-trash3-fill"></i>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex align-items-center">
          <button
            class="btn quantity-btn btn-outline-primary rounded-circle flex-shrink-0"
            type="button"
          >
            <i class="bi bi-dash"></i></button
          ><input
            class="form-control quantity text-center border border-primary bg-transparent mx-2"
            type="number"
            min="1"
          />
          <button
            class="btn quantity-btn btn-outline-primary rounded-circle flex-shrink-0"
            type="button"
          >
            <i class="bi bi-plus"></i>
          </button>
        </div>
        <p class="px-2">$ 1,599</p>
      </div>
    </div>
  </div>

  <div class="d-none d-md-block">
    <table class="table align-middle text-center border border-primary">
      <thead class="border-bottom border-primary">
        <tr>
          <th>商品圖片</th>
          <th>商品名稱</th>
          <th>商品數量</th>
          <th>單價</th>
          <th>小計</th>
          <th><button type="button" class="text-info-emphasis">全部刪除</button></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-bottom border-primary">
          <td class="" style="width: 15%">
            <img class="cart-img" src="@/assets/images/specialCategories/hot1.webp" alt="" />
          </td>
          <td class="" style="width: 25%">杜松薰衣草香薰蠟燭</td>
          <td class="" style="width: 15%">
            <div class="d-flex justify-content-center align-items-center">
          <button
            class="btn quantity-btn btn-outline-primary rounded-circle flex-shrink-0"
            type="button"
          >
            <i class="bi bi-dash"></i></button
          ><input
            class="form-control quantity text-center border border-primary bg-transparent mx-2"
            type="number"
            min="1"
          />
          <button
            class="btn quantity-btn btn-outline-primary rounded-circle flex-shrink-0"
            type="button"
          >
            <i class="bi bi-plus"></i>
          </button>
        </div>
          </td>
          <td class="" style="width: 15%">$ 1,599</td>
          <td class="" style="width: 15%">$ 1,599</td>
          <td class="" style="width: 15%"><i class="bi bi-trash3-fill"></i></td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="border-bottom border-primary">
          <td colspan="2" class="text-start">
            <button type="button" class="btn btn-outline-primary rounded-sm ms-3 ms-md-2">
              繼續購物
            </button>
          </td>
          <td colspan="4" class="text-end pe-4">
            <p class="fs-md"><span class="fs-sm me-2">商品總計</span>$ 1,599</p>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style lang="scss">
.cart-img {
  height: 5rem;
  width: 5rem;
  object-fit: cover;
  @include pad {
    height: 7rem;
    width: 7rem;
  }
}

.quantity-btn {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
}

.quantity {
  height: 2rem;
  width: 4rem;
}

.bi::before {
  line-height: 1.5;
  vertical-align: 0.1em;
}
</style>
