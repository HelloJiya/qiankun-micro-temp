import { user } from '@/api/app'
import cloneDeep from 'lodash/cloneDeep'

const state = {
  userInfo: {}
}

const mutations = {
  // 用户
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
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
  // 退出
  logout() {
    return new Promise((resolve, reject) => {
      user.loginOut().then(res => {
        resolve(true)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
