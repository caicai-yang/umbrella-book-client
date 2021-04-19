<template>
  <div
    class="datePicker-selectColumn-col-wrapper"
    :style="getWrapperHeight"
  >
    <ul
      class="datePicker-selectColumn-wheel-list"
      :style="getListTop"
      ref="wheel"
    >
      <li
        class="datePicker-selectColumn-wheel-item"
        v-for="(item, index) in scrollValues"
        :key="index"
        :style="initWheelItemDeg(item.index)"
      >{{item.value}}</li>
    </ul>
    <div
      class="datePicker-selectColumn-cover"
      :style="getCoverStyle"
    />
    <div
      class="datePicker-selectColumn-divider"
      :style="getDividerStyle"
    />
  </div>
</template>

<script>
import Animate from '@/helper/utils/animate'
import { years, months, dates } from '@/helper/utils'

const a = -0.003 // 加速度
const radius = 100 // 半径
const lineHeight = 36 // 文字行高
let isInertial = false // 是否正在惯性滑动
// 根据三角形余弦公式
// 反余弦得到弧度再转换为度数,这个度数是单行文字所占有的。
let deg = Math.round((Math.acos((((radius * radius) + (radius * radius)) - (lineHeight * lineHeight)) / (2 * radius * radius)) * 180) / Math.PI)
// deg这个值须360能整除，因为当滚动列占满一周后可以再次均匀的覆盖在上一周文字上；滚动时不会出现错位
while (360 % deg !== 0 && deg <= 360) {
  deg += 1
}
const singleDeg = deg // 24
// 半圆下的内容条数
const space = Math.floor((360 / singleDeg) / 2)
export default {
  name: 'date-picker-select-column',
  // 默认选中的日期
  props: {
    // {type: 'year', value: 2021}, {type: 'month', value: 1}, {type: 'date', value: 1}
    mode: {
      type: String,
      required: true,
    },
    value: Number,
  },
  data() {
    return {
      finger: {
        startY: 0,
        endY: 0,
        startTime: 0, // 开始滑动时间（单位：毫秒）
        // entTime: 0, // 结束滑动时间（单位：毫秒）
        endTime: 0,
        currentMove: 0,
        prevMove: 0,
      },
      range: {
        start: -space,
        end: space,
        space,
      },
      values: this.getValues(this.mode, this.value),
    }
  },

  computed: {
    scrollValues() {
      const result = []
      for (let i = this.range.start; i <= this.range.end; i += 1) {
        result.push({
          value: this.getRangeData(i),
          index: i,
        })
      }
      return result
    },
    getListTop() {
      return {
        top: `${radius - Math.round(lineHeight / 2)}px`,
        height: `${lineHeight}px`,
      }
    },
    getWrapperHeight() {
      return {
        height: `${2 * radius}px`,
      }
    },
    getCoverStyle() {
      return {
        backgroundSize: `100% ${radius - Math.round(lineHeight / 2)}px`,
      }
    },
    getDividerStyle() {
      return {
        top: `${radius - Math.round(lineHeight / 2)}px`,
        height: `${lineHeight - 2}px`,
      }
    },
    animate() {
      let animate
      if (!animate) {
        animate = new Animate()
      }
      return animate
    },
  },
  mounted() {
    this.$el.addEventListener('touchstart', this.listenerTouchStart, false)
    this.$el.addEventListener('touchmove', this.listenerTouchMove, false)
    this.$el.addEventListener('touchend', this.listenerTouchEnd, false)
  },
  beforeDestroy() {
    this.$el.removeEventListener('touchstart', this.listenerTouchStart, false)
    this.$el.removeEventListener('touchmove', this.listenerTouchMove, false)
    this.$el.removeEventListener('touchend', this.listenerTouchEnd, false)
  },
  methods: {
    getValues(mode, defaultItem) {
      switch (mode) {
        case 'years':
          return this.rearrange(years, defaultItem)
        case 'months':
          return this.rearrange(months, defaultItem)
        case 'dates':
          return this.rearrange(dates, defaultItem)
        default:
          break
      }
    },
    rearrange(arr, item) {
      // 将 item 放在第一个
      if (item) {
        const index = arr.indexOf(item)
        if (index !== -1) {
          const arr1 = arr.slice(0, index)
          const arr2 = arr.slice(index)
          return [...arr2, ...arr1]
        }
      }
      return arr
    },
    initWheelItemDeg(index) {
      return {
        transform: `rotate3d(1, 0, 0, ${(-1 * index) * singleDeg}deg) translate3d(0, 0, ${radius}px)`,
        height: `${lineHeight}px`,
        lineHeight: `${lineHeight}px`,
      }
    },
    listenerTouchStart(ev) {
      ev.stopPropagation()
      ev.preventDefault()
      isInertial = false
      this.finger.startY = ev.targetTouches[0].pageY
      this.finger.prevMove = this.finger.currentMove
      this.finger.startTime = Date.now()
    },
    listenerTouchMove(ev) {
      ev.stopPropagation()
      ev.preventDefault()
      const move = (this.finger.startY - ev.targetTouches[0].pageY) + this.finger.prevMove
      this.finger.currentMove = move
      this.$refs.wheel.style.transform = `rotate3d(1, 0, 0, ${(move / lineHeight) * singleDeg}deg)`
      this.updateRange(Math.ceil(move / lineHeight))
    },
    listenerTouchEnd(ev) {
      ev.stopPropagation()
      ev.preventDefault()
      this.finger.endY = ev.changedTouches[0].pageY
      this.finger.endTime = Date.now()
      this.getInertiaDistance()
    },
    updateRange(spinAim) {
      // rang: -7 至 7, 一共是 15 个位置
      // spinAmin = -2
      // start = -7-2 => -9
      // end = -9 + 14 => 5
      this.range.start = (this.range.space * -1) + spinAim
      this.range.end = this.range.start + (this.range.space * 2)
    },
    getRangeData(index) {
      index %= this.values.length
      return this.values[index >= 0 ? index : index + this.values.length]
    },
    getSelectValue(move) {
      const index = move / lineHeight
      const pickValue = this.getRangeData(index)
      this.$emit('select', { [this.mode]: pickValue }) // 在这里父组件可以拿到值
    },
    /**
     * 求移动速度（v = s / t），判断用户操作快慢，从而得到惯性的滑动距离
     */
    getInertiaDistance() {
      // 移动距离
      const s = this.finger.startY - this.finger.endY
      // 移动时间
      const t = this.finger.endTime - this.finger.startTime
      // 移动速度
      const v = s / t
      const absV = Math.abs(v)
      isInertial = true
      this.inertia(absV, Math.floor(absV / v), 0)
    },
    /**
     * 用户结束滑动，应该慢慢放慢，最终停止。从而需要 a(加速度) ==> 惯性移动
     * @param start 开始速度
     * @param position 速度方向，值: 正负1, 往下滑=>1, 往上滑: -1
     * @param target 结束速度
     */
    inertia(start, position, target) {
      // 停止运动
      if (start <= target || !isInertial) {
        this.animate.stop()
        this.finger.prevMove = this.finger.currentMove
        this.updateRange(Math.ceil(this.finger.currentMove / lineHeight))
        this.getSelectValue(this.finger.currentMove)
        return
      }
      // 这段时间走的位移 S = vt + 1/2at^2; (v是初始速度)
      const move = (position * start * (1000 / 60)) + (0.5 * a * (1000 / 60) * (1000 / 60)) + this.finger.currentMove
      // 根据求末速度公式： v末 = v初 + at
      const newStart = (position * start) + (a * (1000 / 60))
      let moveDeg = (move / lineHeight) * singleDeg
      let actualMove = move
      // 已经到达目标
      if (newStart <= target) {
        moveDeg = Math.round(move / lineHeight) * singleDeg
        actualMove = Math.round(move / lineHeight) * lineHeight
        this.$refs.wheel.style.transition = 'transform 700ms cubic-bezier(0.19, 1, 0.22, 1)'
      } else {
        this.$refs.wheel.style.transition = ''
      }
      this.finger.currentMove = actualMove
      this.$refs.wheel.style.transform = `rotate3d(1, 0, 0, ${moveDeg}deg)`
      this.updateRange(Math.ceil(this.finger.currentMove / lineHeight))
      this.animate.start(this.inertia.bind(this, newStart, position, target))
    },
  },
}

</script>

<style lang="scss">
.datePicker-selectColumn {
  &-col-wrapper {
    width: 70px;
    position: relative;
    height: 300px;
    overflow: hidden;
    text-align: center;
  }
  &-col-wrapper:not(:last-child) {
    margin-right: 25px;
  }
  &-wheel-list {
    position: absolute;
    width: 100%;
    transform-style: preserve-3d;
  }
  &-wheel-item {
    backface-visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  &-cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0.95),
        hsla(0, 0%, 100%, 0.6)
      ),
      linear-gradient(0deg, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));
    background-position: top, bottom;
    background-repeat: no-repeat;
  }
  &-divider {
    position: absolute;
    width: 100%;
    left: 0;
    border-top: 1px solid #5b5d5c;
    border-bottom: 1px solid #5b5d5c;
  }
}
</style>
