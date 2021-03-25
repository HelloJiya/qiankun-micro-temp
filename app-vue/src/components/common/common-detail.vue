<template>
  <div class="common-detail">
    <div class="common-detail-head">
      <p class="common-detail-title">{{ title }}</p>
      <p
        v-show="isMore"
        class="common-detail-more"
        @click="isNative = !isNative"
      >
        <i class="el-icon-arrow-down" :class="{ isNative: isNative }" />
        查看更多
      </p>
    </div>
    <transition name="fade-transform" mode="out-in">
      <div
        ref="commonDetailBody"
        class="common-detail-body"
        :style="isNative ? { height: 'auto' } : ''"
      >
        <p v-for="(item, index) in list" :key="index" class="saas-ellipsis" :title="item" :style="{width: `calc(100% / ${list.length < 5 ? list.length : 4})`}">{{ item }}</p>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    list: { type: Array, default: () => [] }
  },
  data() {
    return {
      isNative: false,
      isMore: false
    }
  },
  watch: {
    list(val) {
      this.$nextTick(() => {
        if (
          this.$refs.commonDetailBody.scrollHeight >
        this.$refs.commonDetailBody.clientHeight
        ) {
          this.isMore = true
        }
      })
    }
  },
  mounted() {

  }
}
</script>
<style scoped lang="scss">
.common-detail {
  //   padding:20px 40px 0px;
  margin-bottom: 10px;
  padding: 20px 20px 10px;
  background: #f7f7fb;
  border-radius: 2px;
  .common-detail-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .common-detail-more {
      cursor: pointer;
      font-size: 12px;
      font-weight: 400;
      color: #3265de;
      .isNative {
        transform: rotate(180deg);
        transition: transform 0.5s;
      }
    }
    .common-detail-title {
      font-size: 15px;
      font-weight: bold;
      color: #3c4353;
    }
  }

  .common-detail-body {
    font-size: 14px;
    font-weight: 400;
    color: #3c4353;
    overflow: hidden;
    display: flex;
    // margin-bottom: 30px;
    flex-wrap: wrap;
    align-items: center;
    height: 28px;
    p {
      margin-bottom: 10px;
      width: calc(100% / 4);
      padding-right: 20px;
      &:last-child {
        padding-right: 0;
      }
    }
  }
}
</style>
