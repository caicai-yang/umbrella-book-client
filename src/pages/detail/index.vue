<template>
  <div class="detail">
    <HeaderCmp
      @click="getAllDetail"
      :totalExpend="totalExpend"
      :totalIncome="totalIncome"
    />
    <template v-if="Object.keys(itemJson).length">
      <DetailItem
        v-for="(json, createdAt, index) in itemJson"
        :key="index"
        :detailItem="json"
        :date="createdAt|formatDate('MM-DD')"
        :day="createdAt|getDay"
        @click="handleClick"
      />
    </template>
    <!-- 请求过了也没有数据 isFething=false-->
    <div
      v-else
      class="detail-empty"
    >
      空空如也~
    </div>
  </div>
</template>

<script>
import detailStore from '@/store/detail'
import { mapActions, mapMutations } from 'vuex'
import HeaderCmp from './header'
import DetailItem from './detailItem'

// helper
import { year, month } from '@/helper/utils/index'

export default {
  name: 'detail',
  components: {
    HeaderCmp,
    // detailItem: { date: 05年05日, day: '星期五', totalIncome: 100, totalExpence: 100, detail: [{ id: 1, icon: '', category: 餐饮, type: 1 | 0 1是收入, 0是支出, money: 100 }] }
    DetailItem,
  },
  data() {
    return {
      // {createAt: {totalExpend, totalIncome, data: [{bill}]}}
      itemJson: {},
      totalExpend: 0,
      totalIncome: 0,
      isFetching: false,
    }
  },
  methods: {
    ...mapActions('detailStore', ['getDetail']),
    ...mapMutations('detailStore', ['setSelectItem']),
    async getAllDetail(params) {
      if (this.isFetching) return
      this.isFetching = true
      const json = await this.getDetail(params)
      if (json) {
        this.itemJson = json['data']
        this.totalExpend = json['totalExpend'].toFixed(2)
        this.totalIncome = json['totalIncome'].toFixed(2)
      }
      this.isFetching = false
    },
    handleClick(item) {
      this.setSelectItem(item)
      this.$router.push('descriptor')
    },
    init() {
      this.getAllDetail({
        year, month
      })
    },
  },
  beforeCreate() {
    this.$store.commit('setHasNav', true)
    this.$store.register('detailStore', detailStore)
    // 在beforeDestroy钩子里, unregister store
    // this.$once('hook:beforeDestroy', () => {
    //   this.$store.unregister('detailStore')
    // })
  },
  created() {
    this.init()
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.detail {
  height: 100%;
  // position: relative;
  overflow-y: auto;
  &-empty {
    @include posAbsBothCenter();
    width: 100%;
    text-align: center;
    font-style: italic;
    font-size: 40px;
    color: #c2c2c2;
  }
}
</style>
