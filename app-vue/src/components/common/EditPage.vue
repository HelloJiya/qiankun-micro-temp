<!--
  表单编辑页面，统一title、间距样式、底部提交按钮样式
-->
<template>
  <div class="edit-page">
    <div v-loading="loading" class="eidt-page-box">
      <div class="edit-page-wrap" :style="{padding}">
        <template v-if="title || $slots.title">
          <div class="edit-page-title">
            <slot name="title">
              <span>{{ title }}</span>
            </slot>
          </div>
          <divider />
        </template>
        <div class="edit-page-content">
          <slot />
        </div>
      </div>
      <div v-if="$slots.footer" class="edit-page-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPage',
  props: {
    title: String,
    loading: Boolean,
    padding: String
  },
  data() {
    return {
      // title: 'title'
    }
  },
  created() {
    // this.$route.meta.title = this.title
  }

}
</script>

<style lang='scss'>

$br: 1px solid #E8E8E8;
.edit-page{
  height: 100%;
  overflow: auto;
  padding: 20px;
  // width: 100%;
  box-sizing: border-box;
}
.eidt-page-box{
  min-width: 1200px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.edit-page-wrap{
  flex: 1;
  box-sizing: border-box;
  padding: 35px 40px;
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  .edit-page-title{
    font-size: 16px;
    padding: 0 10px;
    font-weight: bold;
  }
  .edit-page-content{
    flex-grow: 1;
  }
}
.edit-page-footer{
  flex-shrink: 0;
  background: #fff;
  border-top: $br;
  text-align: right;
}

</style>
