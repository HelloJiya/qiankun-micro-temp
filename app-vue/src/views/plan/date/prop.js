import { PLAN } from '@/assets/CONST'
export const tableProp = (_this) => {
  const tableCols = [
    { label: '执行人', prop: 'executorUserName' },
    { label: '执行对象', prop: 'execElementList', formatter: row => row.execElementList.map(item => item.name).join(',') },
    { label: '计划名称', prop: 'planName' }
  ]
  const tableHandles = [
    { label: '编辑', type: 'text', handle: row => _this.toggleDialog('EDIT', row) },
    { label: '删除', type: 'text', handle: row => _this.delete(row) }
  ]

  return {
    tableCols,
    tableHandles
  }
}

export const dateProp = (_this) => {
  const searchList = [
    { type: 'input', value: 'planName', label: '计划名称' }
  ]

  return {
    searchList
  }
}

export const infoTableProp = (_this) => {
  const searchList = [
    { type: 'input', value: 'planName', label: '计划名称' },
    { type: 'input', value: 'execElementNames', label: '执行对象' },
    { type: 'input', value: 'executorUserName', label: '执行人' },
    { type: 'date', value: 'planDate', label: '执行时间', valueFormat: 'yyyy-MM-dd' }
  ]
  const tableCols = [
    { label: '计划名称', prop: 'planName' },
    { label: '计划类型', prop: 'planType', formatter: row => (_this.$_findDic(row.planType, PLAN.TYPE)) },
    { label: '执行人', prop: 'executorUserName' },
    { label: '执行时间', prop: 'planDate' },
    { label: '执行对象', prop: 'execElementNames' }
  ]

  return {
    searchList,
    tableCols,
    page: _this.$_init('page')
  }
}

