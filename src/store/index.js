import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
})

store.register = (moduleName, module) => {
  if (store.hasModule(moduleName)) return
  store.registerModule(moduleName, module)
}


export default store
