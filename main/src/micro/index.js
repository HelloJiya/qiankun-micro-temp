import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import routes from '@/assets/routes'//  TODO del

import { registerMicroApps, addGlobalUncaughtErrorHandler, start, runAfterFirstMounted, initGlobalState } from 'qiankun'

import apps from './apps'

// 注册
registerMicroApps(apps, {
  beforeLoad: async(app) => {
    console.log('[主应用beforeLoad]', app)
    NProgress.start()
  },
  beforeMount: app => console.log('[主应用beforeMount]', app),
  afterMount: app => {
    console.log('[主应用afterMount] ', app.name)
    NProgress.done()
  },
  beforeUnmount: app => console.log('[主应用beforeUnmount]', app.name),
  afterUnmount: app => console.log('[主应用afterUnmount]', app.name)
})

// 全局异常处理
addGlobalUncaughtErrorHandler(event => {
  NProgress.done()
  console.log('[主应用异常addGlobalUncaughtErrorHandler]', event)
  const { message: msg } = event
  if (msg) {
    Message.error(msg)
  }
})

start({
  prefetch: false,
  fetch: window.fetch
})

runAfterFirstMounted(() => {
  console.log('[主应用MainApp] first app mounted')
})

export const microAction = initGlobalState({menus: [ ...routes]})

export default start
