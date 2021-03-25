import request, { getBaseUrl } from '@/utils/request'

// 用户
export const user = {
  getUserInfo: (data) => request({
    baseURL: getBaseUrl('baseAccount'),
    url: '/account/current',
    method: 'get',
    data
  }),
  // 查询菜单
  getSource: data => request({
    baseURL: getBaseUrl('organ'),
    url: '/source/current/tree',
    method: 'post',
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

// 机构

export const organ = {
  // 查询登录机构
  current(data) {
    return request({
      baseURL: getBaseUrl('organ'),
      url: `/organ/list/current`,
      method: 'get',
      data
    })
  },
  // 切换登录机构
  switchCurrent(id) {
    return request({
      baseURL: getBaseUrl('organ'),
      url: `/organ/switch/${id}`,
      method: 'get'
    })
  },
  // 切换默认机构
  oneCurrent(id) {
    return request({
      baseURL: getBaseUrl('organ'),
      url: `/organ/switch/init_tenant/${id}`,
      method: 'get'
    })
  }
}
