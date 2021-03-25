<template>
  <div class="" style="display: flex">
    <el-form size="mini" inline :class="{'left-content': canToggle}" @submit.native.prevent>
      <el-form-item v-for="(item, index) in searchList" v-show="!item.noShow || isToggle" :key="index" :label="item.label">
        <!-- 输入框 -->
        <el-input v-if="item.type === 'input'" v-model.trim="searchForm[item.value]" :maxlength="item.maxlength || 30" :placeholder="`请输入${item.placeholder || item.label}`" @keyup.enter.native="$emit('get-data')" />
        <!-- 选择框 -->
        <el-select v-if="item.type === 'select'" v-model="searchForm[item.value]" :placeholder="`请选择${item.placeholder || item.label}`">
          <el-option v-for="(ele, index2) in item.dataList()" :key="index2" :value="ele[item.prop && item.prop.value]" :label="ele[item.prop && item.prop.label]" />
        </el-select>
        <!-- 日期选择 -->
        <el-date-picker v-if="item.type === 'datetimerange' || item.type === 'daterange' || item.type === 'date' || item.type === 'datetime'" v-model="searchForm[item.value]" :type="item.type" :value-format="item.valueFormat || null" range-separator="至" start-placeholder="开始日期" placeholder="选择日期" end-placeholder="结束日期" />
        <!-- <el-date-picker v-model="searchForm[item.value]" :type="item.type" placeholder="选择日期" /> -->
        <!-- 级联选择 -->
        <el-cascader v-if="item.type === 'cascader'" v-model="searchForm[item.value]" :options="item.options()" :props="item.props" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('get-data')">查询</el-button>
        <el-button @click="$emit('reset-data')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if="canToggle" class="right-content">
      <span style="cursor: pointer" @click="onChangeToggle"><i :style="{ transform: isToggle ? 'rotate(180deg)' : 'rotate(0deg)' }" class="el-icon-arrow-down" /> 更多</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array,
      default() {
        return []
      }
    },
    searchForm: {
      type: Object,
      default() {
        return {}
      }
    },
    canToggle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isToggle: false
    }
  },
  mounted() {
    this.isToggle = false
  },
  methods: {
    onChangeToggle() {
      this.isToggle = !this.isToggle
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.el-form-item {
  margin-right: 40px;
  // transition: all 1s;
    ::v-deep.el-input__inner {
      height: 30px;
      line-height: 30px;
    }
}
.el-form-item:last-child{
  margin-right: 0;
}
.left-content {
  flex: 1;
}
.right-content {
  color:$--color-primary;
  padding-right: 40px;
  font-size: 12px;
  line-height: 28px;
}

</style>
