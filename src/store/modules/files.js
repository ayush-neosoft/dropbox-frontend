import File from '../../apis/File'

const state = {
    fileLoop: []
}

const actions = {
    getAllFiles({commit}) {
        File.all().then(response => {
            commit('SET_ALL', response.data)
        })
    },

    saveFile({commit}, data) {
        File.save(data).then(response => {
            commit('ADD_FILES', response.data.files)
        })
    },

    deleteFile({commit}, id) {
        File.delete(id).then(() => {
            commit('DELETE_ONE', id)
        })
    }
}

const mutations = {
    SET_ALL: (state, files) => state.fileLoop = files,

    ADD_FILES: (state, files) => files.forEach((e) => { 
        state.fileLoop.unshift(e)
    }),

    DELETE_ONE: (state, id) => state.fileLoop = state.fileLoop.filter(u => (u.id !== id)),
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
