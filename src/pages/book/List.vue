<template>
  <div class="modify-list">
    <div
      class="modify-list-item"
      v-for="item in list.data"
      :key="item.id"
    >
      <div
        :class="['modify-list-item--icon', iconId===item.id?'active':null]"
        @click="handleClick(item.id)"
      >
        <img :src="item.icon">
      </div>
      <div class="modify-list-item--name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modify-list',
  props: {
    list: {
      type: Object,
      default: () => ({})
    },
    iconId: Number | null,
    type: Boolean
  },
  methods: {
    handleClick(iconId) {
      this.$emit('update:iconId', iconId)
      this.$emit('click')
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.modify-list {
  width: 100%;
  max-height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  overflow: auto;
  @include disFlex(row, flex-start, flex-start);
  flex-wrap: wrap;
  &-item {
    margin: 10px;
    @include disFlex(column, center, center);
    &--icon {
      width: 55px;
      height: 55px;
      background-color: #ccc;
      border-radius: 50%;
      @include disFlex(row, center, center);
      margin-bottom: 10px;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      &.active {
        background-color: $primaryColor;
      }
    }
    &--name {
      font-size: 15px;
    }
  }
}
</style>