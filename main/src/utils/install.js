import cloneDeep from 'lodash/cloneDeep'
import { MessageBox } from 'element-ui'
export default {
  install(Vue, options) {
    // 初始化全局变量定义
    Vue.prototype.$_init = (type) => {
      const initData = {
        page: { pageSize: 10, pageNum: 1, total: 0 }
      }
      if (initData[type] === undefined) {
        return Promise.reject(new Error(`can not find ${type} in $_init, please register in $_init`))
      }
      return initData[type]
    }
    Vue.prototype.$deepClone = cloneDeep

    /**
     * 字典匹配
     * @param {*} key     当前编码
     * @param {*} source  查询列表
     * @param {*} param2  {defaultValue：无匹配时默认返回值，key:查询列表中匹配的编码,label：查询列表中返回的编码}
     */
    Vue.prototype.$_findDic = (key, source, { defaultValue = '', key: sKey = 'value', label = 'label' } = {}) => {
      if (key === undefined || key === null) {
        return defaultValue || Promise.reject('the function $_finDic can not find key')
      }
      let ret = {}
      if (source.length) {
        ret = source.find(item => item[sKey] === key)
      }
      return ret[label]
    }

    /**
     * 接口传参转换
     * $_apiData(data,page,sort,fuzzy)
     * @param {*} data
     * @param {*} page      分页数据
     *
     * TODO 排序、模糊查询、perf
     * @param {object | string} sort 排序
     * @param {*} fuzzyList
     */
    Vue.prototype.$_formatApi = (data, page) => {
      const ret = {}
      if (data) {
        ret.data = cloneDeep(data)
      }

      if (page) {
        ret.base = { page: `${page.pageNum}-${page.pageSize}` }
      }

      return ret
    }

    /**
     * 搜索重置
     * @param {*} obj
     * @param {*} page
     * @param {*} fn
     */
    Vue.prototype.$_clearSearch = (obj, page, fn) => {
      let isClear = false
      for (const key in obj) {
        if (obj[key] !== null) {
          obj[key] = null
          isClear = true
        }
      }
      if (isClear) {
        if (page) { page.pageNum = 1 }
        fn()
      }
    }

    /**
     * 确认弹窗
     * @param {*} msg    提示信息
     * @param {*} title  标题
     */
    Vue.prototype.$_confirm = (msg, title = '提示') => {
      return new Promise((resolve) =>
        MessageBox.confirm(msg, title).then(() => {
          resolve(true)
        }
        ).catch(() => {
          resolve(false)
        })
      )
    }

    /**
     * 数据请求时 loading交互封装
     * @param {*} vn  this
     * @param {*} key loading对象的key
     * @param {*} fn  请求
     */
    Vue.prototype.$_apiLoading = (vn, key, fn) => {
      vn[key] = true
      fn().finally(_ => {
        vn[key] = false
      })
    }
  }
}
