<template>
  <div>
    <el-row :gutter="20" class="table-item table-header">
      <el-col v-for="(item,index) in tableCol" :key="index" :span="colSpan">
        <template v-if="item.slotTitle">
          <slot :name="item.slotTitle" />
        </template>
        <template v-else>
          <span>{{ item.label }}</span>
          <span :class="item.icon" />
        </template>
      </el-col>
    </el-row>
    <section class="table-body" :style="{height}">
      <draggable v-model="draggleData" v-bind="dragOptions">
        <transition-group type="transition" name="flip-list">
          <el-row v-for="(item,dataIndex) in data" :key="'body'+dataIndex" :gutter="20" class="table-item">
            <el-col v-for="(colItem,colIndex) in tableCol" :key="colIndex" :span="colSpan">
              <div v-show="(colItem.isShow && colItem.isShow(item)) || !colItem.isShow">
                <!-- 自定义插槽 -->
                <template v-if="colItem.slot">
                  <slot :name="colItem.slot" :prop="{item,dataIndex}" />
                </template>
                <!-- 操作 -->
                <template v-else-if="colItem.type==='operator'">
                  <div class="col-operator el-icon-plus" size="mini" @click="add(dataIndex)" />
                  <div v-show="data.length>1" size="mini" class="col-operator el-icon-delete" @click="remove(dataIndex)" />
                </template>
                <!-- 单选 -->
                <template v-else-if="colItem.type==='radio'">
                  <el-radio-group v-model="item[colItem.prop]">
                    <el-radio
                      v-for="(rItem,rIndex) in colItem.options"
                      :key="rIndex"
                      size="mini"
                      :label="rItem"
                      v-bind="colItem.bind"
                    />
                  </el-radio-group>
                </template>
                <!-- 下拉框 -->
                <template v-else-if="colItem.type === 'select'">
                  <el-select v-model="item[colItem.prop]" size="mini" placeholder="">
                    <el-option
                      v-for="sItem in colItem.options"
                      :key="sItem.value"
                      :label="sItem.label"
                      :value="sItem.value"
                      v-bind="colItem.bind"
                    />
                  </el-select>
                </template>
                <!-- switch开关 -->
                <template v-else-if="colItem.type === 'switch'">
                  <el-switch
                    v-model="item[colItem.prop]"
                    size="mini"
                    v-bind="colItem.bind"
                    @change="colItem.change($event,item)"
                  />
                </template>
                <!-- 输入框 -->
                <template v-else>
                  <el-input
                    v-model="item[colItem.prop]"
                    size="mini"
                    placeholder=""
                    :maxlength="colItem.maxlength"
                    v-bind="colItem.bind"
                    :disabled="colItem | getDisabled(item)"
                  />
                </template>
              </div>
            </el-col>
          </el-row>
        </transition-group>
      </draggable>
    </section>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  filters: {
    getDisabled(row, data) {
      if (row.disabled && typeof row.disabled === 'function') {
        return row.disabled(data)
      }
      return row.disabled
    }
  },
  components: { draggable },
  props: {
    tableCol: Array,
    data: Array,
    height: String,
    addDefault: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dragOptions: {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  computed: {
    colSpan() {
      const { length } = this.tableCol
      return Math.floor(24 / length)
    },
    draggleData: {
      get() {
        return this.data
      },
      set(val) {
        this.$emit('update:data', val)
      }
    }
  },
  methods: {
    add(index) {
      const init = this.$deepClone(this.addDefault) || {}
      this.data.splice(index + 1, 0, init)
    },
    remove(index) {
      this.data.splice(index, 1)
    }
  }
}
</script>

<style lang='scss'>
$text-color:#3C4353;
$bg:#F0F2F5;
$br: 1px solid #E8E8E8;

.table-item{
  display: flex;
  align-items: center;
  margin: 0 !important;
  padding: 8px 20px;

  border-bottom: $br;
}
.table-header{
  padding: 15px 20px;

  font-size: 14px;
  border-top: $br;

  background: $bg;
  .table-input{
    /deep/.el-input__inner{
      border: none;
    }
  }
}
.table-body{
  overflow: auto;
}

.col-operator{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background:$bg;

  font-size: 14px;
  color:$text-color;
  cursor: pointer;

}
.col-operator +.col-operator{
  margin-left: 4px;
}

.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
  opacity: 0.5;
  background: #cbd4d8c5;
}

</style>
