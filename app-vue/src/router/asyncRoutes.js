export const asyncRoutes = [
  {
    path: '/plan',
    component: () => import('@/layout'),
    name: 'Plan',
    redirect: '/plan/template',
    meta: { title: '计划管理' },
    children: [{
      path: 'template',
      name: 'PlanTemplate',
      component: () => import('@/views/plan/template/index'),
      meta: { title: '表模板管理' }
    }, {
      path: 'template-form',
      name: 'PlanTemplateForm',
      component: () => import('@/views/plan/template-form/index'),
      hidden: true,
      meta: { title: '新增表模板', confirm: true }
    }, {
      path: 'template-form/edit',
      name: 'PlanTemplateFormEdit',
      component: () => import('@/views/plan/template-form/edit'),
      hidden: true,
      meta: { title: '编辑表模板', confirm: true }
    }, {
      path: 'arrange',
      name: 'PlaneArrange',
      component: () => import('@/views/plan/arrange/index'),
      meta: { title: '计划安排' }
    }, {
      path: 'arrange-form',
      name: 'PlanArrangeForm',
      component: () => import('@/views/plan/arrange-form/index'),
      meta: { title: '新增计划', confirm: true },
      hidden: true
    }, {
      path: 'arrange-form/edit',
      name: 'PlanArrangeFormEdit',
      component: () => import('@/views/plan/arrange-form/edit'),
      meta: { title: '编辑计划', confirm: true },
      hidden: true
    }, {
      path: 'arrange-form/show',
      name: 'PlanArrangeFormShow',
      component: () => import('@/views/plan/arrange-form/show'),
      meta: { title: '查看计划' },
      hidden: true
    }, {
      path: 'date',
      name: 'PlanDate',
      component: () => import('@/views/plan/date'),
      meta: { title: '计划日历' }
    }]
  },
  {
    path: '/asset',
    name: 'Asset',
    component: () => import('@/layout'),
    redirect: '/asset/assetRetire',
    meta: { title: '资产管理' },
    children: [{
      path: 'assetReceiveBorrow',
      name: 'assetReceiveBorrow',
      component: () => import('@/views/asset/assetReceiveBorrow/index'),
      meta: { title: '资产领用/借用' }
    }, {
      path: 'assetWithdrawal',
      name: 'assetWithdrawal',
      component: () => import('@/views/asset/assetWithdrawal/index'),
      meta: { title: '资产退库' }
    }, {
      path: 'assetRetire',
      name: 'assetRetire',
      component: () => import('@/views/asset/assetRetire/index'),
      meta: { title: '资产报废' }
    }, {
      path: 'apply',
      name: 'apply',
      component: () => import('@/views/asset/apply/index'),
      meta: { title: '申请管理' }
    }, {
      path: 'assetRegister',
      name: 'assetRegister',
      component: () => import('@/views/asset/assetRegister/index'),
      meta: { title: '资产登记' }
    }, {
      path: 'sparePartsManage',
      name: 'sparePartsManage',
      component: () => import('@/views/asset/sparePartsManage/index'),
      meta: { title: '备件管理' }
    }]
  },
  {
    path: '/workOrder',
    name: 'WorkOrder',
    component: () => import('@/layout'),
    redirect: '/workOrder/workOrderPool',
    meta: { title: '工单管理' },
    children: [{
      path: 'workOrderPool',
      name: 'workOrderPool',
      component: () => import('@/views/workOrder/workOrderPool/index'),
      meta: { title: '工单池' }
    }, {
      path: 'myWorkOrder',
      name: 'myWorkOrder',
      component: () => import('@/views/workOrder/myWorkOrder/index'),
      meta: { title: '我的工单' }
    }, {
      path: 'workOrderLedger',
      name: 'workOrderLedger',
      component: () => import('@/views/workOrder/workOrderLedger/index'),
      meta: { title: '工单台账' }
    }]
  },
  {
    path: '/standard',
    name: 'Standard',
    component: () => import('@/layout'),
    meta: { title: '标准管理' },
    children: [{
      path: 'storeManage',
      name: 'storeManage',
      component: () => import('@/views/standard/storeManage/index'),
      meta: { title: '仓库管理' }
    }, {
      path: 'assetsType',
      name: 'assetsType',
      component: () => import('@/views/standard/assetsType/index'),
      meta: { title: '资产分类' }
    }, {
      path: 'supplierManage',
      name: 'supplierManage',
      component: () => import('@/views/standard/supplierManage/index'),
      meta: { title: '供应商管理' }
    },
    {
      path: 'festivalManage',
      name: 'festivalManage',
      component: () => import('@/views/standard/festivalManage/index'),
      meta: { title: '节假日管理' }
    }]
  }
]
