import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted';
import PrettyCheckbox from 'pretty-checkbox-vue';

// import VueHighlightJS from 'vue-highlightjs'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'pretty-checkbox/dist/pretty-checkbox.min.css';


Vue.use(Toasted)
Vue.use(VueAxios, axios)

Vue.use(PrettyCheckbox);

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    isEmptyObj(obj) {
      for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return JSON.stringify(obj) === JSON.stringify({});
    },
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
