import request from '@/utils/request'

// 模板
export const temp = {
  // 列表
  getList: (data) => request({
    url: '/template/page',
    method: 'post',
    data
  }),

  // 新增、编辑
  save: (data) => {
    const method = data.data?.template?.id ? 'put' : 'post'
    return request({
      url: '/template',
      method,
      data
    })
  },

  // 删除
  delBatch: (data) => request({
    url: '/template',
    method: 'delete',
    data
  }),

  // 详情
  getInfo: (id) => request({
    url: `/template/${id}`,
    method: 'post'
  }),

  // 复用
  copy: (data) => request({
    url: `/template/copy`,
    method: 'post',
    data
  })
}

export const plan = {
  // 列表
  getList: (data) => request({
    url: '/plan/page',
    method: 'post',
    data
  }),

  // 新增、编辑
  save: (data) => {
    const method = data.data?.plan?.id ? 'put' : 'post'
    return request({
      url: '/plan',
      method,
      data
    })
  },

  // 删除
  delBatch: (data) => request({
    url: '/plan',
    method: 'delete',
    data
  }),

  // 详情
  getInfo: (id) => request({
    url: `/plan/${id}`,
    method: 'post'
  }),

  // 获取计划执行对象列表
  getElementList: (data) => request({
    url: '/plan/element/list',
    method: 'post',
    data
  }),

  // ==============================
  // ===================计划安排
  // 计划任务列表
  getTaskList: (data) => request({
    url: '/planTask/page',
    method: 'post',
    data
  }),
  // 人员安排：（新增、编辑）
  savePlanTask: (data) => request({
    url: '/planTask',
    method: data.data.id ? 'put' : 'post',
    data
  }),
  deleteBatchPlanTask: (data) => request({
    url: '/planTask',
    method: 'delete',
    data
  })
}

// 日历
export const date = {
  // 列表
  getList: (data) => request({
    url: '/planTaskDate/list',
    method: 'post',
    data
  }),
  edit: (data) => request({
    url: '/planTaskDate/edit',
    method: 'post',
    data
  }),
  delete: (id) => request({
    url: `/planTaskDate/${id}`,
    method: 'delete'
  }),
  change: (data) => request({
    url: '/planTaskDate/change',
    method: 'post',
    data
  }),
  getPlanPage: (data) => request({
    url: '/planTaskDate/page',
    method: 'post',
    data
  })
}
