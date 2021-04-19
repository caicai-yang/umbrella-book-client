import Vue from 'vue'
import PageLoading from './Main.vue'

const pageLoading = Vue.extend(PageLoading)
const pageLoadingPlugin = {}
let defaultOptions = {}
let cmp

pageLoadingPlugin.install = function (options) {
  if (typeof options === 'object') {
    defaultOptions = {
      ...defaultOptions,
      ...options,
    }
  }
  Vue.prototype.$pageLoading = function (opts) {
    if (typeof opts === 'boolean') {
      defaultOptions = {
        ...defaultOptions,
        show: opts,
      }
    } else {
      defaultOptions = {
        ...defaultOptions,
        ...opts,
      }
    }
    if (!cmp) cmp = new pageLoading()
    Object.keys(defaultOptions).forEach((key) => {
      cmp[key] = defaultOptions[key]
    })
    cmp.$mount()
    document.body.appendChild(cmp.$el)
    if (cmp.show === false && document.body.hasChildNodes(cmp.$el)) {
      document.body.removeChild(cmp.$el)
    }
  }
}

export default pageLoadingPlugin
