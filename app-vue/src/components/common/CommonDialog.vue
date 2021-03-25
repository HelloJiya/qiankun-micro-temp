<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="title"
    v-bind="bind"
    :close-on-click-modal="false"
    v-on="on"
  >
    <slot />
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="$emit('submit')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: String,
    visible: Boolean,
    bind: Object,
    on: Object,
    loading: Boolean
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
  }
}
</script>

<style>

</style>
