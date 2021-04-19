<template>
  <div class="account-header">
    <header class="account-header-logo">
      <div class="account-header-logo--icon">
        <img src="@/assets/logo.png">
      </div>
      <div class="account-header-logo--name">{{APPNAME}}</div>
    </header>
    <div class="account-header-achievement">
      <div class="account-header-achievement-item">
        <div class="account-header-achievement-item--num">{{totalDays}}</div>
        <div class="account-header-achievement-item--desc">记账总天数</div>
      </div>
      <div class="account-header-achievement-item">
        <div class="account-header-achievement-item--num">{{totalAccounts}}</div>
        <div class="account-header-achievement-item--desc">记账总笔数</div>
      </div>
    </div>
  </div>
</template>

<script>
import { APPNAME } from '@/helper/app'
export default {
  name: 'account-header',
  props: {
    totalDays: {
      type: Number,
      required: true
    },
    totalAccounts: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      APPNAME
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.account-header {
  width: 100%;
  height: 150px;
  $percent: 25%;
  background-color: $primaryColor;
  border-bottom-left-radius: $percent;
  border-bottom-right-radius: $percent;
  $height: 50px;
  &::before {
    // 子容器里设置了 margin, 不会发生外边距溢出的情况
    content: "";
    display: table;
  }
  &-logo {
    @include disFlex(row, flex-start, center);
    height: $height;
    margin: 10px;
    font-size: 18px;
    font-weight: 600;
    &--icon {
      width: $height;
      height: $height;
      background-color: #fff;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  &-achievement {
    width: 100%;
    height: $height;
    @include disFlex(row, center, center);
    &-item {
      flex: 1;
      @include disFlex(column, center, center);
      &--num {
        font-size: 14px;
        font-weight: 700;
      }
      // &:first-child {
      //   margin-right: 20px;
      // }
    }
  }
}
</style>