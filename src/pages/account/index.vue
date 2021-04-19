<template>
  <div class="account">
    <Header
      :totalDays="totalDays"
      :totalAccounts="totalNumber"
    />
    <!-- 扫描录入 -->
    <Base
      title="上传小票录入, 更加快捷"
      class="account-scan"
      @click="$router.push('account-scan')"
    >
    </Base>
    <!-- 账单 -->
    <Base
      title="账单"
      @click="$router.push('account-history-bill')"
    >
    <template #default>
      <div class="account-bill">
        <div class="account-bill-month"><span>{{date | formatDate('MM')}}</span>月</div>
        <div
          class="account-bill-list"
          v-if="balanceDate"
        >
          <div class="account-bill-list-item">
            <span>收入</span>
            <span>{{balanceDate['income']}}</span>
          </div>
          <div class="account-bill-list-item">
            <span>支出</span>
            <span>{{balanceDate['expend']}}</span>
          </div>
          <div class="account-bill-list-item">
            <span>结余</span>
            <span>{{balanceDate['income']-balanceDate['expend']}}</span>
          </div>

        </div>
      </div>
    </template>
    </Base>
    <!-- 账单结束 -->

    <!-- 预算 -->
    <!-- 月总预算 -->
    <Base :title="title">
    <template #arrow>
      <div
        class="account-budget-arrow"
        @click="hasSetBudgetCmp=true"
      >+ 设置预算</div>
    </template>
    <template #default>
      <div class="account-budget">
        <!-- 饼图 -->
        <Pie
          v-if="showPie"
          :totalExpend="totalExpend"
          :totalBudget="totalBudget"
        />
        <div class="account-budget-list">
          <div class="account-budget-list-item">
            <span>剩余预算</span>
            <span>{{totalBudget-totalExpend}}</span>
          </div>
          <div class="account-budget-list-item">
            <span>本月预算</span>
            <span>{{totalBudget}}</span>
          </div>
          <div class="account-budget-list-item">
            <span>本月支出</span>
            <span>{{totalExpend}}</span>
          </div>
        </div>
      </div>
    </template>
    </Base>
    <SetBudget
      :show.sync="hasSetBudgetCmp"
      :budgetValue.sync="budgetValue"
      @handleComfirm="handleSetBudgetComfirm"
    />
    <!-- 预算结束 -->
  </div>
</template>

<script>
// components
import Header from './Header';
import Base from './Base';
import SetBudget from './SetBudget';
import Pie from './Pie'
// helper
import { transDate, countDay } from '@/helper/utils/dates'
// api
import { getBalanceByDate, setBudget, getBudget } from '@/api'
const date = new Date()
export default {
  name: 'account',
  data() {
    return {
      // 是否出现设置预算组件
      hasSetBudgetCmp: false,
      // 设置预算
      budgetValue: null,
      // 当前日期
      date: date,
      title: transDate(date, 'MM') + '月总预算',
      balanceDate: null,
      // 总支出
      totalExpend: '0.00',
      // 本月预算
      totalBudget: '0.00',
      showPie: false,
      totalNumber: 0,
      totalDays: countDay(localStorage.getItem('createdAt'))
    }
  },
  methods: {
    async handleSetBudgetComfirm() {
      // 发送修改预算值的请求: 预算值: this.budgetValue
      this.showPie = false
      const res = await setBudget({
        date,
        budget: this.budgetValue
      })
      this.totalExpend = res['totalExpend'].toFixed(2)
      this.totalBudget = res['totalBudget'].toFixed(2)
      this.budgetValue = null
      this.showPie = true
      this.$toast({
        msg: '成功设置',
        pos: 'bottom'
      })
    },
    async fetchtBalanceByDate(date) {
      this.balanceDate = await getBalanceByDate({ date })
    },
    async fetchBudget(params) {
      const res = await getBudget(params)
      this.totalExpend = res['totalExpend'].toFixed(2)
      this.totalBudget = res['totalBudget'].toFixed(2)
      this.totalNumber = res['totalNumber']
      this.showPie = true
    },
    async init() {
      this.$store.commit('setHasNav', true)
      this.fetchtBalanceByDate(transDate(this.date, 'YYYY-MM'))
      this.fetchBudget({
        id: 1,
        date: this.date
      })
    },
  },
  components: {
    Header,
    Base,
    SetBudget,
    Pie
  },
  created() {
    this.init()
  }
}
</script>
<style lang="scss">
@import "~@/styles/base";
.account {
  height: 100%;
  background-color: #f6f6f6;
  overflow-y: auto;
  &-scan {
    margin-top: -30px;
  }
  &-bill {
    font-size: 14px;
    width: 100%;
    @include disFlex(row, flex-start, center);
    &-month {
      width: 50px;
      border-right: 1px solid #ccc;
      span {
        font-size: 18px;
      }
    }
    &-list {
      flex: 1;
      @include disFlex(row, space-between, center);
      &-item {
        flex: 1;
        @include disFlex(column, center, center);
        span:first-child {
          color: #aaa;
          line-height: 1.5;
        }
      }
    }
  }
  &-budget {
    color: #aaa;
    height: 100px;
    @include disFlex(row, flex-start, center);
    &-arrow {
      font-size: 12px;
      padding: 5px;
      background-color: $primaryColor;
      border-radius: 10px;
    }
    &-pie {
    }
    &-list {
      flex: 1;
      line-height: 2;
      @include disFlex(column, center, center);
      &-item {
        width: 100%;
        @include disFlex(row, space-between, center);
        &:first-child {
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }
}
</style>