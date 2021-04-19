<template>
  <div class="billHeader">
    <div
      class="billHeader-header"
      @click="$emit('click')"
    >
      <div class="billHeader-header--time">{{year}}年</div>
      <div class="billHeader-header--title">账单</div>
    </div>
    <div class="billHeader-main">
      <div class="billHeader-main--balance">
        <span>结余</span>
        <span>{{(totalBalance['income']-totalBalance['expend']).toFixed(2)}}</span>
      </div>
      <div class="billHeader-main-money">
        <div
          class="billHeader-main-money--item"
          v-for="(value, key) in totalBalance"
          :key="key"
        >
          <span>{{key==='income'?'收入':'支出'}} </span>
          <span>{{value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history-bill-header',
  props: {
    year: {
      type: Number | String,
      required: true
    },
    totalBalance: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.billHeader {
  height: 150px;
  background-color: $primaryColor;
  color: $mainColor;
  $pLeft: 10px;
  font-size: 14px;
  &-header {
    height: 30px;
    position: relative;
    line-height: 30px;
    text-align: center;
    &--time {
      @include posAbs($left: $pLeft, $top: 0);
      &::after {
        content: "";
        display: block;
        $width: 6px;
        width: 0px;
        height: 0px;
        @include posAbsVertical();
        right: -3 * $width;
        border-top: $width solid $mainColor;
        border-left: $width solid transparent;
        border-right: $width solid transparent;
      }
    }
    &--title {
      font-weight: 600;
    }
  }
  &-main {
    &--balance {
      height: 80px;
      @include disFlex(column, flex-start, center);
      span:first-child {
        line-height: 30px;
        color: grey;
        font-size: 12px;
      }
      span:last-child {
        font-size: 25px;
        line-height: 50px;
        font-weight: 600;
      }
    }
    &-money {
      width: 100%;
      @include disFlex(row, flex-start, center);
      &--item {
        flex: 1;
        @include disFlex(row, center, center);
        &:not(:last-child) {
          border-right: 1px solid $mainColor;
        }
        span:first-child {
          color: grey;
        }
        span:last-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>