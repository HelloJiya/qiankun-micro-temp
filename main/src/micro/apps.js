import store from '@/store'

// const getActiveRule = hash => location => location.hash.startsWith(hash)

const loader = loading => store.commit('app/SET_LOADING', loading)

const { hostname } = location

const apps = [
  {
    name: '智慧运维',
    entry: `//${hostname}:5121/`,
    container: '#frame',
    activeRule: '/ims',
    loader,
    props: {
      fn: {
        addView: (route) => store.dispatch('tagsView/addVisitedView', route),
        delView: (route) => store.dispatch('tagsView/delVisitedView', route)
      }
    }
  }
]

export default apps
