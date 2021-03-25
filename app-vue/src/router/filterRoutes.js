import { asyncRoutes } from './asyncRoutes'
import remove from 'lodash/remove'
import cloneDeep from 'lodash/cloneDeep'
import router from './index'

function getKeys(menus) {
  let ret = []
  menus.forEach(menu => {
    ret.push(menu.code)

    if (menu.children) {
      ret = ret.concat(getKeys(menu.children))
    }
  })

  return ret
}

//
function filterRoutes(arr, keys) {
  if (!keys) { return asyncRoutes }
  const routes = cloneDeep(arr)
  const route = remove(routes, route => {
    if (route.children) route.children = filterRoutes(route.children, keys)
    return keys.indexOf(route.name) > -1 || route.hidden
  })
  return route
}

export function getPermissionRoutes(menus) {
  if (!window.__POWERED_BY_QIANKUN__) {
    return asyncRoutes
  }
  if (!menus || !menus.length) {
    return []
  }
  const keys = getKeys(menus)
  const routes = filterRoutes(asyncRoutes, keys)
  return routes
}

export function addRoutes(menus) {
  const routes = getPermissionRoutes(menus)
  routes.forEach(item => {
    router.addRoute(item)
  })
}
