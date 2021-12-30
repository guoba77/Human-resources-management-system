<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- svg-icon组件=》渲染svg图标
    用法：icon-class="svg图片名字"

    需求：icon-class的图标跟随全屏切换状态变化的=》监控全屏切换=》获取当前切换状态
    1. 如果不是全屏状态 =》显示：fullscreen
    2. 是全屏状态 =》显示：exit-fullscreen
    -->
    <svg-icon
      :icon-class="isFull ? 'exit-fullscreen' : 'fullscreen'"
      class="fullscreen"
      @click="toggleScreen"
    />
  </div>
</template>

<script>
import sf from 'screenfull'
export default {
  name: 'ScreenFull',
  data () {
    return {
      // 是否是全屏
      isFull: false
    }
  },
  created () {
    // 组件创建之后，立即监控网页全屏状态
    this.watchScreen()
  },
  destroyed () {
    // 组件销毁解绑全屏监控事件=》释放内存
    sf.off('change')
  },
  methods: {
    // 开启/关闭全屏
    toggleScreen () {
      /**
       * 1. 判断浏览器是否支持全屏功能
       * 2. 如果支持调用toggle方法开启/关闭全屏
       */
      // sf.isEnabled 是false说明浏览器不支持
      if (!sf.isEnabled) {
        return this.$message.error('您的浏览器不支持全屏功能！')
      }
      // 支持就调用开启/关闭全屏
      // 判断如果不是全屏，执行sf.toggle方法就开启全屏，相反关闭
      sf.toggle()
    },
    // 监控网页是否进入全屏状态
    watchScreen () {
      sf.on('change', () => {
        console.log('当前网页是否是全屏：', sf.isFullscreen)
        this.isFull = sf.isFullscreen
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
