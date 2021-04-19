<template>
  <transition name="scroll">
    <div
      v-if="show"
      class="toolTip"
    >
      <template v-if="total">
        <div class="toolTip-total">总消费: <span>{{total}}</span>元</div>
        <div>最大的三笔消费: </div>
        <div
          v-for="(item,index) in tops"
          class="toolTip-tops"
        >
          <div class="toolTip-tops--icon">
            <img :src="item.icon">
          </div>
          <span>{{item.date}}</span>
          <span>{{item.category}}</span>
          <span class="money">{{item.money}}</span>
        </div>

      </template>
      <div
        class="toolTip-empty"
        v-else
      >
        没有消费
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'tooltip',
  data() {
    return {
      // tooltip 是否显示
      show: true,
      // 总支出
      total: 0,
      // avger 平均值
      avger: 0,
      // type: 1是收入, 0 是支出
      type: 1,
      // 最大的大笔消费 [{category:'', date: '', day: '', icon: '', money: xxx}]
      tops: [],
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.toolTip {
  position: fixed;
  left: 0;
  bottom: 0;
  // width: 175px;
  width: 100%;
  min-height: 60px;
  border-radius: 10px;
  background-color: #333331;
  color: #fff;
  padding: 10px 0;
  line-height: 1.5;
  font-size: 16px;
  @include disFlex(column, center, center);
  &-total {
    span {
      font-weight: 700;
    }
  }
  &-tops {
    @include disFlex(row, flex-start, center);
    min-width: 50%;
    max-width: 100%;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    > *:not([class="money"]) {
      margin-right: 10px;
    }
    &--icon {
      width: 20px;
      height: 20px;
      background-color: #fff;
      border-radius: 50%;
      @include disFlex(row, center, center);
      img {
        width: 15px;
        height: 15px;
        border-radius: 50%;
      }
    }
  }

  &-empty {
    width: 100%;
    height: 60px;
    @include disFlex(row, center, center);
    font-size: 18px;
    font-weight: 700;
  }
}
.scroll-enter-active,
.scroll-leave-active {
  transition: transform 1s ease;
}
.scroll-enter,
.scroll-leave-to {
  transform: translateY(200px);
}
</style>