<template>
  <div class="container">
    <h2 class="my-3">{{ product.title }}</h2>
    <img :src="product.imageUrl" :alt="product.title" />
    <p>{{ product.description }}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
        .then((res) => {
          // console.log(res.data)
          this.product = res.data.product
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
