import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import todos from './modules/todos'
import files from './modules/files'
import snippets from './modules/snippets'
import network from './modules/network'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },

  getters: {
    user: state => state.user,
  },

  actions: {
    setUser({commit}, user) {
      commit('SET_USER', user)
    },
  },

  mutations: {
    SET_USER: (state, user) => state.user = user,
  },

  modules: {
    todos, files, snippets, network
  }
})
