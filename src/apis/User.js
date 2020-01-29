import Api from './Api'

export default {
  all() {
    return Api.get('users')
  },
  getOne(id) {
    return Api.get(`users/${id}`)
  },
  save(data) {
    return Api.post('users', data)
  },
  update(id, data) {
    return Api.put(`users/${id}`, data)
  },
  delete(id) {
    return Api.delete(`users/${id}`)
  }
}