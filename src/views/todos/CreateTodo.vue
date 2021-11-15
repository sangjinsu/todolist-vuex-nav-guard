<template>
  <div>
    <input 
      type="text" 
      v-model.trim="title" 
      @keyup.enter="createTodo"
    >
    <button @click="createTodo">+</button>
  </div>
</template>

<script>
import axios from'axios'
import { mapGetters } from 'vuex'

const SERVER_URL = process.env.VUE_APP_SERVER_URL
export default {
  name: 'CreateTodo',
  data: function () {
    return {
      title: null,
    }
  },
  computed: {
    ...mapGetters(['setToken'])
  },
  methods: {
    createTodo: function () {
      const todoItem = {
        title: this.title,
      }
      if (todoItem.title) {
        axios({
          method: 'post',
          url: `${SERVER_URL}/todos/`,
          data: todoItem,
          headers: this.setToken
        })
          .then(res => {
            console.log(res)
            this.$router.push({ name: 'TodoList' })
          })
          .catch(err => {
            console.log(err)
          })
        }
    },
  },
}
</script>
