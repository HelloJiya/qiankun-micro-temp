import router, { fullScreenRoutes } from './index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { sleep } from '@/utils'
import store from '@/store'
import { toLogin } from '@/utils/app'

function toIndex(to, menus, next) {
  const pathList = fullScreenRoutes.map(item => item.path)
  if (pathList.includes(to.path) && to.path !== '/no-permission') {
    next()
    return false
  } else if ((!menus || !menus.length) && !pathList.includes(to.path)) {
    next({ name: 'NoPermission' })
  } else if (menus.length && (to.path === '/' || to.name === 'NoPermission')) {
    const firstUrl = menus[0].children ? menus[0].children[0].extra.path : menus[0].extra.path
    next({ path: firstUrl })
  } else {
    next()
  }
}

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  console.log('Micro router', to)

  // const { app: appState } = store.state

  // if (appState.userInfo && Object.keys(appState.userInfo).length) {
  //   const menus = appState.menus
  //   toIndex(to, menus, next)
  // } else {
  //   try {
      // await store.dispatch('app/getOrganCurrent')
      // await store.dispatch('app/getUserInfo')
      // const menus = await store.dispatch('app/getMenus')
      const menus = store.state.app.menus // TODO del
      toIndex(to, menus, next)
    // } catch (error) {
    //   toLogin()
    // }
  // }

  NProgress.done()
})
