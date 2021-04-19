import alert from '@/components/alert'
import toast from '@/components/toast'
import pageLoading from '@/components/pageLoading'
import calc from '@/components/calc'
import tooltip from '@/components/tooltip';
import clipper from '@/components/clipper.js';

export default function (Vue) {
  Vue.use(alert)
  Vue.use(toast)
  Vue.use(pageLoading)
  Vue.use(calc)
  Vue.use(tooltip)
  Vue.use(clipper)
}
