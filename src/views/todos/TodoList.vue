<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span @click="updateTodoStatus(todo)" :class="{ 'is-completed': todo.is_completed }">{{ todo.title }}</span>
        <button @click="deleteTodo(todo)" class="todo-btn">X</button>
      </li>
    </ul>
    <button @click="getTodos">Get Todos</button>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'TodoList',
  data: function () {
    return {
      todos: null,
    }
  },
  computed: {
    ...mapGetters(['setToken'])
  },
  created() {
    this.getTodos()
  },
  methods: {
    getTodos() {
      axios({
        method: 'get',
        url: `${SERVER_URL}/todos/`,
        headers: this.setToken
      })
        .then(res => {
          this.todos = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteTodo(todo) {
      axios({
        method: 'delete',
        url: `${SERVER_URL}/todos/${todo.id}/`,
        headers: this.setToken
      })
        .then(() => {
          this.todos = this.todos.filter(td => td.id !== todo.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateTodoStatus(todo) {
      const todoItem = {
        ...todo,
        is_completed: !todo.is_completed
      }

      axios({
        method: 'put',
        url: `${SERVER_URL}/todos/${todo.id}/`,
        data: todoItem,
        headers: this.setToken
      })
        .then(() => {
          todo.is_completed = !todo.is_completed
      }).catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped>
  .todo-btn {
    margin-left: 10px;
  }

  .is-completed {
    text-decoration: line-through;
    color: rgb(112, 112, 112);
  }
</style>
