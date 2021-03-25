<!--
  使用场景：表单页面内当表单内容分区，卡片形式展示
-->
<template>
  <section class="card">
    <section class="card-header" :class="{'card-form':isForm}">
      <span v-if="title || $slots.title" class="card-header-title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <!-- 按钮 -->
      <div v-if="isForm" class="card-header-operator">
        <span v-if="isEdit" key="save">
          <slot name="save">
            <el-button size="mini" type="" :loading="loading" @click="cancel">取消</el-button>
            <el-button size="mini" type="primary" :loading="loading" @click="$emit('save')">保存</el-button>
          </slot>
        </span>
        <span v-else key="edit">
          <slot name="edit">
            <el-button size="mini" type="primary" @click="$emit('edit')">编辑</el-button>
          </slot>
        </span>
      </div>
    </section>
    <div class="card-content" :class="['card-content-'+split]">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    isForm: Boolean,
    isEdit: Boolean,
    loading: Boolean,
    split: {
      type: String,
      default: 'horizontal',
      validate: val => ['horizontal', 'vertical'].indexOf(val) > -1
    }
  },
  methods: {
    cancel() {
      this.$emit('update:isEdit', false)
      this.$emit('cancel')
    }
  }

}
</script>

<style lang='scss' scoped>
$br: 1px solid #E8E8E8;
$bs: 0 0 8px #d8dade;
$--color-primary: #3265DE;

.card{
  margin: 12px 10px;
  border:$br;
  border-radius: 4px;
  box-shadow: $bs;
  &-header{
    width: 100%;
    &.card-form{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    &-title{
      display: inline-block;
      padding: 10px 15px;

      color: #fff;
      background: $--color-primary;
    }
    &-operator{
      padding:10px;
    }
  }
  &-content{
    padding: 20px;
    &-vertical{
      display: flex;
    }
  }
}
.card + .card{
  margin-top: 40px;
}
</style>
