import Vue from 'vue'

const component = require.context('./common', true, /\.vue$/)
component.keys().forEach(fileName => {
  const comConfig = component(fileName)
  const comName = fileName.split('/').pop().replace(/\.\w+$/, '')
  Vue.component(comName, comConfig.default || comConfig)
})
