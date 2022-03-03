<template>
  <AdminNavbar></AdminNavbar>
  <router-view></router-view>
</template>
<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
export default {
  name: 'Dashboard',
  components: {
    AdminNavbar
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

      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = token
        this.$http
          .post(`${process.env.VUE_APP_API}/api/user/check`)
          .then((res) => {
            // console.log(res.data)
            this.checkSuccess = true
          })
          .catch((err) => {
            console.log(err.response.data)
          })
      } else {
        alert('您還沒有登入喔')
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
