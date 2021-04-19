<template>
  <div class="charts-scroll">
    <ul class="charts-scroll-list">
      <li
        v-for="(value, key, index) in list"
        :key="key"
        @click="handleClick(value, index)"
        :class="activeIndex===index?'active':null"
      >{{key}}</li>
    </ul>
  </div>
</template>

<script>
import scrollIntoView from '@/helper/utils/scrollIntoView'
export default {
  name: 'charts-scroll',
  props: {
    list: {
      type: Object,
      default: () => { }
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClick(value, index) {
      scrollIntoView('.charts-scroll-list', index)
      this.$emit('click', value, index)
    }
  },
  mounted() {
    scrollIntoView('.charts-scroll-list', this.activeIndex)
  },
  updated() {
    scrollIntoView('.charts-scroll-list', this.activeIndex)
  }
}
</script>

<style lang="scss">
@import "~@/styles/base";
.charts-scroll {
  width: 100%;
  height: 30px;
  overflow: hidden;
  &-list {
    min-width: 100%;
    height: 100%;
    @include disFlex(row, flex-start, flex-start);
    overflow-x: auto;
    font-size: 12px;
    color: #aaa;
    li {
      min-width: 100px;
      height: 100%;
      text-align: center;
      &.active {
        color: $mainColor;
        border-bottom: 1px solid $mainColor;
      }
    }
  }
}
</style>