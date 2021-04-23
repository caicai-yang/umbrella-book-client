<template>
  <div
    class="calc"
    v-if="isShow"
  >
    <datePicker
      :show.sync="hasDatePicker"
      title="选择日期"
      :modeObj="modeObj"
      @handleComfirm="handleComfirm"
    />

    <div class="calc-header">
      <div class="calc-header--remark">备注: <input
          placeholder="请填写备注"
          v-model="remark"
        /></div>
      <div class="calc-header--money">{{money}}</div>
    </div>
    <ul
      class="calc-main"
      @click="handleClick($event)"
    >
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li @click.stop="hasDatePicker=true">{{date}}</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>+</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>-</li>
      <li>.</li>
      <li>0</li>
      <li @click.stop="handleBackOff">清除</li>
      <li @click.stop="handleComplete">{{isComplete?'完成':'='}}</li>
    </ul>
  </div>
</template>

<script>
import datePicker from '@/components/datePicker';

export default {
  name: 'calc',
  computed: {
    modeObj() {
      const arr = this.date.split('-').map(item => Number(item))
      return {
        years: arr[0],
        months: arr[1],
        dates: arr[2],
      }
    }
  },
  data() {
    return {
      isShow: true,
      remark: '',
      money: '',
      date: '',
      // 日期组件是否出显示
      hasDatePicker: false,
      // 判断是否是第一次点击
      hasClick: false,
      isComplete: true
    }
  },
  methods: {
    handleClick(event) {
      this.isComplete = false
      const value = event.target.innerText
      if (!this.hasClick && !(/[+-]/.test(value))) {
        this.money = value
        this.hasClick = true
        return
      }
      if (this.money.length > 10) return
      this.hasClick = true
      this.money += value
    },
    handleBackOff() {
      if (this.money) {
        this.money = this.money.slice(0, this.money.length - 1)
      }
    },
    handleComplete() {
      if (!this.money) {
        this.$toast('金额不能为空')
        return
      }
      this.isComplete = true
      // 如何用正则来实现?
      if (/\d+[+-]\d+/g.test(this.money)) {
        const money = /[-+]$/.test(this.money) ? this.money.slice(0, this.money.length - 1) : this.money
        this.money = (eval(money)).toString()
      } else {
        // 修改数据的请求
        this.sendHttp({
          money: this.money,
          createdAt: this.date,
          remark: this.remark,
        })
      }
    },
    handleComfirm(value) {
      // value: {years: xxx, months: xxx, dates: xxx}
      this.date = `${value['years']}-${value['months']}-${value['dates']}`
      this.hasDatePicker = false
    }
  },
  components: {
    datePicker,
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.calc {
  width: 100%;
  font-size: 14px;
  color: $mainColor;
  font-weight: bold;
  background-color: #f3f4f6;
  position: fixed;
  left: 0px;
  bottom: 0px;
  & .datePicker-box {
    // height: 100%;
  }
  &-header {
    height: 45px;
    padding: 0 10px;
    @include disFlex(row, space-between, center);
    &--remark {
      flex: 1;
      input {
        border: none;
        outline: none;
        background: transparent;
      }
    }
    &--money {
      font-size: 18px;
      // max-width: 100px;
    }
  }
  &-main {
    height: 100%;
    @include disFlex();
    flex-wrap: wrap;
    li {
      @include disFlex();
      width: 93.75px;
      height: 52.2px;
      box-sizing: border-box;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    li:active {
      background: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
