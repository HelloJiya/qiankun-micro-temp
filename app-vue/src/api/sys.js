import request from '@/utils/request'

export const user = {
  // 获取人员下拉框
  getList: (data) => request({
    url: '/tenant/userList',
    method: 'post',
    data
  })
}
