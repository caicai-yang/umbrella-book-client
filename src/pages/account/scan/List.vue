<template>
  <div class="scan-list-item">
    <!-- type -->
    <select
      :value="type"
      @change="changeType($event.target.value)"
    >
      <option value="0">支出</option>
      <option value="1">收入</option>
    </select>
    <!-- categroy -->
    <select
      value="categoryId"
      @change="$emit('update:categoryId', $event.target.value)"
    >
      <option
        v-for="item in categoryListWithType(type)"
        :key="item.id"
        :value="item.id"
      >{{item.name}}</option>
    </select>
    <!-- money -->
    <input
      type="number"
      :value="money"
      @input="$emit('update:money', $event.target.value)"
    >
    <!-- remark -->
    <input
      type="text"
      :value="remark"
      @input="$emit('update:remark', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'scan-list',
  props: {
    categoryList: {
      type: Array,
      default: () => []
    },
    type: Number | String,
    categoryId: Number | String,
    money: String,
    remark: String
  },
  methods: {
    // 用 computed 不行
    categoryListWithType(type) {
      return this.categoryList.filter(item => item.type == type)
    },
    changeType(type) {
      this.$emit('update:type', type)
      this.$emit('update:categoryId', this.categoryListWithType(type)[0]['id'])
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.scan-list-item {
  width: 100%;
  height: 30px;
  @include disFlex(row, space-between, center);
  option,
  input {
    width: 75px;
    text-align: center;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
}
</style>