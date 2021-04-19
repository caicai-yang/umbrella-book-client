<template>
  <div class="rankList">
    <h1 class="rankList-title">{{type}}排行榜</h1>
    <div
      class="rankList-list"
      v-if="rankList.total"
    >
      <div
        v-for="(item, index) in rankList.data"
        class="rankList-list-item"
        @click="$listeners.click && $emit('click', item.categoryId, item.name)"
      >
        <div class="rankList-list-item--icon">
          <img :src="item.icon">
        </div>
        <div class="rankList-list-item-box">
          <div class="rankList-list-item-box-top">
            <div class="rankList-list-item-box-top--categroy">{{item.remark?item.remark:item.name}}</div>
            <div class="rankList-list-item-box-top--percent">{{getPercent(item.money)}}</div>
            <div class="
              rankList-list-item-box-top--money">{{item.money}}</div>
          </div>
          <div
            class="rankList-list-item-box-bottom"
            :style="{width: getPercent(item.money)}"
          ></div>
          <div
            class="rankList-list-item-box-date"
            v-if="item.createdAt"
          >{{item.createdAt | formatDate('MM-DD')}}</div>
        </div>
      </div>
    </div>
    <p
      v-else
      class="rankList-empty"
    >空空如也</p>
  </div>
</template>

<script>
export default {
  name: 'charts-rank-list',
  props: {
    type: {
      type: String,
      required: true
    },
    rankList: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getPercent(money) {
      return (money / this.rankList.total * 100).toFixed(2) + '%'
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.rankList {
  flex: 1;
  border-top: 1px solid #ccc;
  width: 100%;
  padding: 10px 10px 0;
  overflow-y: auto;
  &-title {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 10px;
  }
  &-list {
    &-item {
      @include disFlex(row, flex-start, center);
      margin-bottom: 10px;
      &-box {
        flex: 1;
        @include disFlex(column, flex-start, flex-start);
        height: 100%;
        &-top {
          width: 100%;
          @include disFlex(row, space-between, center);
        }
        &-bottom {
          height: 3px;
          background-color: $primaryColor;
          border-radius: 10px;
        }
        &-date {
          color: #ccc;
        }
      }
      &--icon {
        width: 35px;
        height: 35px;
        background: #ccc;
        border-radius: 50%;
        margin-right: 10px;
        @include disFlex(row, center, center);
        img {
          height: 20px;
          width: 20px;
          border-radius: 50%;
        }
      }
    }
  }
  &-empty {
    height: 100%;
    width: 100%;
    font-size: 20px;
    color: #ccc;
    font-style: italic;
    @include disFlex(row, center, center);
  }
}
</style>