import store from '@/store'

const baseUrl = '/ims'

export function getMicroRoute($route) {
  const { name, meta, path, query, params } = $route
  const route = { name, meta, query, params, path: baseUrl + path, fullPath: baseUrl + path }
  return route
}

export function addView(route) {
  if (window.__POWERED_BY_QIANKUN__) {
    const microRoute = getMicroRoute(route)
    window.__fn__.addView(microRoute)
  }
  store.dispatch('tagsView/addView', route)
}

/**
 * 关闭tag
 * @param {*} route 当前路由
 *
 */
export function delView(route) {
  if (window.__POWERED_BY_QIANKUN__) {
    const microRoute = getMicroRoute(route)
    window.__fn__.delView(microRoute)
  }
  store.dispatch('tagsView/delView', route)
}
