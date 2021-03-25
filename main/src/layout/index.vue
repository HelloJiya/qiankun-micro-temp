<template>
  <div class="app-wrapper">
    <navbar />
    <div
      v-if="showMenus"
      v-loading="loading"
      class="app-wrapper-container"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <tags-view />
        <app-main v-if="$route.name" />
        <div v-else id="frame" />
      </div>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import { fullScreenRoutes } from '@/router'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar, Sidebar, AppMain, TagsView
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('app', ['loading']),
    showMenus() {
      const pathList = fullScreenRoutes.map(item => item.path)
      return !pathList.includes(this.$route.path)
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
  }
  .app-wrapper-container{
    display: flex;
    height: calc(100vh - 68px);
  }
</style>
