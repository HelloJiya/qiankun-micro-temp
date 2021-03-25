<template>
  <section class="app-main">
    <section class="app-mian-content">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </section>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*34 = tagviews  */
  position: relative;
  height: calc(100% - 34px);
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;

  background: #F0F2F5;
}
.app-mian-content{
  min-width: 1200px;
  min-height: 100%;
  background: #fff;
}
</style>
