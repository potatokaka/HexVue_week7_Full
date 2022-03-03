<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Brand Logo</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">購物車</router-link>
          </li>
        </ul>
        <div>
          <router-link to="/login" class="btn btn-outline-primary me-3">
            登入
          </router-link>
          <router-link to="/cart" class="btn btn-primary">
            結帳
            <span class="badge rounded-pill bg-light text-dark">{{
              cart.carts.length
            }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      cart: {
        carts: []
      },
      isLoadingItem: ''
    }
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // console.log(res.data.data)
          this.cart = res.data.data
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  },
  mounted () {
    this.getCart()
    // emitter 監聽是否有產品加入購物車
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
