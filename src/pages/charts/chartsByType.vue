<template>
  <div>
    <Header
      :title="name"
      :dates="['年', '月', '周']"
      :actived.sync="activeMode"
      @cancel="$router.go(-1)"
    />
    <Scroll
      :list="scrollList"
      :activeIndex="activeIndex"
      @click="hanleScrollClick"
    />
    <LineChart
      v-if="lineData"
      :activeTitle="activeTitle"
      :total="total"
      :avger="avger"
      :xAxisData="xAxisData"
      :seriesData="seriesData"
      :lineData="lineData"
    />
    <RankList
      v-if="rankList"
      :rankList="rankList"
      :type="activeTitle"
    />
  </div>
</template>

<script>
import Header from './Header'
import Scroll from './Scroll';
import LineChart from './lineChart';
import RankList from './RankList';
import { fetchDateByMode, fetchDateSec, transDate } from '@/helper/utils/dates'
// api
import { getBillByType } from '@/api'
const months = new Array(12).fill(0).map((month, index) => `${index + 1}月`)

export default {
  name: 'charts-by-type',
  props: {
    categoryId: {
      type: Number | String,
      require: true
    },
    name: {
      type: String,
      required: true
    },
    activeTitle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 年是0, 月是1, 周是2
      activeMode: 0,
      // 滚动列表中默认选中最后一项
      activeIndex: 0,
      // 折线图 tooltip 中的数据
      lineData: null,
      // 横坐标轴
      xAxisData: [],
      // 纵坐标抽的数据
      seriesData: [],
      total: 0,
      avger: 0,
      rankList: null
    }
  },
  computed: {
    scrollList() {
      let data = null
      let keys = null
      const createdAt = transDate(localStorage.getItem('createdAt'), 'YYYY')
      switch (this.activeMode) {
        case 0:
          data = fetchDateByMode('year', createdAt)
          break
        case 1:
          data = fetchDateByMode('month', createdAt)
          break
        case 2:
          data = fetchDateByMode('week', createdAt)
          break
      }
      // this.activeIndex = Object.keys(data).length - 1
      keys = Object.keys(data)
      if (this.activeMode === 0) {
        this.setxAxisData(months)
      } else {
        this.setxAxisData(fetchDateSec(data[keys[keys.length - 1]]))
      }
      this.hanleScrollClick(data[keys[keys.length - 1]], Object.keys(data).length - 1)
      return data
    },
  },
  methods: {
    setxAxisData(value) {
      this.xAxisData = value
    },
    setRankList(value) {
      // value: [{}, {}]
      const data = {}
      const res = {}
      res['data'] = []
      data['total'] = 0
      value.forEach((item) => {
        data['total'] += item.money
        if (!data[item.categoryId]) {
          data[item.categoryId] = {}
          data[item.categoryId]['money'] = 0
          data[item.categoryId]['icon'] = null
          data[item.categoryId]['name'] = null
          data[item.categoryId]['categoryId'] = null
        }
        data[item.categoryId]['money'] += item.money
        if (!data[item.categoryId]['icon']) {
          data[item.categoryId]['icon'] = item.icon
        }
        if (!data[item.categoryId]['name']) {
          data[item.categoryId]['name'] = item.name
        }
        if (!data[item.categoryId]['categoryId']) {
          data[item.categoryId]['categoryId'] = item.categoryId
        }
      })
      Object.keys(data).forEach(item => {
        if (item !== 'total') {
          res['data'].push(data[item])
        }
      })
      res['data'] = res['data'].sort((a, b) => b.money - a.money)
      res['total'] = data['total']
      return res
    },
    async hanleScrollClick(value, index) {
      // value 是日期范围
      this.activeIndex = index
      if (this.activeMode === 0) {
        this.setxAxisData(months)
      } else {
        this.setxAxisData(fetchDateSec(value))
      }
      this.lineData = null
      // 发请求
      const data = await getBillByType({
        categoryId: this.categoryId,
        dateSec: value,
        mode: this.activeMode
      })
      this.seriesData = data['series']
      this.lineData = data['json']
      this.total = data['total']
      this.avger = data['avger']
      let res = {}
      res['data'] = data['data'].sort((a, b) => b.money - a.money)
      res['total'] = data['data'].reduce((item, temp) => {
        return item + temp['money']
      }, 0)
      this.rankList = res
    }
  },
  components: {
    Header,
    Scroll,
    LineChart,
    RankList
  },
}
</script>

<style lang="scss">
</style>