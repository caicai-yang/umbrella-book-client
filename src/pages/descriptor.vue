<template>
  <div class="descriptor">
    <header class="descriptor-header">
      <img
        class="descriptor-header--icon"
        :src="selectItem.icon"
      />
      <div class="descriptor-header--category">{{selectItem.name}}</div>
      <div
        class="descriptor-header--arrow"
        @click="$router.go(-1)"
      ></div>
    </header>
    <div class="descriptor-main">
      <div
        class="descriptor-main--item"
        v-for="(value, key) in selectItem.desc"
        :key="key"
      >
        <div class="descriptor-main--item_key">{{key}}</div>
        <div class="descriptor-main--item_value">{{value}}</div>
      </div>
    </div>
    <div class="descriptor-footer">
      <!-- <span @click.stop="handleModify">编辑</span> -->
      <span @click.stop="$router.push('modify')">编辑</span>
      <span @click="handleDelete">删除</span>
    </div>
  </div>
</template>

<script>
import { deleteBill } from '@/api'

export default {
  // 一个账单对象的描述器
  name: 'descriptor',
  computed: {
    selectItem() {
      return JSON.parse(localStorage.getItem('selectItem'))
    },
    id() {
      return JSON.parse(localStorage.getItem('selectItem'))['id']
    }
  },
  methods: {
    handleDelete() {
      this.$alert({
        mode: 'plain',
        content: '删除后数据不可恢复',
        btnText: '删除',
        handleComfirm: async () => {
          // 删除操作在这里进行
          const res = await deleteBill({
            id: this.id
          })
          if (res) {
            this.$toast({
              msg: '删除成功',
              pos: 'bottom',
              timeout: 500
            })
          }
          const timer = setTimeout(() => {
            this.$router.go(-1)
            clearTimeout(timer)
          }, 500);
        },
      })
    },
  },
  beforeCreate() {
    // 不显示底部导航: mutations => commit
    this.$store.commit('setHasNav', false)
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.descriptor {
  font-size: 16px;
  color: $mainColor;
  position: relative;
  width: 100vw;
  height: 100vh;
  &-header {
    height: 105px;
    background-color: $primaryColor;
    @include disFlex(column);
    position: relative;
    &--icon {
      width: 57px;
      height: 57px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    &--arrow {
      position: absolute;
      top: 20px;
      left: 20px;
      @include bgImage(24px, 24px, "~@/assets/left-arrow.png");
    }
  }
  &-main {
    padding-left: 25px;
    &--item {
      height: 59px;
      border-bottom: 1px solid #ccc;
      @include disFlex(row, flex-start, center);
      &_key {
        color: #a1a1a1;
        margin-right: 15px;
      }
    }
  }
  &-footer {
    @include disFlex(row, center);
    height: 60px;
    border-top: 1px solid #ccc;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background-color: #fff;
    span {
      width: 50%;
      text-align: center;
    }
    span:first-child {
      position: relative;
      &::after {
        position: absolute;
        right: 0;
        content: "";
        width: 2px;
        height: 22px;
        background-color: #ccc;
      }
    }
  }
}
</style>
