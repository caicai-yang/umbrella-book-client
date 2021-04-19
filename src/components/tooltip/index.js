import Vue from 'vue';
import ToolTip from './Main.vue';

const toolTipCmp = Vue.extend(ToolTip)

let toolTipPlugin = {}
let defaultOPtions = {}
let cmp
toolTipPlugin.install = function (Vue, options) {
  if (typeof opts === 'object') {
    defaultOPtions = {
      ...defaultOPtions,
      ...options
    }
  }
  Vue.prototype.$tooltip = function (opts) {
    if (typeof opts === 'object') {
      defaultOPtions = {
        ...defaultOPtions,
        ...opts
      }
    } else {
      console.warn('tooltip opts must be a object')
    }

    if (cmp) {
      Object.keys(defaultOPtions).forEach(key => {
        cmp[key] = defaultOPtions[key]
      })
      cmp.show = true
    } else {
      cmp = new toolTipCmp()
      Object.keys(defaultOPtions).forEach(key => {
        cmp[key] = defaultOPtions[key]
      })
      cmp.show = true
    }
    // 挂载
    cmp.$mount()
    document.body.append(cmp.$el)
    // 定时器清除
    const timer = setTimeout(() => {
      cmp.show = false
      clearTimeout(timer)
    }, cmp.delay || 2000)
  }
}

export default toolTipPlugin