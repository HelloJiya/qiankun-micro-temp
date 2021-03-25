<template>
  <div class="sidebar-logo-container">
    <router-link key="expand" tag="div" class="sidebar-logo-link" to="/">
      <img :src="logoUrl" style="width: 134px; height: 42px">
    </router-link>
  </div>
</template>

<script>
import logoUrl from '@/assets/images/logo.png'
export default {
  name: 'SidebarLogo',
  data() {
    return {
      logoUrl
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.sidebar-logo-container {
  position: relative;
  width: 200px;
  height: $saas-logo-height;
  line-height: $saas-logo-height;
  background: $--color-primary;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    padding-left: 20px;
    display: flex;
    align-items: center;
  }
}
</style>
