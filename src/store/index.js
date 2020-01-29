import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// Modules
import todos from './modules/todos'
import files from './modules/files'
import snippets from './modules/snippets'
import network from './modules/network'
import chat from './modules/chat'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    user: state => state.user,
  },
  actions: {
    setUser: ({commit}, user) => commit('SET_USER', user)
  },
  mutations: {
    SET_USER: (state, user) => state.user = user,
  },
  modules: {
    todos, files, snippets, network, chat
  },

  plugins: [vuexLocal.plugin],
  strict: debug
})
