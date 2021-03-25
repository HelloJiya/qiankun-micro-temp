// 计划
export const PLAN = {
  // 计划类型 0 年度巡检 1 季度巡检 2 月巡检 3 周巡检 4 日巡检 5 年保养 6 季保养 7 月保养 8 周保养 9 日保养
  TYPE:[
    {value:0,label:'年度巡检计划'},
    {value:1,label:'季度巡检计划'},
    {value:2,label:'月巡检计划'},
    {value:3,label:'周巡检计划'},
    {value:4,label:'日巡检计划'},
    {value:5,label:'年保养计划'},
    {value:6,label:'季保养计划'},
    {value:7,label:'月保养计划'},
    {value:8,label:'周保养计划'}
  ],
  // 元素类型 单选 0 文本 1
  ELEMENT_TYPE:[
    {value:0,label:'单选'},
    {value:1,label:'文本'}
  ],
  // 填项类型  计划时 0, 维保时 1
  FILL_TYPE:[
    {value:0,label:'计划时'},
    {value:1,label:'维保时'}
  ]

}

// 工单
export const WORKORDER = {
  // 紧急状态
  LEVEL_LIST:[
    { name: '普通',code: '0' },
    { name: '紧急',code: '1'}
  ],
  // 工单状态
  STATUS_LIST:[
    { name: '待处理',code: '4',show: true },
    { name: '处理中',code: '3',show: true },
    { name: '已完成',code: '2',show: true },
    { name: '已取消',code: '1',show: true },
    { name: '已撤销',code: '0',show: false }
  ],
  // 工单类型
  TYPE_LIST:[
    { name: '故障类',code: '0' },
    { name: '巡检类',code: '2' },
    { name: '服务类',code: '1' },
    { name: '保养类',code: '3' }
  ],
  // 逾期状态
  OVERDUE_LIST:[
    { name: '逾期完成',code: '0' },
    { name: '逾期未完成',code: '1' },
    { name: '未逾期完成',code: '2' },
    { name: '未逾期未完成',code: '3' }
  ]
}
