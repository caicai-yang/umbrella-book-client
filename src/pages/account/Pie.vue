<template>
  <div class="account-budget-pie"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'pie-chart',
  props: {
    totalExpend: Number | String,
    totalBudget: Number | String
  },
  data() {
    return {
      myChart: null,
      text: `${+this.totalExpend > +this.totalBudget ?
        '已透支' :
        `剩余\n${isNaN((1 - +this.totalExpend / +this.totalBudget).toFixed(2) * 100) ? 0 : (1 - +this.totalExpend / +this.totalBudget).toFixed(2) * 100}%`}`,
    }
  },
  computed: {
    budget() {
      if (this.totalBudget) {
        if (this.totalBudget > this.totalExpend) { return this.totalBudget } else { return 0 }
      } else return 1
    },
    expend() {
      if (this.totalExpend) {
        if (this.totalBudget > this.totalExpend) { return this.totalExpend } else { return 1 }
      }
      else return 0
    }
  },
  methods: {
    drawPie() {
      const dom = document.querySelector('.account-budget-pie')
      if (!this.myChart) {
        this.myChart = echarts.init(dom)
      }
      const option = {
        tooltip: {
          show: false
        },
        label: {
          show: false

        },
        graphic: [{　　　　　　　　　　　　　　　　//环形图中间添加文字
          type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
          left: 'center',
          top: 'center',
          style: {
            text: this.text,
            textAlign: 'center',
            fill: '#ccc',　　　　　　　　//文字的颜色
            fontSize: 12,
          }
        }],
        series: [
          {

            type: 'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            tooltip: {
            },
            label: {
              show: false,
            },
            data: [
              { value: this.budget, name: '本月预算', itemStyle: { color: '#ccc' } },
              { value: this.expend, name: '本月支出', itemStyle: { color: '#ffda44' } },
            ]
          }
        ]
      };
      this.myChart.setOption(option)
    }
  },
  mounted() {
    this.drawPie();
    //  `剩余\n${(1 - +this.totalExpend / +this.totalBudget).toFixed(2) * 100}%`
    console.log(this.text);
  },
}
</script>

<style lang="scss" scoped>
.account-budget-pie {
  width: 100px;
  height: 100%;
  margin-right: 10px;
}
</style>