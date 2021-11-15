<template>
  <div>
    <h1>Signup</h1>
    <div>
      <label for="username">사용자 이름: </label>
      <input type="text" id="username" v-model="credentials.username">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input type="password" id="password" v-model="credentials.password">
    </div>
    <div>
      <label for="passwordConfirmation">비밀번호 확인: </label>
      <input 
        type="password" 
        id="passwordConfirmation" 
        v-model="credentials.passwordConfirmation"
        @keyup.enter="signup"
      >
    </div>
    <button @click="signup">회원가입</button>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = process.env.VUE_APP_SERVER_URL
export default {
  name: 'Signup',
  data: function () {
    return {
      credentials : {
        username: null,
        password: null,
        passwordConfirmation: null
      }
    }
  },
  methods: {
    signup() {
      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/signup/`,
        data: this.credentials
      }).then(() => {
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
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
