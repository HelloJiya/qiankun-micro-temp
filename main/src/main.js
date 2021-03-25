import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css'

// element
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import './styles/index.scss' // 全局样式

import './components' // 注册全局组件

// 注册全局方法
import vuePrototype from './utils/install'
Vue.use(vuePrototype)

import './router/routerGuard' // 全局导航守卫

import startQianKun from './micro' // qiankun

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

startQianKun()

