import router from './index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'
import { toLogin } from '@/utils/app'

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  console.log('IMS Router', to)

  if (window.__POWERED_BY_QIANKUN__) {
    // 为主服务添加tagView 调用主服务的addView
    const { name, meta, path, query } = to
    const route = { name, meta, query, path: '/ims' + path, fullPath: '/ims' + path }
    window.__fn__.addView(route)
    next()
  } else {
    // const appState = store.state.app
    // if (appState.userInfo && Object.keys(appState.userInfo).length) {
    //   next()
    // } else {
    //   try {
    //     await store.dispatch('app/getUserInfo')
    //     next()
    //   } catch (error) {
    //     toLogin()
    //   }
    // }
  }

  NProgress.done()
})

