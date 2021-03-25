export default [
  {
    extra:{path: '/ims/plan'},
    code:'Plan',
    name: '计划管理' ,
    children: [{
      extra:{path: '/ims/plan/template'},
      code: 'PlanTemplate',
      name: '表模板管理'
    },{
      extra:{path: '/ims/plan/arrange'},
      code: 'PlaneArrange',
      name: '计划安排'
    }
    ,{
      extra:{path: '/ims/plan/date'},
      code: 'PlanDate',
      name: '计划日历'
    }
  ]
  },
  {
    extra:{path: '/ims/asset'},
    code:'Asset',
    name: '资产管理' ,
    children: [{
      extra:{path: '/ims/asset/assetReceiveBorrow'},
      code: 'assetReceiveBorrow',
      name: '资产领用/借用'
    }, {
      extra:{path: '/ims/asset/assetWithdrawal'},
      code: 'assetWithdrawal',
      name: '资产退库'
    }, {
      extra:{path: '/ims/asset/assetRetire'},
      code: 'assetRetire',
      name: '资产报废'
    }, {
      extra:{path: '/ims/asset/apply'},
      code: 'apply',
      name: '申请管理'
    },{
      extra:{path: '/ims/asset/assetRegister'},
      code: 'assetRegister',
      name: '资产登记'
    },{
      extra:{path: '/ims/asset/sparePartsManage'},
      code: 'sparePartsManage',
      name: '备件管理'
    }]
  },
  {
    extra:{path: '/ims/workOrder'},
    code:'WorkOrder',
    name: '工单管理' ,
    children: [{
      extra:{path: '/ims/workOrder/workOrderPool'},
      code: 'workOrderPool',
      name: '工单池'
    }, {
      extra:{path: '/ims/workOrder/myWorkOrder'},
      code: 'myWorkOrder',
      name: '我的工单'
    },{
      extra:{path: '/ims/workOrder/workOrderLedger'},
      code: 'workOrderLedger',
      name: '工单台账'
    }]
  },{
    extra:{path: '/ims/standard'},
    code:'Standard',
   name: '标准管理' ,
    children: [{
      extra:{path: '/ims/standard/storeManage'},
      code: 'storeManage',
     name: '仓库管理'
    }, {
      extra:{path: '/ims/standard/assetsType'},
      code: 'assetsType',
     name: '资产分类'
    }, {
      extra:{path: '/ims/standard/supplierManage'},
      code: 'supplierManage',
     name: '供应商管理'
    },
    // {
    //   extra:{path: 'sharedKnowledge'},
    //   name: 'sharedKnowledge',
    //  name: '知识共享'
    // }, {
    //   extra:{path: 'knowledgeManage'},
    //   name: 'knowledgeManage',
    //  name: '知识管理'
    // },
    {
      extra:{path: '/ims/standard/festivalManage'},
      code: 'festivalManage',
      name: '节假日管理'
    }]
  }
]