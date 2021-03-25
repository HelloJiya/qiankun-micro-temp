import { user, organ } from '@/api/app'
import cloneDeep from 'lodash/cloneDeep'
import routes from '@/assets/routes'
import { microAction } from '@/micro'

const state = {
  userInfo: {},
  organList: [],
  menus: [
    ...routes
  ],
  currentOrganID: '',
  loading: false
}

const mutations = {
  // 用户
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
    microAction.setGlobalState({ ...state, userInfo: data })
  },
  SET_MENUS: (state, data) => {
    state.menus = data
    microAction.setGlobalState({ ...state, menus: data })
  },

  // ========= 机构
  SET_ORGAN_LIST: (state, list) => {
    state.organList = list
    microAction.setGlobalState({ ...state, organList: list })
  },
  SET_DEFAULT_ORGAN: (state, id) => {
    state.currentOrganID = id
    microAction.setGlobalState({ ...state, currentOrganID: id })
  },
  // ========= loading
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  // ============用户
  // 获取用户信息
  getUserInfo({ state, commit }) {
    return new Promise((resolve, reject) => {
      user.getUserInfo().then(res => {
        const data = cloneDeep(res.data)
        commit('SET_USER_INFO', data)
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 获取资源
  getMenus({ commit }) {
    return new Promise((resolve, reject) => {
      user.getSource({ data: { type: 'menu', appType: 'business' }}).then(res => {
        const data = cloneDeep(res.data)
        const appMenus = data[1]?.children || []
        commit('SET_MENUS', appMenus)
        resolve(appMenus)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退出
  logout() {
    return new Promise((resolve, reject) => {
      user.loginOut().then(res => {
        resolve(true)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // =============机构
  // 获取机构列表
  getOrganList({ commit }) {
    return new Promise((resolve, reject) => {
      organ.current().then(res => {
        const data = cloneDeep(res.data)
        commit('SET_ORGAN_LIST', data)
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 切换机构
  async getOrganCurrent({ state, dispatch, commit }) {
    try {
      if (!state.organList.length) {
        await dispatch('getOrganList')
      }
      const firstID = state.organList[0].id
      return new Promise((resolve, reject) => {
        organ.oneCurrent(firstID).then(res => {
          const data = cloneDeep(res.data)
          commit('SET_DEFAULT_ORGAN', data)
          resolve(true)
        }).catch(error => {
          reject(error)
        })
      })
    } catch (error) {
      console.log('getOrganCurrent', error)
      return Promise.reject(error)
    }
  }

  // 获取当前机构信息

}

export default {
  state,
  mutations,
  actions
}
