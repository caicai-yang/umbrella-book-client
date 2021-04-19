<template>
  <div class="billList">
    <div class="billList-header">
      <span
        v-for="(item, index) in ['月份', '收入', '支出', '结余']"
        :key="index"
      >{{item}}</span>
    </div>
    <ul class="billList-list">
      <ListItem
        v-for="(item, index) in balanceDate"
        :month="index+1"
        :income="item.income"
        :expend="item.expend"
      />
    </ul>
  </div>
</template>

<script>
import ListItem from './listItem'
export default {
  name: 'history-bill-list',
  props: {
    balanceDate: {
      type: Array,
      default: () => []
    },
  },
  components: {
    ListItem,
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.billList {
  &-header {
    @include disFlex(row, flex-start, center);
    height: 20px;
    font-size: 12px;
    color: #ccc;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
    span {
      flex: 1;
      &:not(:first-child) {
        text-align: center;
      }
    }
  }
  &-list {
  }
}
</style>