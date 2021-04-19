import Http from '@/helper/fetch'
import dayjs from 'dayjs'

export default {
  namespaced: true,
  // computed
  state: () => ({
    years: 0,
    months: 0,
    // state 是存储在内存中的， 一刷新就会丢失数据，保存在本地
    // selectItem: null
  }),
  // methods
  mutations: {
    setYears(state, years) {
      state.years = years
    },
    setMonths(state, months) {
      state.months = months
    },
    setSelectItem(state, item) {
      // { category: "罗秀兰", icon: "http://dummyimage.com/23/50B347/FFF&text=Mock.js", id: 1, money: 91, remark: "", type: false }
      const itemDate = dayjs(item.createdAt)
      const date = itemDate.format('YYYY年MM月DD日')
      const day = itemDate.get('day')
      const selectItem = {
        ...item,
        desc: {
          '类型': item.type ? '收入' : '支出',
          '金额': item.money,
          '日期': `${date} 星期${day}`,
          '备注': item.remark ? item.remark : item.name
        }
      }
      localStorage.setItem('selectItem', JSON.stringify(selectItem))
    }
  },
  // computed, 对 state 做增量化处理
  // getters: {
  //   value: state => {
  //     return state.value;
  //   }
  // },
  // methods async
  actions: {
    async getDetail({ commit }, params) {
      const res = await Http.get('/api/getDetail', {
        params,
      })
      return res
    },
  },
}
