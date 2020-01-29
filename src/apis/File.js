import Api from './Api'

export default {
  all() {
    return Api.get('files')
  },
  // getOne(id) {
  //   return Api.get(`files/${id}`)
  // },
  save(data) {
    return Api.post('files', data)
  },
  // update(id, data) {
  //   return Api.put(`files/${id}`, data)
  // },
  delete(id) {
    return Api.delete(`files/${id}`)
  }
}