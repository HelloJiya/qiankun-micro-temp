<!--
  name: 表格顶部操作按钮组
  props:
    - list:配置数据
      - disabled {boolean}是否禁用
      - click {function} 点击事件
      - label {string} 按钮显示文字
      - type {string} 按钮类型
      - props {object} 其他配置 参考element-ui Button组件

  使用：
  <button-group :list='listArr'></button-group>
 -->
<template>
  <div>
    <el-button
      v-for="(item,index) in list"
      :key="index"
      :disabled="!!item.disabled"
      size="mini"
      :type="item.type"
      v-bind="item.props"
      @click="item.click && item.click()"
    >{{ item.label }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
  props: {
    list: Array,
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
