// helper
import install from '@/installComponents'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Mock
// import '@/mock'

install(Vue)
// 过滤器
import './filters'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
