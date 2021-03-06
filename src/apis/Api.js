import axios from 'axios'

const Api = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api'
  baseURL: 'https://dropbox-backend180220.herokuapp.com/api'
})

Api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');

    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
},
(error) => {
    return Promise.reject(error);
});

export default Api;
