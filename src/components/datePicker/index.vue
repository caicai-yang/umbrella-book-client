<template>
  <div
    class="datePicker"
    v-if="show"
  >
    <div class="datePicker-box">
      <div class="datePicker-header">
        <div
          class="datePicker-header-cancel"
          @click="$emit('update:show', false)"
        >取消</div>
        <div class="datePicker-header-title">{{title}}</div>
        <div
          class="datePicker-header-comfirm"
          @click="$emit('handleComfirm', obj)"
        >确定</div>
      </div>
      <div class="datePicker-select">
        <selectColumn
          v-for="(value, key) in modeObj"
          :key="key"
          :mode="key"
          :value="value"
          @select="getSelectValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import selectColumn from './selectColumn'

export default {
  name: 'date-picker',
  props: {
    // modeObj: {mode: defaultValue}
    modeObj: {
      type: Object,
      default: () => ({}),
    },
    show: Boolean,
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    selectColumn,
  },
  data() {
    return {
      obj: { ...this.modeObj },
    }
  },
  methods: {
    getSelectValue(value) {
      // value: {year: value}
      Object.keys(this.obj).forEach((key) => {
        if (value[key]) {
          this.obj[key] = value[key]
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.datePicker {
  @include bgGrey();
  &-box {
    width: 100%;
    background: #fff;
    position: absolute;
    bottom: 0;
    @include disFlex(column);
  }
  &-header {
    @include disFlex(row, space-between, center);
    width: 100%;
    height: 35px;
    padding: 0px 20px;
    border-bottom: 1px solid #ccc;
    font-weight: 600;
    font-size: 14px;
    color: $mainColor;
  }
  &-select {
    width: 100%;
    @include disFlex();
  }
}
</style>
