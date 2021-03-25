<template>
  <el-dialog :visible.sync="isShow" title="新增">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="执行人">
        <el-select v-model="form.name" placeholder="">
          <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="执行对象">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="执行时间">
        <el-input v-model="form.time" />
      </el-form-item>
      <el-form-item label="执行时间范围">
        <el-input v-model="form.time" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      form: {},
      userOptions: []
    }
  },
  computed: {
    isShow: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  }
}
</script>

<style>

</style>
