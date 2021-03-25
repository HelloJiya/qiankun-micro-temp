<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables['saas-menu-bg']"
        :text-color="variables['saas-menu-text']"
        :unique-opened="false"
        :active-text-color="variables['saas-menu-active-text']"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="menu in menus" :key="menu.code" :item="menu" :base-path="menu.extra.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { mapState } from 'vuex'

export default {
  components: { SidebarItem },
  computed: {
    ...mapState('app', ['menus']),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>
