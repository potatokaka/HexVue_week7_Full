<template>
  <div class="container">
    <Loading :active="loadingOverlay"></Loading>
    <h2 class="my-3">產品列表</h2>
    <div class="row row-cols-1 row-cols-lg-4 g-3">
      <div class="col" v-for="item in products" :key="item.id">
        <div class="card h-100">
          <img
            :src="item.imageUrl"
            class="card-img-top card-img"
            :alt="item.title"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">
              {{ item.description }}
            </p>
          </div>
          <div class="card-footer bg-transparent border-0">
            <router-link
              href="#"
              class="btn btn-outline-primary me-3"
              :to="`/product/${item.id}`"
              >查看更多</router-link
            >
            <button
              class="btn btn-primary"
              :disabled="isLoadingItem === item.id"
              @click.prevent="addToCart(item.id)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emitter from '@/methods/emitter'
export default {
  data () {
    return {
      isLoadingItem: '',
      loadingOverlay: false,
      products: []
    }
  },
  methods: {
    getProducts () {
      this.loadingOverlay = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
        )
        .then((res) => {
          // console.log(res.data)
          this.products = res.data.products
          this.loadingOverlay = false
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    addToCart (id, qty = 1) {
      this.isLoadingItem = id
      const obj = {
        data: {
          product_id: id,
          qty: qty
        }
      }
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          obj
        )
        .then((res) => {
          // alert(res.data.message)
          this.isLoadingItem = ''
          emitter.emit('get-cart') // 觸發 FrontNavbar 的監聽
          this.$httpMessageState(res, '加入購物車')
        })
        .catch((err) => {
          // console.log(err.response.data)
          this.$httpMessageState(err.response, '加入購物車')
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
<style scoped>
.card-img {
  height: 200px;
  object-fit: cover;
}
</style>
