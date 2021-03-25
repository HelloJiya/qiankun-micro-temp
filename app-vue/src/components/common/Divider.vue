<!--
 分割线组件
 margin：间距 默认12px
-->

<template>
  <div ref="divider" :style="style" class="saas-divider" />
</template>

<script>
export default {
  name: 'Divider',
  props: {
    margin: String
  },
  computed: {
    style() {
      const ret = {}
      if (this.margin) {
        ret.margin = this.margin
      }
      return ret
    }
  }

}
</script>

<style lang="scss">
.saas-divider{
  background-color: #DCDFE6;
  position: relative;
  display: block;
  height: 1px;
  width: 100%;
  margin: 12px 0;
}
</style>
