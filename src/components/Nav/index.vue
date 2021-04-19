<template>
  <div class="nav">
    <div
      class="nav-item"
      v-for="(item, index) in navList"
      :key="index"
      @click="handleClick(item, index)"
    >
      <div class="nav-item--icon">
        <img :src="item.icon" />
      </div>
      <div :class="[active===index ? 'nav-item--text': null]">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import navList from './constant'

export default {
  name: 'nav-cmp',
  data() {
    return {
      navList,
      active: 0,
    }
  },
  methods: {
    handleClick(item, index) {
      this.active = index
      this.$router.replace(item.path)
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.nav {
  height: $navHeight;
  width: 100vw;
  background: #fff;
  box-shadow: 0 4vw 8vw rgba(0, 0, 0, 0.8);
  @include disFlex();
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  z-index: 100;
  color: $mainColor;
  font-size: 14px;
  &-item {
    @include disFlex(column);
    &--icon {
      width: 22px;
      height: 22px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &--text {
      color: #000;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
