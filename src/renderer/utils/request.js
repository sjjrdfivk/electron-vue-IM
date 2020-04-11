import axios from 'axios'
import Qs from 'qs'
var instance = axios.create({
  url: '/',

  baseURL: 'http://127.0.0.1:8087/',

  // transformRequest: [function (data) {
  //   return data
  // }],

  transformResponse: [function (data) {
    return data
  }],

  headers: {'X-Requested-With': 'XMLHttpRequest', 'content-type': 'application/json'},

  params: {
  },

  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // transformRequest: [function (data) {
  //   return Qs.stringify(data)
  // }],

  timeout: 30000,

  responseType: 'json', // 默认的

  validateStatus: function (status) {
    return status >= 200 && status < 300
  }
})

/* 请求拦截器 */
instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

/* 响应拦截器 */
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default instance
