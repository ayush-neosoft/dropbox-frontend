import User from '../../apis/User'

const state = {
  users: [],
  focused: {},
  tab: 'overview',
}

const actions = {
  getAllUsers({commit}) {
    User.all().then(response => {
      commit('SET_ALL', response.data);
    })
  },
  getOneUser({commit}, id) {
    User.getOne(id).then(response => {
      commit('SET_ONE', response.data);
    })
  },
  setFocus({commit}, data) {
    commit('SET_ONE', data);
  }
}

const mutations = {
  SET_ALL: (state, data) => state.users = data,
  SET_ONE: (state, data) => state.focused = data,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}