<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
            <router-link class="nav-link" to="/admin/products"
              >產品管理</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/order"
              >訂單管理</router-link
            >
          </li>
        </ul>
        <div>
          <button
            type="button"
            class="btn btn-outline-primary me-3"
            @click="logOut"
          >
            登出
          </button>
          <router-link to="/cart" class="btn btn-primary">回前台</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logOut () {
      document.cookie = 'hexToken=""; expires=""'
      alert('已清除 Token')
      this.$router.push('/login')
    }
  }
}
</script>
