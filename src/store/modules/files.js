
const state = {
    fileLoop: []
}

const getters = {}

const actions = {
    setFiles({commit}, files) {
        commit('SET_FILES', files)
    },

    addFiles({commit}, files) {
        commit('ADD_FILES', files)
    }
}

const mutations = {
    SET_FILES: (state, files) => state.fileLoop = files,
    ADD_FILES: (state, files) => files.forEach((e) => { state.fileLoop.unshift(e)}),
}

export default {
    state,
    getters,
    actions,
    mutations
}
