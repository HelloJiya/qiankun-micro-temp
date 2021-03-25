import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import camelCase from 'lodash/camelCase'

Vue.use(Vuex)

const modules = {}
const files = require.context('./modules', false, /\.js$/)

files.keys().forEach(file => {
  const fileName = camelCase(file.replace(/(\.\/|\.js)/g, ''))
  const moduleConfig = files(file).default

  modules[fileName] = {
    namespaced: true,
    ...moduleConfig
  }
})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
