import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Auth from './components/Auth'
import Home from "./components/Home";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/auth',
    component: Auth
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.config.productionTip = false;

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
