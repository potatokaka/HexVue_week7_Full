export default {
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = token

      if (token) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
