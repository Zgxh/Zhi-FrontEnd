import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import { clearLoginInfo } from '@/utils/util'
import { Message } from 'element-ui'

/**
 * 创建 http 请求模块
 */
const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    // 'Accept': 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截，要求必须携带 jwt
 */
http.interceptors.request.use(config => {
  console.log("进入[请求]拦截器............")
  config.headers['Authorization'] = Vue.cookie.get('Authorization') // 请求头带上 token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截，如果 jwt 失效了，则清除登录信息，并跳转登录页面
 */
http.interceptors.response.use(response => {
  console.log("进入[响应]拦截器............")
  if (response.data && response.data.code === 401) { // 401 未认证
    clearLoginInfo()
    router.replace({ name: 'Login' })
  } else if (response.data && response.data.code === 403) {
    Message.error("当前用户无访问权限")
  }
  return response
}, error => {
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  return actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data) // 请求体 json 或 form
}

export default http