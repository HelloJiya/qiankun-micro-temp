<template>
  <div v-if="!isSaaS" class="app-wrapper">
    <template>
      <navbar />
      <div class="app-wrapper-container">
        <sidebar class="sidebar-container" />
        <div class="main-container">
          <tags-view />
          <section class="app-main">
            <app-main />
          </section>
        </div>
      </div>
    </template>
  </div>
  <section v-else class="app-main">
    <app-main />
  </section>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar, Sidebar, AppMain, TagsView
  },
  computed: {
    isSaaS() {
      return !!window.__POWERED_BY_QIANKUN__
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .app-wrapper-container{
    display: flex;
    height: calc(100vh - 68px);
  }

  .app-main {
    /*34 = tagviews  */
    // height: calc(100% - 34px);
    // 兼容qiankun 高度问题
    height: calc(100vh - 34px - 68px);
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #F0F2F5;
  }

</style>
