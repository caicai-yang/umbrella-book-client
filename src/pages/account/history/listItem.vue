<template>
  <li class="billListItem">
    <span>{{month}}月</span>
    <span>{{income}}</span>
    <span>{{expend}}</span>
    <span>{{income-expend}}</span>
    <!-- <div class="more"></div> -->
  </li>
</template>

<script>
export default {
  name: 'history-bill-list-item',
  props: {
    month: {
      type: Number,
      required: true
    },
    income: {
      type: Number,
      required: true
    },
    expend: {
      type: Number,
      required: true
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.billListItem {
  @include disFlex(row, flex-start, center);
  height: 40px;
  font-size: 15px;
  padding-left: 10px;
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
  span {
    flex: 1;
    &:not(:first-child) {
      text-align: center;
    }
  }
  .more {
    @include posAbsVertical();
    right: 10px;
    $width: 4px;
    width: 0;
    height: 0;
    border-right: none;
    border-left: $width solid $mainColor;
    border-top: $width solid transparent;
    border-bottom: $width solid transparent;
  }
}
</style>