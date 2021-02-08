import Vue from 'vue'
import Toast from 'vue-toastification'
import VueLoading from 'vuejs-loading-plugin'
import 'vue-toastification/dist/index.css'
import router from "./router"
import App from './App.vue'

const options = {
  // You can set your default options here
}

Vue.use(VueLoading, {
  text: 'Загрузка', // default 'Loading'
})
Vue.use(Toast, options);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
