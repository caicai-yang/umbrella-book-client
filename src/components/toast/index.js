import Vue from 'vue'
import Toast from './Main.vue'

const toast = Vue.extend(Toast)
const toastPlugin = {}
let defaultOptions = {}
let cmp
let timer

toastPlugin.install = function (options) {
  if (typeof options === 'object') {
    defaultOptions = {
      ...defaultOptions,
      ...options,
    }
  }
  // opts: {show, msg, pos} || msg
  Vue.prototype.$toast = function (opts) {
    if (typeof opts === 'string') {
      defaultOptions = {
        ...defaultOptions,
        msg: opts,
      }
    } else {
      defaultOptions = {
        ...defaultOptions,
        ...opts,
      }
    }
    if (!cmp) {
      cmp = new toast()
    }
    Object.keys(defaultOptions).forEach((key) => {
      cmp[key] = defaultOptions[key]
    })
    cmp.$mount()
    document.body.appendChild(cmp.$el)
    timer = setTimeout(() => {
      cmp.show = false
      if (document.body.hasChildNodes(cmp.$el)) {
        document.body.removeChild(cmp.$el)
      }
      clearTimeout(timer)
    }, cmp.timeout || 1 * 1000)
  }
}

export default toastPlugin
