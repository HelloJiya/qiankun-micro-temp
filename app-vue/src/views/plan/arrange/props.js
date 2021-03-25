import { PLAN } from '@/assets/CONST'

// ============= 计划
// 搜索
const searchList = [
  { type: 'input', value: 'planName', label: '计划名称' },
  { type: 'input', value: 'creatorName', label: '创建人' },
  { type: 'date', value: 'createTime', valueFormat: 'yyyy-MM-dd', label: '创建时间' }
]

// 表格
const tableCols = (_this) => [
  { label: '计划名称', prop: 'planName' },
  { label: '计划类型', prop: 'planType', formatter: row => {
    const ret = _this.$_findDic(row.planType, PLAN.TYPE)
    row.planType_Name = ret
    return ret
  } },
  { label: '创建人', prop: 'creatorName' },
  { label: '创建时间', prop: 'createTime' },
  { label: '计划备注', prop: 'remark' }
]

// 操作
const tableHandles = (_this) => [
  { label: '查看', type: 'text', handle: row => _this.toForm('show', row) },
  { label: '编辑', type: 'text', handle: row => _this.toForm('edit', row) }
]

export default (_this) => ({
  searchList,
  tableCols: tableCols(_this),
  tableHandles: tableHandles(_this)
})

// ============ 计划人员安排
export const task = (_this) => {
  const tableHandles = [
    { label: '编辑', type: 'text', handle: row => _this.showForm(row), isShow: row => true }
    // { label: '编辑', type: 'text', handle: row => _this.showForm(row), isShow: row => true }
  ]
  const operators = [
    { label: '新增', type: 'primary', click: _this.showForm },
    { label: '批量删除' }
  ]

  const tableCols = [
    { label: '执行人', prop: 'userName' },
    { label: '执行对象', prop: 'execElementList', formatter: row => { return row.execElementList.map(item => item.name).join(',') } },
    { label: '计划执行时间', prop: 'execDateList', formatter: row => { return row.execDateList.length ? row.execDateList.join(',') : '' } },
    { label: '是否跳过节假日', prop: 'skipHoliday', formatter: row => row.skipHoliday ? '是' : '否' }

  ]

  const page = _this.$_init('page')

  return {
    tableCols,
    tableHandles,
    operators,
    page
  }
}

