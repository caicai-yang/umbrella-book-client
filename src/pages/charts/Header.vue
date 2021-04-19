<template>
  <div class="charts-header">
    <template v-if="$listeners.cancel">
      <div
        class="charts-header-cancel"
        @click="$listeners.cancel()"
      >
        <img src="@/assets/left-arrow.png">
      </div>
    </template>
    <div class="charts-header-title">
      <template v-if="(title instanceof Array)">
        <span
          v-for="(item, index) in title"
          :key="index"
          :class="activeTitle && activeTitle===item ?'active':null"
          @click="$emit('change', item)"
        >{{item}}</span>
      </template>
      <span v-else>{{title}}</span>
    </div>
    <ul class="charts-header-date">
      <li
        v-for="(item, index) in dates"
        :key="index"
        @click="handleClick(index)"
        :class="actived===index ?'active':null"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'charts-header',
  props: {
    title: {
      type: Array | String,
      required: true
    },
    dates: {
      type: Array,
      default: () => ['周', '月', '年']
    },
    // 支出或者收入的 active
    activeTitle: String,
    // dates 中的 active
    actived: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClick(index) {
      this.$emit('update:actived', index)
      this.$emit('click')
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.charts-header {
  width: 100%;
  background-color: $primaryColor;
  font-size: 14px;
  position: relative;
  @include disFlex(column, center, center);
  &-cancel {
    width: 20px;
    height: 20px;
    @include posAbs($top: 5px, $left: 10px);
  }
  &-title {
    width: 100%;
    // height: 30px;
    color: $mainColor;
    @include disFlex(row, center, center);
    span {
      padding: 5px 10px;
      box-sizing: border-box;
      &:not(:last-child) {
        margin-right: 10px;
      }
      &.active {
        // border-bottom: 2px solid $mainColor;
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
  &-date {
    width: 375px - 20px;
    margin-bottom: 5px;
    // box-sizing: border-box;
    border: 1px solid $mainColor;
    @include disFlex(row, center, center);
    li {
      flex: 1;
      text-align: center;
      &:not(:last-child) {
        border-right: 1px solid $mainColor;
      }
      &.active {
        background-color: $mainColor;
        color: $primaryColor;
      }
    }
  }
}
</style>