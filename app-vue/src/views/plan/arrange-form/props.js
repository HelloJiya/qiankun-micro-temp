export default (_this) => {
  const tableHandles = [
    { label: '查看', type: 'text', handle: row => _this.showForm(row) },
    { label: '编辑', type: 'text', handle: row => _this.editForm(row) }
  ]
  const operators = [
    { label: '新增', type: 'primary', click: _this.showForm },
    { label: '批量删除' }
  ]

  const tableCols = [
    { label: '执行人', prop: 'name' },
    { label: '执行对象', prop: 'name' },
    { label: '计划执行时间', prop: 'name' }
  ]

  return {
    tableCols,
    tableHandles,
    operators
  }
}
