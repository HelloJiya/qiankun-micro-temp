import './public-path'
import Vue from 'vue'
import App from './App.vue'
import imsRouter from './router'
import store from './store'

import './router/routerGuard' // 全局导航守卫
import { addRoutes } from '@/router/filterRoutes'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import './styles/index.scss'

import './components'

// 注册全局方法
import vuePrototype from './utils/install'
Vue.use(vuePrototype)

Vue.config.productionTip = false

let router = null
let instance = null

function render(props = {}) {
  const { container } = props
  router = imsRouter

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  addRoutes()
  render()
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => {
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev)
        store.commit('micro/SET_MICRO_INFO', value)
        // 添加权限路由（为微应用时路由根据主应用的菜单添加路由，其他时候添加全部路由）
        const menus = value?.menus || null
        addRoutes(menus)
      },
      true
    )
  if (props.fn) {
    window.__fn__ = props.fn
  }
}

export async function bootstrap() {
  console.log('[IMS MICRO bootstrap]')
}

export async function mount(props) {
  console.log('[IMS MICRO mount] props from main framework', props)
  storeTest(props)
  render(props)
}

export async function unmount() {
  console.log('[IMS MICRO unmount]')
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
