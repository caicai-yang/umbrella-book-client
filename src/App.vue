<template>
  <div id="app">
    <navCmp v-if="hasNav" />
    <router-view :class="hasNav?'pd-bottom':null" />
  </div>
</template>

<script>
import navCmp from '@/components/Nav/index'
export default {
  name: 'app',
  components: {
    navCmp,
  },
  computed: {
    hasNav() {
      return this.$store.state.hasNav
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/normalize";
@import "~@/styles/reset";
#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.pd-bottom {
  padding-bottom: $navHeight;
}
</style>
