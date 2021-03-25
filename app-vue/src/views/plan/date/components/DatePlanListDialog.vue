<!--
  计划日历详情（弹窗）
-->
<template>
  <el-dialog :visible.sync="dialogVisible" title="详情">
    <div v-loading="loading">
      <common-search
        :search-list="searchList"
        :search-form="searchForm"
        @get-data="getData"
        @reset-data="$_clearSearch(searchForm,false,getData)"
      />
      <common-table
        height="400px"
        :table-data="tableData"
        :table-cols="tableCols"
        :search-form="page"
        :is-handle="false"
      />
    </div>
  </el-dialog>
</template>

<script>
import { infoTableProp } from '../prop'
import { date } from '@/api/plan'
export default {
  props: {
    visible: Boolean,
    data: {
      type: Array,
      default: () => []
    },
    date: Object
  },
  data() {
    return {
      ...infoTableProp(this),
      tableData: [],
      searchForm: {},
      loading: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {

  },
  mounted() {
    this.$set(this.searchForm, 'planDate', this.date.format('yyyy-MM-DD'))
    this.getData()
  },
  methods: {
    getData() {
      this.$_apiLoading(this, 'loading',
        () => date.getPlanPage(this.$_formatApi(this.searchForm, this.page)).then(res => {
          const { records, total } = this.$deepClone(res.data)
          this.tableData = records
          this.page.total = total
        })
      )
    }
  }

}
</script>

<style>

</style>
