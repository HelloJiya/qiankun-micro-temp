import axios from 'axios'
import { Message } from 'element-ui'
import gateway from './gateway'
import { toLogin } from '@/utils/app'
import store from '@/store'

const ConfigBaseURL = '/api/'

export function getBaseUrl(key = 'default') {
  // if (!key || !Object.keys(gateway).includes(key)) {
  //   return new Error(`不存在网关${key}`)
  // }
  const gatewayVal = gateway[key] || ''
  return ConfigBaseURL + gatewayVal
}

// create an axios instance
const service = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['tenant-id'] = store.state.app.currentOrganID || ''
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const { headers, data } = response
    const { success, message } = data

    if (message.code === 'A0507') {
      location.reload()
    }

    if (headers['content-type'].indexOf('application/json') === -1) {
      return data
    } else {
      if (success) {
        return data
      } else {
        Message.error(message?.message || 'error')
        // 登录失效
        if (data.code === 50008 || data.code === 50012 || data.code === 50014) {
          // to re-login
          toLogin()
        }
        return Promise.reject(message?.message || 'error')
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
