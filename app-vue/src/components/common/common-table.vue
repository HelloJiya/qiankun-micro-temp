<!--表格组件 -->
<template>
  <section class="table-page">
    <section class="content-table">
      <el-table
        ref="table"
        :data="tableData"
        :size="size"
        :height="height"
        :max-height="maxHeight"
        :row-class-name="tableRowClassName"
        :row-key="rowKey"
        :header-cell-class-name="handleHeaderClass"
        v-bind="props"
        @select="selectChange"
        @row-click="rowClick"
        @select-all="$emit('select-all', $event)"
        @selection-change="$emit('handle-selection', $event)"
      >
        <el-table-column v-if="isSelection" type="selection" align="center" :selectable="handleIsSelect || defaultSelect" />
        <el-table-column v-if="isIndex" type="index" label="序号" align="center" width="50" />
        <!-- 数据栏 -->
        <el-table-column
          v-for="(item, index) in tableCols"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :formatter="item.formatter"
          :width="item.width"
          :align="item.align"
          :show-overflow-tooltip="item.showTooltip"
          :sortable="item.sortable"
        >
          <template slot-scope="scope">
            <template v-if="item.render">
              <col-render :row="scope.row" :index="index" :column="item" :render="item.render" />
            </template>
            <template v-else>
              <span :style="item.itemStyle && item.itemStyle(scope.row)">{{ (item.formatter && item.formatter(scope.row)) || scope.row[item.prop] }}</span>
            </template>
          </template>
        </el-table-column>
        <!-- 操作栏 -->
        <el-table-column v-if="isHandle" :width="handleWidth" label="操作">
          <template slot-scope="scope">
            <template v-for="(item, index) in tableHandles">
              <el-button
                v-if="(item.isShow && item.isShow(scope.row, scope.$index)) || !item.isShow"
                :key="index"
                :type="item.type"
                :icon="item.icon"
                :size="item.size"
                :disabled="item.disabled && item.disabled(scope.row, scope.$index)"
                @click.native.prevent="item.handle(scope.row, scope.$index)"
              >{{ item.label }}</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section v-if="isPage" class="content-pagination">
      <el-pagination
        layout="total,sizes ,prev, pager, next,jumper"
        :page-size="searchForm.pageSize"
        :current-page="searchForm.pageNum"
        :total="searchForm.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </section>
  </section>
</template>

<script>

export default {
  components: {
    colRender: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, data) => {
        const params = {
          row: data.props.row,
          index: data.props.index
        }
        if (data.props.column) params.column = data.props.column
        return data.props.render(h, params)
      }
    }
  },
  props: {
    // 树形数据
    treeProps: {
      type: Object,
      default: () => {}
    },
    // 表格数据
    tableData: { type: Array, required: true, default: function() { return [] } },
    // 表格分页数据
    searchForm: { type: Object, default: function() {
      return { pageSize: 10, pageNum: 1, total: 0 }
    }
    },
    // 表格列
    tableCols: { type: Array, default: function() {
      return []
    } },
    // 表格操作列
    tableHandles: { type: Array, default: function() {
      return []
    } },
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    // 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    // 是否显示操作列
    isHandle: { type: Boolean, default: true },
    // 是否显示分页
    isPage: { type: Boolean, default: true },
    // 表格型号：mini,medium,small
    size: { type: String, default: 'medium' },
    // 操作列宽度
    handleWidth: { type: String, default: '100px' },
    rowKey: { type: String, default: 'id' },
    // 判断是否可选
    handleIsSelect: { type: Function, default: null },
    // 表头的样式
    headerClass: { type: String, default: '' },
    // 表格高度
    height: { type: String, default: '100%' },
    maxHeight: { type: String, default: '100%' },
    props: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    maxNum() {
      return Math.ceil(this.searchForm.total / this.searchForm.pageSize) || 1
    }
  },
  watch: {
    maxNum(val) {
      if (val < this.searchForm.pageNum) {
        this.searchForm.pageNum = val
        this.$emit('refresh')
      }
    }
  },
  methods: {
    getEl() {
      return this.$refs.table
    },
    rowClick(row, column, event) {
      this.$emit('rowClick', row, column, event)
    },
    defaultSelect(row, index) {
      return true
    },
    handleHeaderClass(row) {
      if (!this.headerClass) return
      if (row.columnIndex === 0) {
        return this.headerClass
      }
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val
      this.$emit('refresh')
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.$emit('refresh')
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'stripe-row'
      }
      return ''
    },
    selectChange(selection, row) {
      this.$emit('select', selection, row)
    },
    renderHeader(h, obj) {
      console.log(arguments)
      if (obj.$index === 5) {
        return h('span', { class: 'tableColumn' }, obj.column.label)
      } else {
        return h('span', obj.column.label)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.table-page {
  // height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  // padding-bottom: 20px;
  overflow: hidden;
  min-height: 0;
  ::v-deep {
    .el-button--text {
      // color:$--color-primary;
      padding: 0 !important;
    }
    .el-button + .el-button {
      margin-left: 15px;
    }
  }
}
.content-table {
  flex: 1;
  overflow: hidden;
  .el-table ::v-deep .disabledSelection > .cell {
    padding: 0;
    height: 14px;
    width: 14px;
    background-color: #edf2fc;
    border: 1px solid #DCDFE6 !important;
    border-radius: 2px;
    cursor: not-allowed;
    .el-checkbox {
      display: none;
    }
  }
}
.content-pagination {
  flex-shrink: 0;
  padding: 20px 0;
  .el-pagination {
    text-align: center
  }
}
</style>
