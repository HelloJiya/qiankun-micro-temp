import axios from 'axios'
import { Message } from 'element-ui'
import gateway from './gateway'
import { sleep } from '@/utils'
import store from '@/store'

// const ConfigBaseURL = 'http://192.168.3.129:10001/'
// const ConfigBaseURL = 'http://192.168.4.14:10005/'
const ConfigBaseURL = '/api/'

export function getBaseUrl(key = 'CECIMS') {
  return ConfigBaseURL + (gateway[key] || '')
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
    config.headers['tenant-id'] = store.state.micro?.microInfo?.currentOrganID || ''
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  async(response) => {
    const { headers, data, config } = response
    const { success, message } = data

    if (message.code === 'A0507') {
      await sleep(2000)
      location.reload()
    }

    if (config.responseType === 'blob') { // 导出
      var disposition = headers['content-disposition']
      const fileName = disposition ? decodeURI(disposition.substring(disposition.indexOf('=') + 1)) : config.fileName
      const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
      if (!!window.ActiveXObject || 'ActiveXObject' in window) { // 兼容IE
        window.navigator.msSaveOrOpenBlob(blob, `${fileName}`)
      } else {
        const aLink = document.createElement('a')
        aLink.download = fileName
        aLink.style.display = 'none'
        aLink.href = URL.createObjectURL(blob)
        document.body.appendChild(aLink)
        aLink.click()
        URL.revokeObjectURL(aLink.href)
        document.body.removeChild(aLink)
      }
    } else if (headers['content-type'].indexOf('application/json') === -1) {
      return data
    } else {
      if (success) {
        return data
      } else {
        Message.error(message?.message || 'error')
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
