import User from '../../apis/User'

const state = {
  users: []
}

const actions = {
  getAllUsers({commit}) {
    User.all().then(response => {
      commit('SET_ALL', response.data);
    })
  }
}

const mutations = {
  SET_ALL: (state, data) => state.users = data,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}