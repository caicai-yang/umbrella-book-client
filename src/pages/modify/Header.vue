<template>
  <div class="modify-header">
    <div
      :class="['modify-header--title', type?null:'active']"
      @click="$emit('click', false)"
    >支出</div>
    <div
      :class="['modify-header--title', type?'active':null]"
      @click="$emit('click', true)"
    >收入</div>
    <div
      class="modify-header--cancel"
      @click="$router.go(-1)"
    >取消</div>
  </div>
</template>

<script>
export default {
  name: 'modify-header',
  props: {
    type: Boolean
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.modify-header {
  @include disFlex(row);
  width: 100%;
  height: 50px;
  position: fixed;
  background-color: $primaryColor;
  &--title {
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
    @include disFlex(row, center, center);
    &.active {
      border-bottom: 2px solid #000;
    }
  }
  &--cancel {
    @include posAbs($top: 50%, $right: 10px);
    transform: translateY(-50%);
    font-size: 14px;
  }
}
</style>