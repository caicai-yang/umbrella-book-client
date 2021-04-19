<template>
  <div class="modify">
    <Header
      :type="type"
      @click="handleClick"
    />
    <List
      :list="list"
      :type="type"
      :iconId.sync="iconId"
      @click="handleListClick"
    />
  </div>
</template>

<script>
import Header from './Header';
import List from './List';
import { createBill, getCategoryByType } from '@/api';

// import bookStore from '@/store/book/index';
export default {
  name: 'book',
  components: {
    Header,
    List
  },
  data() {
    return {
      // type: false 是支出, true 是收入
      type: false,
      list: {}, // {type: 'xxx', data: []},
      // 被选中的 icon
      iconId: null
    }
  },
  methods: {
    async queryList(type) {
      this.list = await getCategoryByType({ type })
    },
    handleClick(type) {
      this.type = type
      this.iconId = null
      this.queryList(type)
    },
    handleListClick() {
      this.$calc({
        isShow: true,
        // 日期是今天
        date: this.$options.filters.formatDate(Date.now()),
        remark: '',
        money: '0',
        sendHttp: async (data) => {
          const res = await createBill({
            ...data,
            categoryId: this.iconId,
            type: this.type
          })
          if (res) {
            this.$toast({
              msg: '成功创建账单',
              timeout: 1 * 1000
            })
            const timer = setTimeout(() => {
              this.$router.push('/detail')
              clearTimeout(timer)
            }, 1 * 1000)
          }
        }
      })
    },
    init() {
      this.queryList(this.type)
    }
  },
  created() {
    this.init()
  },
  beforeCreate() {
    this.$store.commit('setHasNav', false)
    // this.$store.register('bookStore', bookStore)
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