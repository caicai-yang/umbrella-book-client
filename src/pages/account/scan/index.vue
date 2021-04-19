<template>
  <div class="scan">
    <div class="scan-default">
      <img :src="imgSrc">
    </div>
    <input
      type="file"
      @change="uploadFile($event)"
    >
    <template v-if="billList.length">
      <div class="scan-title">账单列表</div>
      <div class="scan-list">
        <ListItem
          v-if="categoryList.length"
          v-for="(item, index) in billList"
          :key="index"
          :categoryList="categoryList"
          :type.sync="item.type"
          :categoryId.sync="item.categoryId"
          :money.sync="item.money"
          :remark.sync="item.remark"
        />
        <button
          class="scan-btn"
          @click="uploadSys"
        >上传系统</button>
      </div>
    </template>
  </div>
</template>

<script>
import { toBase64 } from '@/helper/utils/base64'
import { AIScan, getAllCategory, batchCreateBill } from '@/api'
import ListItem from './List'
export default {
  name: 'account-scan',
  data() {
    return {
      imgSrc: require('@/assets/upload.png'),
      hasBigImage: false,
      billList: [],
      categoryList: []
    }
  },
  methods: {
    async uploadFile(e) {
      const file = e.target.files[0]
      try {
        const { base, image } = await toBase64(file)
        this.imgSrc = base
        const res = await AIScan(image)
        const data = res['words_result'].map(item => item['words']).filter(item => {
          return /^[\u4e00-\u9fa5]+[\d\.]+$/.test(item)
        })
        let reg = /^([\u4e00-\u9fa5]+)(\d+\.\d{2})(\d)/
        data.forEach(item => {
          const res = reg.exec(item)
          this.billList.push({
            type: 0, // 默认是支出
            categoryId: 86, // 默认是购物
            remark: `${res[1]}`,
            money: `${res[2] * res[3]}`
          })
        })
      } catch (reason) {
        if (reason instanceof Error) {
          this.$toast('网络错误')
        } else {
          this.$toast(reason)
        }
      }
    },
    async uploadSys() {
      console.log(this.billList);
      const res = await batchCreateBill(this.billList)
      if (res.length) {
        this.$toast({
          msg: '上传成功, 即将跳转到首页',
          timeout: 1000
        })
        const timer = setTimeout(() => {
          this.$router.replace('/')
          clearTimeout(timer)
        }, 1000);
      }
    }
  },
  components: {
    ListItem
  },
  async created() {
    this.categoryList = await getAllCategory();
  },
}
</script>

<style lang="scss">
@import "~@/styles/base";
.scan {
  width: 100%;
  height: 100%;
  margin: 0 auto $navHeight;
  position: relative;
  overflow-y: auto;
  @include disFlex(column, flex-start, center);
  &-default {
    width: 100%;
    margin-bottom: 20px;
    img {
      width: 100%;
    }
  }
  &-btn {
    width: 80%;
    font-size: 14px;
    padding: 10px;
    border-radius: 10px;
    background-color: $primaryColor;
    margin: 10px auto;
  }
  &-title {
    font-size: 18px;
    font-weight: 700;
  }
  &-list {
    width: 100%;
    @include disFlex(column, flex-start, center);
  }
}
</style>