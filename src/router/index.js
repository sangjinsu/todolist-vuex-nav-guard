import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '@/views/todos/TodoList'
import CreateTodo from '@/views/todos/CreateTodo'
import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'

import store from '../store'

const beforeAuth = (isAuth) => (from, to, next) => {
  const isLogin = store.getters['isLogin']
  if ((isLogin && isAuth) || (!isLogin && !isAuth)) {
    return next()
  } else {
    // 회원가입 화면으로 이동
    next('/accounts/signup')
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/todos/',
    name: 'TodoList',
    component: TodoList,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/todos/create/',
    name: 'CreateTodo',
    component: CreateTodo,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/accounts/signup/',
    name: 'Signup',
    component: Signup,
    beforeEnter: beforeAuth(false),
  },
  {
    path: '/accounts/login/',
    name: 'Login',
    component: Login,
    beforeEnter: beforeAuth(false),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
