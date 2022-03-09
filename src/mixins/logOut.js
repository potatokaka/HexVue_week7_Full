export default {
  methods: {
    logOut () {
      document.cookie = 'hexToken=""; expires=""'
      alert('已清除 Token')
      this.$router.push('/login')
    }
  }
}
