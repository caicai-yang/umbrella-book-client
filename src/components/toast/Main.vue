<template v-if="show">
  <div class="toastCmp">
    <div :class="['toastCmp-content', `toastCmp-content-${pos}`]">{{`${APPNAME}: ${msg}`}}</div>
  </div>
</template>

<script>
import { APPNAME } from '@/helper/app'

export default {
  name: 'g-toast-cmp',
  data() {
    return {
      show: true,
      msg: '默认内容',
      APPNAME,
      // top 的可能取值: 'top', 'middle', 'bottom'
      pos: 'middle',
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.toastCmp {
  @include bgGrey($alpha: 0);
  &-content {
    @include posAbsHorizontally();
    padding: 10px;
    background: $mainColor;
    color: #fff;
    font-size: 14px;
    border-radius: 10px;
    &-bottom {
      bottom: 30px;
    }
    &-middle {
      @include posAbsBothCenter();
    }
    &-top {
      top: 30px;
    }
  }
}
</style>
