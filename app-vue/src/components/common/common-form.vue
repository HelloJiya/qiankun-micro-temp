<template>
  <transition name="el-fade-in">
    <div v-if="visible" class="add-edit-wrap transition-box">
      <div class="add-edit-container" :style="{ width }">
        <header class="add-edit-header">
          <div class="add-edit-title">
            {{ title }}
            <i class="el-icon-close icon" @click="$emit('hide-form')" />
          </div>
        </header>
        <section class="add-edit-content common-scroll">
          <slot name="form-content" />
        </section>
        <section class="add-edit-footer">
          <slot name="form-footer" />
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '570px'
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.add-edit-wrap {
  position: fixed;
  z-index: 1099;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  color: $--color-text-primary;
  .add-edit-container {
    width: 570px;
    margin: 100px auto 0;
    background-color: #fff;
    border-radius: 3px;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .add-edit-header {
      border-bottom: 1px solid $saas-split-line;
      color: $--color-text-primary;
      padding: 20px;
      .add-edit-title {
        position: relative;
        font-size: 20px;
        font-weight: 600;
        text-align: left;
        .icon {
          position: absolute;
          top: 2px;
          right: 0;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .add-edit-content {
      padding: 20px;
      position: relative;
      word-break: break-all;
      flex: 1;
      overflow-y: auto;
    }
    .add-edit-footer {
      padding: 0 20px 20px;
      text-align: right;
      box-sizing: border-box;
    }
  }
}
</style>
