<!--
  日历tag列表
 -->
<template>
  <div>
    <el-tag
      v-for="(item,index) in list"
      :key="item[props.key]"
      class="date-tag-list-item"
      :class="{'is-block':isBlock}"
      @click="$emit('click',item,index)"
    >
      <span class=" saas-ellipsis">{{ item[props.label] }}</span>
    </el-tag>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    limit: Number,
    prop: {
      type: Object,
      default: () => {}
    },
    isBlock: {
      type: Boolean,
      default: true
    },
    props: { type: Object, default: () => ({ key: 'key', label: 'label' }) }
  },
  computed: {
    list() {
      const source = cloneDeep(this.data)
      if (this.limit > 0) {
        source.splice(this.limit, source.length)
      }
      return source
    }
  }
}
</script>

<style lang='scss' scoped>
$namespace : '.date-tag-list';
.is-block{
  display: block;
}

#{$namespace}{
  &-item{
    margin-bottom: 5px;
    span{
      display: inline-block;
      width: 100%;
    }
  }
}

</style>
