<template>
  <div class="account-base">
    <!-- <h2 class="account-base-title">{{title}}</h2>
     -->
    <div
      class="account-base-title"
      @click="$emit('click')"
    >
      <h1>{{title}}</h1>
      <slot name="arrow">
        <div class="account-base-title--arrow" />
      </slot>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  // 这个组件用作一个插槽的作用, 具有公共的样式
  name: 'base-slot',
  props: {
    title: {
      type: String,
      required: true
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.account-base {
  background-color: #fff;
  // 375-40
  width: 335px;
  margin: 10px 20px;
  padding: 10px;
  border-radius: 5px;
  &-title {
    font-size: 14px;
    @include disFlex(row, space-between, center);
    // margin-bottom: 10px;
    &--arrow {
      width: 0;
      height: 0;
      // 一个向右的箭头, 上下的 border width 都要有, 左边的不用, 右边的必须要
      $borderWidth: 5px;
      border-top: $borderWidth solid transparent;
      border-left: $borderWidth solid $mainColor;
      border-bottom: $borderWidth solid transparent;
      border-right: none;
    }
  }
}
</style>