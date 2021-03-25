import request, { getBaseUrl } from '@/utils/request'

// 用户
export const user = {
  getUserInfo: (data) => request({
    baseURL: getBaseUrl('baseAccount'),
    url: '/account/current',
    method: 'get',
    data
  }),
  loginOut(data) {
    return request({
      baseURL: getBaseUrl('baseAccount'),
      url: '/account/logout',
      method: 'get',
      data
    })
  }
}

