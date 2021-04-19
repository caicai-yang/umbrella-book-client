import Vue from 'vue'
import Vuex from 'vuex'
import Http from '@/helper/fetch'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 底部导航是否显示
    hasNav: true
  },
  mutations: {
    setHasNav(state, hasNav) {
      state.hasNav = hasNav
    }
  },
  actions: {
    async getListByType({ commit }, params) {
      return await Http.get('/api/getListByType', {
        params
      })
    },
    async getLineChartData({ commit }, params) {
      return await Http.get('/api/getLineChartData', {
        params
      })
    }
    // async getDescriptorById({ commit }, params) {
    //   return await Http.get('/api/getDescriptorById', {
    //     params,
    //   })
    // },
  },
  modules: {
  },
})

store.register = (moduleName, module) => {
  if (store.hasModule(moduleName)) return
  store.registerModule(moduleName, module)
}

store.unregister = (modeuleName) => {
  if (store.hasModule(modeuleName)) {
    store.unregisterModule(modeuleName)
  }
}

export default store
