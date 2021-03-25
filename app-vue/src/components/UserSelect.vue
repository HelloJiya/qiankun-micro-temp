<template>
  <el-select :value="value" @input="input">
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { user } from '@/api/sys'
export default {
  props: {
    value: [String]
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      user.getList(this.$_formatApi({})).then(res => {
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
