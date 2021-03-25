<template>
  <div class="error-np-container">
    <img class="error-np-img" :src="noPermissionImg" alt="no_permission">
    <p class="error-np-txt">尊敬的用户，您好！目前您暂无权限，请联系管理员去开通</p>
  </div>
</template>

<script>
import noPermissionImg from '@/assets/no_permission/no_permission.png'
export default {
  name: 'NoPermission',
  data() {
    return {
      noPermissionImg
    }
  }

}
</script>

<style lang="scss" scoped>
.error-np-container{
  width: 100%;
  margin: 0 auto;
  padding-top: 15%;
  text-align: center;
  .error-np-img{
    display: inline-block;
    width: 380px;
    height: 300px;
  }
  .error-np-txt{
    padding-top: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #3C4353;
  }
}
</style>
