import Snippet from '../../apis/Snippet'

const state = {
  codeLoop: [],
  focused: {}
}

const actions = {
  getAllSnippets({commit}) {
    Snippet.all().then(response => {
      commit('SET_ALL', response.data);
    })
  },

  getOneSnippet({commit}, id) {
    Snippet.getOne(id).then(response => {
      commit('SET_ONE', response.data);
    })
  },

  saveSnippet({commit}, data) {
    Snippet.save(data).then(response => {
      commit('ADD_ONE', response.data);
    })
  },

  updateSnippet({commit}, data) {
    Snippet.update(data.id, data).then(response => {
      commit('UPDATE_ONE', response.data);
    })
  },

  deleteSnippet({commit}, id) {
    Snippet.delete(id).then(() => {
      commit('DELETE_ONE', id);
    })
  }
}

const mutations = {
  SET_ALL: (state, data) => state.codeLoop = data,

  SET_ONE: (state, data) => state.focused = data,

  ADD_ONE: (state, data) => state.codeLoop.unshift(data),

  UPDATE_ONE: (state, data) => { 
    let index = state.codeLoop.findIndex((e) => { return e.id === data.id });
    state.codeLoop.splice(index, 1, data)
  },

  DELETE_ONE: (state, id) => state.codeLoop = state.codeLoop.filter(u => (u.id !== id)),
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
