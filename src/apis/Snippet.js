import Api from './Api'

export default {
  all() {
    return Api.get('snippets')
  },
  getOne(id) {
    return Api.get(`snippets/${id}`)
  },
  save(data) {
    return Api.post('snippets', data)
  },
  update(id, data) {
    return Api.put(`snippets/${id}`, data)
  },
  delete(id) {
    return Api.delete(`snippets/${id}`)
  }
}