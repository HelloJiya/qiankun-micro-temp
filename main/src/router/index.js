import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const fullScreenRoutes = [
  {
    path: '/no-permission',
    name: 'NoPermission',
    component: () => import('@/views/no-permission')
  }, {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: { title: '404' },
    hidden: true
  }
]

export const whiteRoutes = [
  {
    path: '/',
    name: 'Index'
  },
  ...fullScreenRoutes
]

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: whiteRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

