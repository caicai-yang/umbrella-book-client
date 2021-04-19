import Vue from 'vue'
import Calc from './Main.vue'

const CalcCmp = Vue.extend(Calc)
const calcPlugin = {}
let defaultOptions = {}
let cmp

calcPlugin.install = function (Vue, options) {
  if (typeof options === 'object') {
    defaultOptions = {
      ...defaultOptions,
      ...options,
    }
  }
  // {remark, money, handleComplete}
  Vue.prototype.$calc = function (opts) {
    // if (typeof opts !== 'object') return new Error('opts must be a object')
    if (typeof opts === 'boolean') opts = { isShow: opts }
    defaultOptions = {
      ...defaultOptions,
      ...opts,
    }
    if (cmp) {
      Object.keys(defaultOptions).forEach((key) => {
        cmp[key] = defaultOptions[key]
      })
    } else {
      cmp = new CalcCmp()
      Object.keys(defaultOptions).forEach((key) => {
        cmp[key] = defaultOptions[key]
      })
    }
    cmp.$mount()
    document.body.append(cmp.$el)
  }
}

export default calcPlugin
