<template>
  <common-page>
    <common-search
      :search-list="searchList"
      :search-form="searchForm"
      @get-data="getData"
      @reset-data="$_clearSearch(searchForm,page,getData)"
    />
    <button-group :list="btnList" />
    <div class="search-radio">
      <el-radio-group v-model="searchForm.planType" size="mini" @change="getData()">
        <el-radio-button :label="null">全部</el-radio-button>
        <el-radio-button v-for="(item,index) in PLAN.TYPE" :key="index" :label="item.value">{{ item.label }}</el-radio-button>
      </el-radio-group>
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
  </common-page>
</template>

<script>
import { temp } from '@/api/plan'
import { PLAN } from '@/assets/CONST'
import props from './props'

export default {
  name: 'PlanTemplate',
  data() {
    return {
      PLAN,
      ...props(this),
      searchForm: {
        planType: null
      },
      radio4: '全部',
      // table
      loading: false,
      page: this.$_init('page'),
      tableData: [],
      selectionArr: []

    }
  },
  watch: {
    selectionArr(nV, oV) {
      this.btnList.forEach(item => {
        if (item.label === '批量删除') {
          item.disabled = !nV.length
        }
      })
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 表格数据
    getData() {
      this.$_apiLoading(this, 'loading',
        () => temp.getList(this.$_formatApi(this.searchForm, this.page)).then(res => {
          const { records, total } = this.$deepClone(res.data)
          this.tableData = records
          this.page.total = total
        })
      )
    },
    // 重置
    resetData() {
      const { searchForm } = this
      for (const key in searchForm) {
        this.searchForm[key] = ''
      }
      this.getData()
    },
    // 新增、编辑
    toForm(row) {
      let pathName = 'PlanTemplateForm'
      let query = {}

      if (row && row.id) {
        pathName = 'PlanTemplateFormEdit'
        query = { id: row.id }
      }
      this.$router.push({ name: pathName, query })
    },
    // 批量删除
    async deleteFrom() {
      const isTrue = await this.$confirm('是否删除选中该数据', '提示')
      if (isTrue) {
        const ids = this.selectionArr.map(item => item.id)

        this.$_apiLoading(this, 'loading',
          () => temp.delBatch({ data: { ids }}).then(res => {
            this.$message.success('删除成功')
            this.getData()
          })
        )
      }
    },
    // 复用
    copyFrom(row) {
      this.$_apiLoading(this, 'loading',
        () => temp.copy({ data: { id: row.id }}).then(res => {
          this.$message.success('复用成功')
          this.getData()
        })
      )
    }

  }
}
</script>

<style lang="scss">
.search-radio{
  padding:20px 0;
}

</style>
