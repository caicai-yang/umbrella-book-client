<template v-if="show">
  <div class="pageLoading-cmp">
    <div
      class="pageLoading-cmp-normal"
      v-if="mode==='normal'"
    >
      <div class="pageLoading-cmp-normal--icon"/>
      <div class="pageLoading-cmp-normal--text">加载中...</div>
    </div>
    <div
      class="pageLoading-cmp-small"
      v-else
    />
  </div>
</template>

<script>
export default {
  name: 'g-page-loading-cmp',
  data() {
    return {
      show: false,
      // mode: 'small' || 'normal'
      mode: 'normal',
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.pageLoading-cmp {
  @include bgGrey();
  &-normal {
    @include posAbsBothCenter();
    background-color: $mainColor;
    color: #fff;
    width: 168px;
    height: 168px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 18px;
    @include disFlex(column);
    &--icon {
      @include bgImage(50px, 50px, "~@/assets/loading.png");
      animation: rotate 1s linear infinite;
      transform-origin: center;
    }
    &--text {
      margin-top: 20px;
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
