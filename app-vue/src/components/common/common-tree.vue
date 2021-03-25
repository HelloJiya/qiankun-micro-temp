<template>
  <div class="common-tree">
    <div class="common-tree-head">
      <div v-if="showTopBtns">
        <el-button v-if="isDelete" type="primary" plain size="small" @click="deltSuccess">取消删除</el-button>
        <el-button v-show="!isDelete" type="primary" size="small" @click="$emit('primaryClick')">{{
          primaryText
        }}</el-button>
        <el-button size="small" :disabled="treeData.length === 0" @click="detele">删除</el-button>
      </div>
      <el-input
        v-if="showTopInput"
        v-model="filterText"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        size="small"
      />
      <div v-if="headerTitle">
        {{ headerTitle }}
      </div>
    </div>
    <div class="common-tree-body">
      <p v-if="treeData.length > 0 && showAll">全部</p>
      <el-tree
        ref="tree"
        :node-key="nodeKey"
        :data="treeDataOld"
        :draggable="draggable"
        :show-checkbox="isDelete"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
        @node-click="handleNodeClick"
        @node-drop="nodeDrop"
      >
        <div slot-scope="{ node, data }" class="tree-label" :style="{width: isShowOperate ? '' : 'calc(100% - 48px)'}">
          <span :class="{'saas-ellipsis': !isShowOperate}" :style="{width: `calc(100% - ${isShowOperate ? '70px' : '0px'})`, display: isShowOperate ? 'inline' : 'inline-block'}" :title="changeName(node)"> {{ changeName(node) }} </span>
          <div class="tree-label-right" :style="{display: isShowOperate ? 'flex' : 'none'}">
            <el-button
              type="text"
              size="mini"
              @click="() => $emit('add', node, data)"
            >
              <i class="el-icon-plus" />
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => $emit('edit', node, data)"
            >
              <i class="el-icon-edit-outline" />
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => $emit('remove', node, data)"
            >
              <i class="el-icon-delete" />
            </el-button>
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 树数据
    treeData: {
      type: Array,
      default: () => []
    },
    // 是否可以拖拽
    draggable: {
      type: Boolean,
      default: false
    },
    // 顶部主要按钮的文本
    primaryText: {
      type: String,
      default: '添加角色'
    },
    // 是否可选
    showCheckbox: {
      type: Boolean,
      default: false
    },
    // 是否显示全部
    showAll: {
      type: Boolean,
      default: true
    },
    // 是否显示操作按钮
    isShowOperate: {
      type: Boolean,
      default: true
    },
    // 是否显示搜索框
    showTopInput: {
      type: Boolean,
      default: true
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'name'
        }
      }
    },
    // 当前选中对象
    currentData: {
      type: Object,
      default: () => { return {} }
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 是否显示头部操作按钮
    showTopBtns: {
      type: Boolean,
      default: true
    },
    // 头部标题
    headerTitle: {
      type: String,
      default: ''
    },
    // 是否开启改变选中节点的二次确认
    hasChangeCheck: {
      type: Boolean,
      default: false
    },
    // 改变当前选中项的提示语
    changeNodeTips: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      filterText: '',
      treeDataOld: this.treeData,
      isDelete: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    treeData: {
      handler(val) {
        this.treeDataOld = JSON.parse(JSON.stringify(val))
      },
      deep: true
    },
    currentData: {
      handler(val) {
        this.$nextTick(() => {
          val && val[this.nodeKey] && this.$refs.tree.setCurrentNode(val)
        })
      },
      immediate: true
    }
  },

  methods: {
    // 切换删除和删除事件
    detele() {
      if (!this.isDelete) {
        this.isDelete = true
      } else {
        if (!this.$refs.tree.getCheckedNodes().length) {
          this.$message({
            type: 'error',
            message: '请先选择' + this.primaryText.slice(2)
          })
        } else {
          this.$emit('deleteClick', this.$refs.tree.getCheckedNodes())
        }
      }
    },
    // 删除完成回调
    deltSuccess() {
      this.isDelete = false
      this.treeDataOld = JSON.parse(JSON.stringify(this.treeDataOld))
    },
    // 拖拽完成事件
    nodeDrop(oneNode, twoNode, type) {
      if (type !== 'inner' && oneNode.data.parentId === twoNode.data.parentId) {
        const arr = JSON.parse(JSON.stringify(this.treeDataOld))
        // console.log(this.getTreeIdList(arr))

        this.$emit('nodeDrop', oneNode.data, twoNode.data, 'sort', this.getTreeIdList(arr))
      } else {
        this.$emit('nodeDrop', oneNode.data, twoNode.data, 'inner')
      }
    },
    getTreeIdList(val, a) {
      const arr = []
      for (let i = 0; i < val.length; i++) {
        if (val[i].children && val[i].children.length) {
          arr.push({ id: val[i].id, children: this.getTreeIdList(val[i].children) })
        } else {
          arr.push({ id: val[i].id })
        }
      }
      return arr
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    changeName(val) {
      return val.data[this.defaultProps.label]
    },
    // 设置树当前的选中状态
    setCurrentKey(key) {
      this.$refs.tree.setCurrentKey(key)
    },
    handleNodeClick(data, node) {
      if (data[this.nodeKey] === this.currentData[this.nodeKey]) return
      console.log('data, node: ', this.hasChangeCheck)
      if (this.hasChangeCheck) {
        this.$handleConfirm(this.changeNodeTips).then(() => {
          this.$emit('handleNodeClick', data, node)
        }).catch(() => {
          this.$message('已取消操作')
          this.$nextTick(() => {
            this.$refs.tree.setCurrentNode(this.currentData)
          })
        })
      } else {
        this.$emit('handleNodeClick', data, node)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.common-tree {
  ::v-deep {
    .el-tree-node__content {
      .tree-label-right {
        width: 70px;
        margin-left: 20px;
        button {
          display: none;
          padding: 0 !important;
        }
      }
    }
    .el-tree-node__content:hover {
      .tree-label-right {
        display: flex;
        button {
          display: block !important;
        }
      }
    }
  }
  .common-tree-head {
    padding: 20px;
    // display: flex;
    // flex-direction: column;
    border-bottom: 1px solid rgba(220, 223, 230, 1);
    .el-input {
      margin-top: 15px;
    }
  }
  .common-tree-body {
    padding: 20px;
    .tree-label {
      display: flex;
      align-items: center;

      font-size: 14px;
      font-weight: 400;
      // color: #3c4353;
    }
    // .tree-label:hover{
    //     &>div{
    //         display: inline-block;
    //     }
    // }
  }
}
</style>
