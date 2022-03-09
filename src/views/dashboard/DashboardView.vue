<template>
  <AdminNavbar></AdminNavbar>
  <!-- 把 Toast 移到 App.vue -->
  <!-- <div class="container-fluid mt-3 position-relative">
    <Toast></Toast>
  </div> -->
  <router-view></router-view>
</template>
<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
// import Toast from '@/components/Toast.vue'
export default {
  name: 'Dashboard',
  components: {
    AdminNavbar
    // Toast
  },
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      // 2. 本周寫法
      this.$http.defaults.headers.common.Authorization = token
      this.$http
        .post(`${process.env.VUE_APP_API}/api/user/check`)
        .then((res) => {
          // console.log(res.data)
          this.checkSuccess = true
          this.$httpMessageState(res, '登入')
        })
        .catch((err) => {
          // console.log(err.response.data)
          this.$httpMessageState(err.response, '登入')
          this.$router.push('/login')
        })

      // 1. 上周寫法：先判斷是否有 token
      // if (token) {
      //   // Axios 預設值
      //   this.$http.defaults.headers.common.Authorization = token
      //   this.$http
      //     .post(`${process.env.VUE_APP_API}/api/user/check`)
      //     .then((res) => {
      //       console.log(res.data)
      //       this.checkSuccess = true
      //       this.$httpMessageState(res, '登入')
      //     })
      //     .catch((err) => {
      //       console.log(err.response.data)
      //     })
      // } else {
      //   alert('您還沒有登入喔')
      //   this.$router.push('/login')
      // }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
