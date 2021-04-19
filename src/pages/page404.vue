<template>
  <h1 class="page404">page 404...</h1>
</template>

<script>
export default {
  name: 'no-found',
  created() {
    this.$store.commit('setHasNav', false)
  }
}
</script>

<style lang="scss">
@import "~@/styles/base";
.page404 {
  font-size: 22px;
  text-align: center;
}
</style>