<template>
  <div class="detailItem">
    <div class="detailItem-header">
      <div class="detailItem-header--time">
        <span>{{date}}</span>
        <span>星期{{day}}</span>
      </div>
      <div class="detailItem-header--inc">
        <span>收入: {{detailItem.totalIncome}}</span>
        <span>支出: {{detailItem.totalExpend}}</span>
      </div>
    </div>
    <div
      class="detailItem-main"
      v-for="(item, index) in detailItem.data"
      :key="index"
      @click="$emit('click', item)"
    >
      <img
        class="detailItem-main--icon"
        :src="item.icon"
      />
      <div class="detailItem-main--type">{{item.name}}</div>
      <div class="detailItem-main--money">{{item.type==1 ? item.money : '-'+item.money}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-item',
  props: {
    // 后台获取数据，过滤无效数据，保证每一个 detailItem 都是有值的
    // response: {config, data:{code: 0, data: [detailItem,detailItem]}}
    // detailItem: {date: 05年05日, day: '星期五', totalIncome: 100, totalExpence: 100, detail: [{icon: '', category: 餐饮, type: 1|0 1是收入, 0是支出, money: 100}]}
    detailItem: {
      type: Object,
      default: () => ({}),
    },
    date: String,
    day: Number
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.detailItem {
  font-size: 16px;
  color: #919191;
  &-header {
    height: 36px;
    padding: 0px 10px;
    font-size: 12px;
    color: #cbcbcb;
    border-bottom: 1px solid #cbcbcb;
    @include disFlex(row, space-between, center);
    &--time,
    &--inc {
      span:first-child {
        margin-right: 10px;
      }
    }
  }
  &-main {
    height: 50px;
    padding: 0 10px;
    @include disFlex(row, flex-start, center);
    &--icon {
      width: 23px;
      height: 23px;
      border-radius: 50%;
      margin-right: 10px;
    }
    &--money {
      flex: 1;
      @include disFlex(row, flex-end, center);
    }
  }
}
</style>
