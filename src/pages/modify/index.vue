<template>
  <div class="modify">
    <Header
      :type="item.type"
      @click="handleClick"
    />
    <List
      :list="list"
      :type="item.type"
      :iconId="item.categoryId"
      @click="changeCategoryId"
    />
  </div>
</template>

<script>
import Header from './Header';
import List from './List';
import { getCategoryByType, updateBill } from '@/api'
export default {
  name: 'modify',
  components: {
    Header,
    List
  },
  data() {
    return {
      item: JSON.parse(localStorage.getItem('selectItem')),
      list: {}, // {type: 'xxx', data: []}
      isActive: false,
    }
  },
  methods: {
    async queryList(type) {
      this.list = await getCategoryByType({ type })
    },
    handleClick(type) {
      this.item.type = type
      this.queryList(type)
    },
    changeCategoryId(id) {
      this.item.categoryId = id
    },
    init() {
      this.queryList(this.item.type)
    }
  },
  created() {
    this.init()
    this.$calc({
      isShow: true,
      date: this.item.createdAt,
      remark: this.item.remark,
      money: this.item.money.toString(),
      sendHttp: async (params) => {
        // console.log('params', params);
        // console.log('id', this.item.categoryId);
        // console.log('uid', this.item.id)
        const res = await updateBill({
          ...params,
          categoryId: this.item.categoryId,
          id: this.item.id
        })
        if (res) {
          this.$toast({
            msg: '修改成功',
            pos: 'bottom',
            timeout: 500
          })
          const timer = setTimeout(() => {
            this.$router.push('/detail')
            clearTimeout(timer)
          }, 500);
        }
      }
    })
  },
  beforeCreate() {
    this.$store.commit('setHasNav', false)
  },
  beforeDestroy() {
    this.$calc(false)
  }
}
</script>

<style lang="scss">
.modify {
  height: 100%;
  overflow: hidden;
}
</style>