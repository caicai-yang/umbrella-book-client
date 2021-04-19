<template>
  <div
    class="alertCmpBox"
    v-if="show"
  >
    <div
      v-if="mode==='normal'"
      class="alertCmp-normal"
    >
      <div
        class="alertCmp-normal-close"
        @click="show=false"
      />
      <div class="alertCmp-normal-title">{{title}}</div>
      <div class="alertCmp-normal-content">{{content}}</div>
      <div
        class="alertCmp-normal-btn"
        @click="() => {handleComfirm && handleComfirm(); show=false}"
      >{{btnText}}</div>
    </div>
    <div
      class="alertCmp-plain"
      v-else
    >
      <div class="alertCmp-plain-content">{{content}}</div>
      <div class="alertCmp-plain-btn">
        <div
          class="alertCmp-plain-btn--cancel"
          @click="show=false"
        >取消</div>
        <div
          class="alertCmp-plain-btn--comfirm"
          @click="() => {handleComfirm && handleComfirm(); show=false}"
        >确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 普通弹窗用来询问决定, 比如退出登录 => mode: 'plain'
  // 大按钮一般用来强调情况, 比如公告 => mode: 'normal' 默认是 normal
  // 控制文本的最大高度为284px, 过长使用滑动
  // content 不能作为函数来使用！！！
  name: 'g-alert-cmp',
  data() {
    return {
      show: true,
      mode: 'normal',
      // mode: 'plain',
      title: '',
      hasCloseIcon: true,
      btnText: '确定',
      content: '',
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.alertCmpBox {
  @include bgGrey();
  @include disFlex();
  .alertCmp-normal {
    // 图层居中
    width: 250px;
    background: #ffffff;
    border-radius: 12px;
    padding: 10px;
    text-align: center;
    position: relative;
    &-close {
      @include posAbs($top: 10px, $right: 10px);
      @include bgImage(18px, 18px, "~@/assets/close.png");
    }
    &-title {
      font-size: 17px;
      font-weight: 600;
      color: #1d1d1d;
      line-height: 22px;
    }
    &-content {
      min-height: 140px;
      max-height: 223px;
      font-size: 16px;
      margin: 11px 0px 35px 0px;
      overflow-y: auto;
    }
    &-btn {
      width: 230px;
      height: 44px;
      line-height: 44px;
      font-size: 18px;
      background: $primaryColor;
      border-radius: 22px;
      font-weight: bold;
      color: $mainColor;
    }
  }

  .alertCmp-plain {
    width: 280px;
    background: #ffffff;
    border-radius: 4px;

    &-content {
      min-height: 91px;
      @include disFlex();
      font-size: 18px;
      font-weight: 600;
      color: #1d1d1d;
    }
    &-btn {
      width: 100%;
      height: 44px;
      font-size: 18px;
      font-weight: bold;
      color: $mainColor;
      @include disFlex();
      border-top: 1px #d3d5da solid;
      &--cancel {
        flex: 1;
        color: #999999;
        @include disFlex();
        position: relative;
        &::after {
          position: absolute;
          right: 0px;
          content: "";
          width: 1px;
          height: 19px;
          background-color: #dfdfdf;
        }
      }
      &--comfirm {
        flex: 1;
        @include disFlex();
      }
    }
  }
}
</style>
