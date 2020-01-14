import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import auth from './modules/auth'
import todos from './modules/todos'
// import files from './modules/files'
// import tasks from './modules/tasks'
// import chats from './modules/chats'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todos, auth
  }
})
