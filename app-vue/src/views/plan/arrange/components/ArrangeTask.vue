<template>
  <div>
    <common-detail title="计划详情" :list="detailList" />
    <div>
      <el-button type="primary" size="mini" @click="showForm()">新增</el-button>
      <el-button size="mini" :disabled="!selectionArr.length" @click="deleteBatch()">批量删除</el-button>
    </div>
    <common-table
      v-loading="loading"
      is-selection
      :table-data="tableData"
      :table-cols="tableCols"
      :table-handles="tableHandles"
      :search-form="page"
      @refresh="getData"
      @handle-selection="(arr)=>selectionArr=arr"
    />
    <common-dialog :loading="dialogLoading" :visible.sync="dialogVisible" title="新增" @submit="submit">
      <PlanTaskFormDialog v-if="dialogVisible" :id="currentKey" ref="form" :data="dialogForm" />
    </common-dialog>
  </div>
</template>

<script>
import { task } from '../props'
import { plan } from '@/api/plan'
import PlanTaskFormDialog from './ArrangeTaskFormDialog'

export default {
  components: { PlanTaskFormDialog },
  props: {
    currentKey: String,
    data: Object
  },
  data() {
    return {
      ...task(this),
      tableData: [],
      selectionArr: [],
      loading: false,
      dialogVisible: false,
      dialogForm: {},
      dialogLoading: false
    }
  },
  computed: {
    detailList() {
      const list = [
        { label: '计划名称', key: 'planName' },
        { label: '计划类型', key: 'planType_Name' },
        { label: '创建人', key: 'creatorName' },
        { label: '创建时间', key: 'createTime' }
      ]
      return list.map(item => {
        const value = this.data[item.key] || '无'
        return `${item.label}:${value}`
      })
    }
  },
  watch: {
    currentKey(nV, oV) {
      if (nV) {
        this.getData()
      }
    }
  },
  methods: {
    getData() {
      this.loading = true
      plan.getTaskList(this.$_formatApi({ planId: this.currentKey }, this.page)).then(res => {
        const { records, total } = this.$deepClone(res.data)
        this.tableData = records
        this.page.total = total
      }).finally(_ => {
        this.loading = false
      })
    },
    // 弹窗展示
    showForm(row = {}) {
      const form = this.$deepClone(row)

      if (form.execElementList && form.execElementList.length) {
        form.execElementIds = form.execElementList.map(item => item.id)
      }
      this.dialogForm = form
      this.dialogVisible = true
      console.log('showForm', form, this.dialogForm)
    },
    // 弹窗保存
    async submit() {
      const data = await this.$refs.form.getValue()
      if (data) {
        data.planId = this.currentKey
        this.$_apiLoading(this, 'dialogLoading',
          () => plan.savePlanTask(this.$_formatApi(data)).then(res => {
            this.$message.success('成功')
            this.getData()
            this.dialogVisible = false
          })
        )
      }
    },
    // 删除
    async delete(row) {
      const isTrue = await this.$_confirm('是否删除选中')
      if (isTrue) {
        plan.deletePlanTask(row.id).then(res => {
          this.$message.success('删除成功')
          this.getData()
        })
      }
    },
    // 批量删除
    async deleteBatch() {
      const isTrue = await this.$_confirm('是否删除选中')
      if (isTrue) {
        const ids = this.selectionArr.map(item => item.id)
        plan.deleteBatchPlanTask({ data: { ids }}).then(res => {
          this.$message.success('删除成功')
          this.getData()
        })
      }
    }
  }
}
</script>

<style>

</style>
