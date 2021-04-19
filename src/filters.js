import Vue from 'vue';
import dayjs from 'dayjs'

const filters = {
  formatDate: function (date, format = 'YYYY-MM-DD') {
    if (!date) {
      return new Error('date must exits')
    }
    return dayjs(date).format(format)
  },
  getDay: function (date) {
    return dayjs(date).get('day')
  }
}

Object.keys(filters).forEach(filter => {
  Vue.filter(filter, filters[filter])
})

