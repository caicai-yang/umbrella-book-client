<template>
  <div class="line-chart">
    <div id="line">
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { transDate } from '@/helper/utils/dates'
export default {
  name: 'line-chart',
  props: {
    xAxisData: {
      type: Array,
      default: () => []
    },
    seriesData: {
      type: Array,
      default: () => []
    },
    lineData: {
      //  data: {avger: xx, total: xx, tops: [{category, date, day, icon, money}]}}]}
      type: Object,
      default: () => ({})
    },
    total: Number,
    avger: Number,
    activeTitle: String
  },
  methods: {
    drawLine() {
      const dom = document.getElementById('line')
      const myChart = echarts.init(dom);
      const option = {
        // 总消费/平均值
        graphic: [{
          type: 'group',
          left: 10,
          top: 10,
          children: [{
            type: 'text',
            style: {
              fill: '#ccc',
              text: [
                `总${this.activeTitle}: ${this.total}`,
                `平均值: ${this.avger}`
              ].join('\n'),
            }
          }]
        }],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, .8)',
          borderColor: 'rgba(0, 0, 0, .8)',
          textStyle: {
            color: '#fff'
          },
          triggerOn: 'mousemove|click',
          formatter: params => {
            let target = this.lineData[params[0]['dataIndex'] + 1]
            if (target.length) {
              let res = '<div class="tooltip"><p>最大的三笔交易</p><ul>'
              let money = 0
              target = target.slice(0, 3)
              target.forEach(item => {
                const line = `<li>
                  <div class="icon"><img src="${item.icon}"/></div>
                  <span>${transDate(item.createdAt, 'YY-MM-DD')}</span>
                  <span>${item.remark ? item.remark : item.name}</span>
                  <span>${item.money}</span>
                </li>`
                money += item.money
                res += line
              })
              res += `</ul><span>当日总${this.activeTitle}: ${money}</span></div>`
              return res
            } else {
              return '没有费用'
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ['line', 'bar'] },
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData
        },
        yAxis: {
          // type: 'value',
          show: false
        },
        series: [
          {
            type: 'line',
            data: this.seriesData,
          },

        ]
      }
      option && myChart.setOption(option);
    }
  },
  mounted() {
    this.drawLine()
  },
  updated() {
    this.drawLine()
  }
}
</script>

<style lang="scss">
@import "~@/styles/base";
.line-chart {
  width: 100%;
  height: 200px;
  #line {
    width: 100%;
    height: 100%;
  }
  h1 {
    display: none;
  }
  .tooltip {
    p {
      text-align: center;
      background-color: gray;
    }
    li {
      @include disFlex(row, flex-start, center);
      :not(:last-child) {
        margin-right: 10px;
      }
      .icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: $primaryColor;
        @include disFlex(row, center, center);
        img {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>