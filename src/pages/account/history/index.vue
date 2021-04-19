<template>
  <div class="account-history-bill">
    <Header
      v-if="totalBalance"
      @click="showDatePicker=!showDatePicker"
      :year="year"
      :totalBalance="totalBalance"
    />
    <List
      v-if="balanceDate.length"
      :balanceDate="balanceDate"
    />
    <datePicker
      :show.sync="showDatePicker"
      :modeObj="modeObj"
      title="选择年份"
      @handleComfirm="handleComfirm"
    />
  </div>
</template>

<script>
// components
import Header from './Header.vue'
import List from './List.vue'
import datePicker from '@/components/datePicker/index'
// api
import { getBalanceByDate } from '@/api'
const date = new Date()
export default {
  name: 'history-bill',
  data() {
    return {
      showDatePicker: false,
      year: date.getFullYear(),
      modeObj: {
        years: date.getFullYear()
      },
      totalBalance: null,
      balanceDate: []
    }
  },
  methods: {
    handleComfirm(value) {
      this.year = value['years']
      this.modeObj = {
        years: value['years']
      }
      this.showDatePicker = false
      this.fetchBalanceByDate()
    },
    async fetchBalanceByDate() {
      const res = await getBalanceByDate({
        date: this.year
      })
      this.totalBalance = {}
      this.totalBalance['income'] = res['income']
      this.totalBalance['expend'] = res['expend']
      this.balanceDate = res['data']
    }

  },
  components: {
    Header,
    List,
    datePicker
  },
  created() {
    this.fetchBalanceByDate()
  }
}
</script>

<style lang="scss">
@import "~@/styles/base";
.account-history-bill {
  max-height: 100%;
  overflow-y: auto;
}
</style>