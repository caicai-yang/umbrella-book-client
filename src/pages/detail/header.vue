<template>
  <div class="detail-header">
    <div class="detail-header-title">{{APPNAME}}</div>
    <div class="detail-header-main">
      <div class="detail-header-main--time">
        <div class="detail-header-main--time_year">{{modeObj.years}}年</div>
        <div class="detail-header-main--time_month">{{modeObj.months}}月</div>
        <div
          class="detail-header-main--time_more"
          @click="showDatePicker=!showDatePicker"
        />
      </div>
      <div class="detail-header-main--income">
        <span>收入</span>
        <span>{{totalIncome}}</span>
      </div>
      <div class="detail-header-main--expend">
        <span>支出</span>
        <span>{{totalExpend}}</span>
      </div>
    </div>
    <datePicker
      :show.sync="showDatePicker"
      :modeObj="modeObj"
      title="选择月份"
      @handleComfirm="handleComfirm"
    />
  </div>
</template>

<script>
// helpers
import { APPNAME } from '@/helper/app'
// components
import datePicker from '@/components/datePicker/index'
import dayjs from 'dayjs';
const now = dayjs()

export default {
  name: 'detail-header',
  props: {
    totalExpend: {
      type: Number | String,
      required: true
    },
    totalIncome: {
      type: Number | String,
      required: true
    }
  },
  data() {
    return {
      APPNAME,
      showDatePicker: false,
      modeObj: {
        years: now.year(),
        months: now.month() + 1,
      },
    }
  },
  components: {
    datePicker,
  },
  methods: {
    handleComfirm(value) {
      this.modeObj = value
      this.showDatePicker = false
      // debugger
      if (this.$listeners.click) {
        this.$listeners.click({
          year: value['years'],
          month: value['months']
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.detail-header {
  margin-bottom: 10px;
  height: 95px;
  width: 100%;
  background-color: $primaryColor;
  color: $mainColor;
  &-title {
    height: 47px;
    font-size: 18px;
    font-weight: bold;
    @include disFlex();
  }
  &-main {
    padding-left: 10px;
    @include disFlex(row, flex-start);
    &--time {
      width: 70px;
      @include disFlex(column);
      align-items: flex-start;
      position: relative;
      &_year {
        font-size: 14px;
      }
      &_month {
        font-size: 16px;
      }
      &_more {
        $width: 8px;
        position: absolute;
        right: 0;
        bottom: $width;
        width: 0px;
        height: 0px;
        border-top: $width solid $mainColor;
        border-left: $width solid transparent;
        border-right: $width solid transparent;
      }
    }
    &--income,
    &--expend {
      flex: 1;
      @include disFlex(column);
      font-size: 14px;
      span:not(:first-child) {
        font-size: 16px;
      }
    }
  }
}
</style>
