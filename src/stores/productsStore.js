import { defineStore } from 'pinia'
import axios from 'axios'
import toastStore from './toastStore'
import statusStore from './statusStore'

const toast = toastStore()
const status = statusStore()

const { VITE_API, VITE_PATH } = import.meta.env

export default defineStore('productsStore', {
  state: () => ({
    products: [],
    productsAll: [],
    categorySelected: '所有商品',
    categoryList: ['所有商品', '香薰蠟燭', '擴香瓶', '香氛噴霧', '精緻禮盒'],
    pagination: {
      current_page: 1,
      total_pages: 1,
      has_next: true,
      has_pre: false
    },
    product: {},
    imageList: [],
    tempImage: '',
    relatedProducts: [],
    histoyView: [],
    filteredProducts: [],
    keywordList: ['蠟燭', '擴香', '薰衣草', '禮盒', '木質調','玫瑰', '純素'],
  }),
  actions: {
    async fetchAllProducts() {
      status.isLoading = true
      const api = `${VITE_API}api/${VITE_PATH}/products/all`
      try {
        const res = await axios.get(api)
        if (res.data.success) {
          this.productsAll = res.data.products
          this.selectCategory(this.categorySelected)
        }
      } catch (error) {
        status.isLoading = false
        toast.handleError()
      }
    },
    async fetchProduct(id) {
      status.isLoading = true
      const productApi = `${VITE_API}api/${VITE_PATH}/product/${id}`
      const productsAllApi = `${VITE_API}api/${VITE_PATH}/products/all`
      try {
        const [productRes, productsAllRes] = await Promise.all([
          axios.get(productApi),
          axios.get(productsAllApi)
        ])
        if (productRes.data.success) {
          this.product = productRes.data.product
          this.productsAll = productsAllRes.data.products
          this.getRelatedProducts(this.product)
          this.concatImageList()
          this.tempImage = this.product.imageUrl
        }
      } catch (error) {
        toast.handleError()
        status.isLoading = false
      }
    },
    selectCategory(category = '所有商品') {
      this.categorySelected = category
      this.paginate(this.categoryProducts)
    },
    paginate(items, curPage = 1, perPage = 12) {
      const totalPages = Math.ceil(items.length / perPage)
      if (curPage > totalPages) {
        curPage = totalPages
      }

      const minIndex = (curPage - 1) * perPage
      const maxIndex = curPage * perPage
      const itemPaginated = items.slice(minIndex, maxIndex)

      const page = {
        current_page: curPage,
        total_pages: totalPages,
        has_pre: curPage > 1,
        has_next: curPage < totalPages
      }

      this.pagination = { ...page }
      this.products = [...itemPaginated]
      status.isLoading = false
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    getRelatedProducts(product) {
      this.relatedProducts = this.productsAll.filter(
        (item) => item.category === product.category && item.id !== product.id
      )
      status.isLoading = false
    },
    concatImageList() {
      this.imageList = this.product.imagesUrl
        ? [this.product.imageUrl, ...this.product.imagesUrl]
        : [this.product.imageUrl]
      status.isLoading = false
    },
    changeImgView(image) {
      this.tempImage = image
    },
    recordHistoryView(item) {
      if (item) this.histoyView.push(item.id)
      const history = JSON.stringify(this.histoyView)
      localStorage.setItem('historyView', history)
    },
    filterProducts(priceRanges) {
      const selectedRanges = priceRanges
        .flatMap(JSON.parse)
        .map(Number)
        .sort((a, b) => a - b)

      this.filteredProducts = selectedRanges[0]
        ? selectedRanges.reduce((acc, cur, index, ary) => {
            if (index % 2 === 0) {
              const nextVal = ary[index + 1]
              acc.push(
                ...this.categoryProducts.filter(
                  (product) => product.price >= cur && product.price < nextVal
                )
              )
            }
            return acc
          }, [])
        : this.categoryProducts
      this.paginate(this.filteredProducts)
    },
    async searchProducts(keyword) {
      
      await this.fetchAllProducts()
      this.filteredProducts = this.productsAll.filter((product) => {
        const searchFields = [product.title, product.content, product.description, product.notes, product.category]
        // if field is undefined return false
        return searchFields.some((field) => field && field.includes(keyword))
      })
      this.paginate(this.filteredProducts)
    }
  },
  getters: {
    categoryProducts() {
      const productList =
        this.categorySelected === '所有商品'
          ? [...this.productsAll]
          : this.productsAll.filter((item) => item.category === this.categorySelected)
      this.filteredProducts = productList
      return productList
    },
    menuCategories() {
      const list = []
      for (let i = 0; i < this.categoryList.length; i++) {
        if (i !== 0) {
          list.push(this.categoryList[i])
        }
      }
      return list
    }
  }
})
