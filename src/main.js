import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted';

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Toasted)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
