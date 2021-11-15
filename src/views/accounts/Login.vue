<template>
  <div>
    <h1>Login</h1>
    <div>
      <label for="username">아이디: </label>
      <input type="text" id="username" v-model="credentials.username">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input type="password" id="password" v-model="credentials.password"
      @keyup.enter="login">
    </div>
    <button @click="login">login</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      }
    }
  },
  methods: {
    login(){
      const SERVER_URL = process.env.VUE_APP_SERVER_URL
      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/api-token-auth/`,
        data: this.credentials
      }).then(res => {
        this.$store.dispatch('login', res.data.token)
        this.$router.push({name: 'TodoList'})
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
