import Vue from "vue"
import VueRouter from 'vue-router'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Tasks from '@/components/Tasks'
import {veryfy} from "@/utils/auth";

Vue.use(VueRouter)
const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      title: 'Главная TODO-list'
    }
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      title: 'Регистрация'
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      title: 'Вход'
    }
  },
  {
    name: 'tasks',
    path: '/tasks',
    component: Tasks,
    meta: {
      title: 'Задачи',
      auth: true
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  const isLoggedIn = await veryfy(localStorage.getItem('token'))

  if(to.meta.auth) {
    if(isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    if(isLoggedIn) {
      next('/tasks')
    } else {
      next()
    }
  }

  next()
})

Vue.config.productionTip = false;

export default router
