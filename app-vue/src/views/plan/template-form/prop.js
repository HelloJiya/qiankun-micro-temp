import { PLAN } from '@/assets/CONST'

// 元素类型 单选 0 文本 1
// 填项类型  计划时 0, 维保时 1
const eleColConfig = [
  { label: '数据项名称', prop: 'name', maxlength: '32' },
  { label: '数据项类型', prop: 'elementType', type: 'select', options: PLAN.ELEMENT_TYPE },
  { label: '可选项', prop: 'options', maxlength: '64', isShow: row => row.elementType === 0 },
  { label: '数据项内容', prop: 'content', maxlength: '64', disabled: (row) => row.fillType === 1 },
  { label: '维保时填写', prop: 'fillType', bind: { 'active-value': 1, 'inactive-value': 0 }, type: 'switch', slotTitle: 'nameTitle', change: (val, row) => { if (val) { row.content = '' } } },
  { label: '操作', type: 'operator' }
]
const eleInit = { name: '', elementType: 1, content: '', options: '', fillType: 0 }

const headerConfig = [
  { label: '列内容', prop: 'name', maxlength: '32' },
  { label: '数据项类型', prop: 'elementType', type: 'select', options: PLAN.ELEMENT_TYPE },
  { label: '可选项', prop: 'options', maxlength: '64', isShow: row => row.elementType === 0 },
  { label: '操作', type: 'operator' }
]
const headerInit = { name: '', elementType: 1, options: '' }

const rowConfig = [
  { label: '行内容', prop: 'name', maxlength: '32' },
  { label: '操作', type: 'operator' }
]
const rowInit = { name: '' }

export default {
  eleColConfig,
  eleInit,
  headerConfig,
  headerInit,
  rowConfig,
  rowInit,
  height: '280px'
}
