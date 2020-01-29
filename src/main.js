import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted';
import PrettyCheckbox from 'pretty-checkbox-vue';
import BootstrapVue from 'bootstrap-vue'
import VueChatScroll from 'vue-chat-scroll'

// import VueHighlightJS from 'vue-highlightjs'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import './assets/css/loading.min.css'
import './assets/css/ldbtn.min.css'


Vue.config.productionTip = false

Vue.use(Toasted)
Vue.use(VueAxios, axios)
Vue.use(PrettyCheckbox);
Vue.use(BootstrapVue)
Vue.use(VueChatScroll)

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
