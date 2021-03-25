import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
// import Layout from '@/layout'

const routes = [
  {
    path: '/',
    redirect: '/plan'
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
  // { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  base: window.__POWERED_BY_QIANKUN__ ? '/ims' : '/',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
