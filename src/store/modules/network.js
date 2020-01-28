
const state = {
  users: []
}

const getters = {

}

const actions = {
  setUsers({commit}, users) {
    commit('SET_USERS', users);
  }
}

const mutations = {
  SET_USERS: (state, users) => state.users = users,
}

export default {
    state,
    getters,
    actions,
    mutations
}