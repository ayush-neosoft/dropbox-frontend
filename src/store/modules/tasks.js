import Task from '../../apis/Task'

const state = {
  taskLoop: [],
  focused: {},
}

const actions = {
  getAllTasks({commit}) {
    Task.all().then(response => {
      commit('SET_ALL', response.data);
    })
  },

  getOneTask({commit}, id) {
    Task.getOne(id).then(response => {
      commit('SET_ONE', response.data);
    })
  },

  saveTask({commit}, data) {
    Task.save(data).then(response => {
      commit('ADD_ONE', response.data);
    })
  },

  updateTask({commit}, data) {
    Task.update(data.id, data).then(response => {
      commit('UPDATE_ONE', response.data);
    })
  },

  deleteTask({commit}, id) {
    Task.delete(id).then(() => {
      commit('DELETE_ONE', id);
    })
  }
}

const mutations = {
  SET_ALL: (state, taskLoop) => state.taskLoop = taskLoop,
  SET_ONE: (state, task) => state.focused = task,
  ADD_ONE: (state, task) => state.taskLoop.unshift(task),
  UPDATE_ONE: (state, data) => { 
    let index = state.taskLoop.findIndex((e) => { return e.id === data.id });
    state.taskLoop.splice(index, 1, data)
  },
  DELETE_ONE: (state, id) => state.taskLoop = state.taskLoop.filter(u => (u.id !== id)),
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}