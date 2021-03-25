<!--
  name 计对象输入框
 -->
<template>
  <el-select v-model="selected" multiple collapse-tags @input="input">
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { plan } from '@/api/plan'
export default {
  props: {
    value: [String, Array],
    id: String
  },
  data() {
    return {
      list: [],
      selected: []
    }
  },
  watch: {
    id: {
      handler(nV) {
        if (nV) {
          this.getList(nV)
        }
      },
      immediate: true
    },
    value: {
      handler(val) {
        this.selected = val
      },
      immediate: true
    }
  },
  methods: {
    getList(id) {
      plan.getElementList(this.$_formatApi({ id })).then(res => {
        const data = this.$deepClone(res.data)
        this.list = data
      })
    },
    input(val) {
      this.$emit('input', val)
    }
  }
}
</script>

 <style>

 </style>
