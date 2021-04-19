<template>
  <div class="charts">
    <Header
      :title="['收入', '支出']"
      :activeTitle="activeTitle"
      :dates="['年', '月', '周']"
      :actived.sync="activeMode"
      @change="handleChangeTitle"
    />
    <Scroll
      :list="scrollList"
      :activeIndex="activeIndex"
      @click="hanleScrollClick"
    />
    <!-- 这里用 if 是为了保证子组件已经获取到了 lineData -->
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
      @click="stumpRoute"
      :type="activeTitle"
    />
  </div>
</template>

<script>
// components
import Header from './Header';
import Scroll from './Scroll';
import LineChart from './lineChart';
import RankList from './RankList';

// helpers
import { fetchDateByMode, fetchDateSec, transDate } from '@/helper/utils/dates'
import { mapMutations } from 'vuex';

// api
import { getBillByType } from '@/api'
const months = new Array(12).fill(0).map((month, index) => `${index + 1}月`)

export default {
  name: 'charts',
  data() {
    return {
      // 收入是 true, 支出是 flase
      activeTitle: '收入',
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
    ...mapMutations(['setHasNav']),
    handleChangeTitle(title) {
      this.activeTitle = title
      this.activeMode = 0
    },
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
    stumpRoute(categoryId, name) {
      this.$router.push({
        name: 'chartsByType',
        params: {
          categoryId,
          name,
          activeTitle: this.activeTitle
        }
      })
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
        type: this.activeTitle === '收入' ? 1 : 0,
        dateSec: value,
        mode: this.activeMode
      })
      this.seriesData = data['series']
      this.lineData = data['json']
      this.total = data['total']
      this.avger = data['avger']
      this.rankList = this.setRankList(data['data'])
    }
  },
  created() {
    this.setHasNav(true)
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
@import "~@/styles/base";
.charts {
  height: 100%;
  overflow: hidden;
  @include disFlex(column, flex-start, flex-start);
}
</style>