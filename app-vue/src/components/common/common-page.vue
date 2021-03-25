<template>
  <div class="common-page">
    <div v-if="$slots.left" class="common-page-left">
      <slot name="left" />
    </div>
    <div ref="content" class="common-page-content" :class="[isRow ? 'isFlex' : 'common-page-item']">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonPage',
  props: {
    type: String // 布局类型
  },
  data() {
    return { }
  },
  computed: {
    isRow() {
      return this.type === 'row'
    }
  },
  mounted() {
    if (this.isRow) {
      this.$slots.default.forEach(vn => {
        vn.elm.className = 'common-page-item'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.isFlex{
  display: flex;
}
.common-page{
  padding: 20px;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  &-left{
    background: #fff;
    width: 220px;
    height: 100%;
    flex-shrink: 0;
    border-right: 1px solid #DCDFE6;
  }
  &-content{
    min-width: 1200px !important;
    height: 100%;
    flex: 1 0;
  }
  &-item{
    height: 100%;
    background:#fff;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    flex: 1;
    min-width: 0;
    flex-shrink: 0;
  }
}
.common-page-item+.common-page-item{
  margin-left: 4px;
}
</style>
