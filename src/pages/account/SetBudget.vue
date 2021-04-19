<template>
  <div
    class="account-set-budget"
    v-if="show"
  >
    <div class="account-set-budget-box">
      <div class="account-set-budget-box-title">设置预算</div>
      <input
        class="account-set-budget-box-content"
        placeholder="请输入...."
        :value="budgetValue"
        @input="$emit('update:budgetValue', $event.target.value)"
      />
      <div class="account-set-budget-box-btn">
        <div
          class="account-set-budget-box-btn--cancel"
          @click="$emit('update:show', false)"
        >取消</div>
        <div
          class="account-set-budget-box-btn--comfirm"
          @click="() => {$emit('handleComfirm'); $emit('update:show', false)}"
        >确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account-set-budget',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    budgetValue: Number | null
  }
}
</script>

<style lang="scss">
@import "~@/styles/base";
.account-set-budget {
  @include bgGrey();
  &-box {
    @include posAbsBothCenter();
    background-color: #fff;
    width: 220px;
    padding: 10px;
    border-radius: 10px;
    // height: 400px;
    &-title {
      text-align: center;
      font-size: 17px;
      font-weight: 600;
      color: #1d1d1d;
      line-height: 22px;
    }
    &-content {
      width: 100%;
      min-height: 91px;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      color: $primaryColor;
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