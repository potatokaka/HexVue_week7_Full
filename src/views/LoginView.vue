<template>
  <div class="container">
    <div class="row justify-content-center align-items-center vh-100">
      <div class="col-4">
        <h2 class="text-center">登入</h2>
        <Form v-slot="{ errors }" @submit="login">
          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <Field
              type="email"
              name="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              id="inputEmail"
              aria-describedby="Email address"
              placeholder="Enter email"
              required
              autofocus
              v-model="user.username"
              rules="email|required"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="inputPassword">Password</label>
            <Field
              type="password"
              name="password"
              class="form-control"
              :class="{ 'is-invalid': errors['password'] }"
              id="inputPassword"
              placeholder="Password"
              required
              v-model="user.password"
              :rules="isPassword"
            ></Field>
            <ErrorMessage
              class="invalid-feedback"
              name="password"
            ></ErrorMessage>
          </div>

          <button type="submit" class="btn btn-primary w-100 mt-3">
            Submit
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          // console.log(res.data)
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          this.$router.push('/admin')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    // Vee Validate 手機規則
    isPassword (value) {
      const password = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/
      // const password = /^(?=.*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/
      return password.test(value) ? true : '密碼應包含英文字母大、小寫、數字'
    }
  }
}
</script>
