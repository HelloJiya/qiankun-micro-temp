<template>
  <div class="rb-main">
    <el-tabs v-model="tabActive" type="card">
      <el-tab-pane label="领用" name="LY"><receive /></el-tab-pane>
      <el-tab-pane label="借用" name="JY"><borrow /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import borrow from './borrow'
import receive from './receive'
export default {
  components: { receive, borrow },
  data() {
    return {
      tabActive: 'LY'
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.rb-main {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  background: #ffffff;
  margin: 20px;
}
.rb-main ::v-deep .el-tabs{
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-tabs__content{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .el-tab-pane{
    flex: 1;
    overflow: hidden;
  }
}
.rb-main ::v-deep .saas-main-wrap{
  width: 100%;
  height: 100%;
  background: #ffffff;
  margin: 0;
}
</style>
