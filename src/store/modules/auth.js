
const state = {
	baseUrl: 'http://127.0.0.1:8000',
	token: null,
	user: {}
}

const getters = {}

const actions = {
	setToken({commit}, payload) {
		commit('setToken', payload)
	},

	setUser({commit}, payload) {
		commit('setUser', payload)
	},

	setAuth({commit}, payload) {
		commit('setToken', payload.token)
		commit('setUser', payload.user)
	}
}

const mutations = {
	setToken: (state, token) => state.token = token,
	setUser: (state, user) => state.user = user,
}

export default {
    state,
    getters,
    actions,
    mutations
}
