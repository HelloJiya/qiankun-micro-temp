import { PLAN } from '@/assets/CONST'

// 搜索
const searchList = () => [
  { type: 'input', value: 'templateName', label: '模版名称' }
]

// 头部操作
const btnList = (_this) => [
  { label: '新增', type: 'primary', click: () => _this.toForm() },
  { label: '批量删除', click: _this.deleteFrom, disabled: true }
]

// 表格
const tableCols = (_this) => [
  { label: '模板名称', prop: 'templateName' },
  { label: '计划类型', prop: 'planType', formatter: row => (_this.$_findDic(row.planType, PLAN.TYPE)) },
  { label: '备注', prop: 'remark' }
]

// 操作
const tableHandles = (_this) => [
  { label: '编辑', type: 'text', handle: row => _this.toForm(row) },
  { label: '复用', type: 'text', handle: row => _this.copyFrom(row) }
]

export default (_this) => ({
  searchList: searchList(_this),
  btnList: btnList(_this),
  tableCols: tableCols(_this),
  tableHandles: tableHandles(_this)
})
