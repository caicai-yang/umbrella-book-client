import Vue from 'vue'
import alert from './Main.vue'

const Alert = Vue.extend(alert)
const alertPlugin = {}
let defaultOptions = {}
let cmp

alertPlugin.install = function (options) {
  if (typeof options === 'object') {
    defaultOptions = { ...options }
  }
  Vue.prototype.$alert = function (opts) {
    if (typeof opts === 'string') {
      defaultOptions = {
        ...defaultOptions,
        content: opts,
      }
    } else {
      defaultOptions = {
        ...defaultOptions,
        ...opts,
      }
    }
    if (!cmp) {
      cmp = new Alert().$mount()
    }
    Object.keys(defaultOptions).forEach((key) => {
      cmp[key] = defaultOptions[key]
    })
    cmp.show = true
    document.body.appendChild(cmp.$el)
  }
}

export default alertPlugin
