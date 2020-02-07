import Api from './Api'

export default {
  all() {
    return Api.get('tasks')
  },
  getOne(id) {
    return Api.get(`tasks/${id}`)
  },
  save(data) {
    return Api.post('tasks', data)
  },
  update(id, data) {
    return Api.put(`tasks/${id}`, data)
  },
  delete(id) {
    return Api.delete(`tasks/${id}`)
  }
}