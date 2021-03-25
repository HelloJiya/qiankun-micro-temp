<template>
  <common-page type="row">
    <section>
      <common-search
        :search-list="searchList"
        :search-form="searchForm"
        @get-data="getData"
        @reset-data="$_clearSearch(searchForm,page,getData)"
      />
      <!-- <button-group :list="btnList" /> -->
      <div>
        <el-button type="primary" size="mini" @click="toForm()">新增</el-button>
        <el-button size="mini" :disabled="!selectionArr.length" @click="deleteFrom()">批量删除</el-button>
      </div>
      <common-table
        ref="commonTable"
        v-loading="loading"
        is-selection
        :table-data="tableData"
        :table-cols="tableCols"
        :table-handles="tableHandles"
        :props="{
          'highlight-current-row':true
        }"
        :search-form="page"
        @refresh="getData"
        @handle-selection="(arr)=>selectionArr=arr"
        @rowClick="rowClick"
      />
    </section>
    <PlanTask :current-key="planID" :data="form" />
  </common-page>
</template>

<script>
import { plan } from '@/api/plan'
import props, { task } from './props'
import PlanTask from './components/ArrangeTask'

export default {
  name: 'PlaneArrange',
  components: {
    PlanTask
  },
  data() {
    return {
      ...props(this),
      task: task(this),
      searchForm: {},
      // table
      tableData: [],
      planID: '',
      selectionArr: [],
      loading: false,
      page: this.$_init('page'),
      form: {}
    }
  },
  async created() {
    const ret = await this.getData()
    if (ret && this.tableData.length) {
      this.$refs.commonTable.getEl().setCurrentRow(this.tableData[0])
      this.rowClick(this.tableData[0])
    }
  },
  methods: {
    // 表格数据
    getData() {
      return new Promise((resolve) => {
        this.loading = true
        plan.getList(this.$_formatApi(this.searchForm, this.page)).then(res => {
          console.log(res)
          const { records, total } = this.$deepClone(res.data)
          this.tableData = records
          this.page.total = total
          resolve(true)
        }).catch(_ => {
          resolve(false)
        }).finally(_ => {
          this.loading = false
        })
      })
    },
    // 新增、编辑
    toForm(type = 'create', row) {
      const RV = {
        create: 'PlanArrangeForm',
        show: 'PlanArrangeFormShow',
        edit: 'PlanArrangeFormEdit'
      }
      const query = {}
      if (row) {
        query.id = row.id
      }
      this.$router.push({ name: RV[type], query })
    },
    // 批量删除
    async deleteFrom() {
      const isTrue = await this.$confirm('是否删除选中该数据', '提示')
      if (isTrue) {
        const ids = this.selectionArr.map(item => item.id)
        plan.delBatch({ data: { ids }}).then(res => {
          this.$message.success('删除成功')
          this.getData()
        })
      }
    },
    // 表格点击
    rowClick(row, column, event) {
      this.planID = row.id
      this.form = this.$deepClone(row)
    }

  }
}
</script>

<style>

</style>
