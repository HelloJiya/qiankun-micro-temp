<template>
  <div class="navbar">
    <div class="navbar-left">
      <logo />
    </div>
    <div class="right-menu">
      <div style="position: relative; padding-bottom: 5px">
        <div class="model" />
        <iframe
          width="146"
          scrolling="no"
          height="60"
          frameborder="0"
          allowtransparency="true"
          src="https://i.tianqi.com?c=code&id=160&color=%23FFFFFF&icon=1&site=12"
        />
      </div>
      <div class="right-menu-item time-container">
        <span style="display: flex; justify-content: space-between; font-size: 14px">
          {{ time.format('hh:mm:ss') }}
          <span>星期{{ dayList[time.format('e')] }}</span>
        </span>
        <span style="font-size: 20px">
          {{ time.format('yyyy-MM-DD') }}
        </span>
      </div>
      <el-dropdown class="right-menu-item avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item
            v-for="item in organList"
            :key="item.id"
            @click.native="changeCom(item)"
          >
            <div
              style="display: flex;align-items: center;justify-content: space-between;"
            ><span>{{ item.name }}</span>   <i v-show="currentOrganID == item.id" class="el-icon-check" style="color:#3265DE" /></div>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { toLogin } from '@/utils/app'
import { mapState } from 'vuex'
import Logo from './Logo'
import { organ } from '@/api/app'

export default {
  components: { Logo },
  data() {
    return {
      avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5MWNhNzk5OC1iNmI0LWEzNDQtYmZhYy01NTVmOWZlODIzYzgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0M2ODczQjY2MTJGMTFFQkE3NUFGQkM5MDJFNjgwNzQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0M2ODczQjU2MTJGMTFFQkE3NUFGQkM5MDJFNjgwNzQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTE0MTM3Y2EtNzkyZC00OTQyLTg4ZjMtZWEyMmI5YWRkZjM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkxY2E3OTk4LWI2YjQtYTM0NC1iZmFjLTU1NWY5ZmU4MjNjOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuQ7gXYAAAItSURBVHjaxJdNKERRFMffGyJKxvdKNiZKKWzZYTKxQr5G+VhYycrGykZWsmAxSlFKWQgbJVbEQvnIQpmFnYXvGl8hnv/RVa/Xu/eeNyZO/WrqnnPPvHP/995zTcuyDIalggZQCypBMcgEFBwDUXAANsEGeNfOSIkV5IBxcGfx7QaMAr9qblXSHnBrxW9XoMNL4hQwbyXOZkCSM4/pWOMUsAJCmhU6AzvAB2pAQOO/BprBh2yNFzT//hmEgWmLod/94I3x5a6l7mOUrV2hiX5GfKczcT641wSdaHYAfXmUIbgs8veJig8Dv2adtnU7U6y7yvLAkCHEkQ4GGIfIZ4J8BknElLgJZDACqjXjplC4zrJBPSWuM3hWAVoU42FQwpwrSKI49nAYPIEWF2GFxVbj2h4pMcYstd1OwK6tvGUe468psWX8vb36jH+yZPDgodQXosSn4FKUukCUukb85liMhHGkEcIjmADlmpOLqAKTIkZlu+Q8q3BYArmMhE7ywKpi3ilyapMMzsaR0Hl2L0rmbiSHNNpSLoNFv0xMlEpao+8j8wVEXATQngDxus0xDd5U1+IH6PrF1/ZKrkU/pxGg5CPA5yFhsugy3axD1uzJmrx9UM8QU0ixPSO6Zm8ZNErW7Bysg0NwZTtAKsX1WiiJowayVdXs/bS3cwlsbyNu7a2qdN1C+vHapao51AklG4x5fFFcc54wpodHW5BaFtGJBGwXi/3RtsV9tH0JMACRMkHf36SxrAAAAABJRU5ErkJggg==',
      time: moment(new Date()),
      timer: null,
      dayList: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  computed: {
    ...mapState('app', ['organList', 'currentOrganID', 'menus'])
  },
  created() {
    this.timer = setInterval(() => {
      this.time = moment(new Date())
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('app/logout')
      toLogin()
    },
    changeCom(val) {
      this.defaultIndex = val.id
      organ.switchCurrent(val.id).then(res => {
        this.$router.replace('/')
        location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.navbar {
  height: $saas-logo-height;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  background: $--color-primary;
  .navbar-left {
    display: flex;
  }
  .right-menu {
    height: 100%;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    .model {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .right-menu-item {
      font-size: 16px;
      padding-right: 30px;
      color: #fff;
      &.time-container{
        padding-left: 10px;
        border-left: 2px solid rgba(232, 232, 232, 50%);
      }
    }
    .right-menu-item:last-child {
      padding-right: 20px;
    }
    .avatar-container {
      .user-avatar {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        display: inline-block;
        margin-right: 3px;
        cursor: pointer;
      }
      .avatar-wrapper {
        position: relative;

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
          color: #fff;
          vertical-align: bottom;
        }
      }
    }
  }
}
</style>
