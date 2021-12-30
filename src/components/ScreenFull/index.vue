<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- svg-icon组件=》渲染svg图标
    用法：icon-class="svg图片名字"
    -->
    <svg-icon
      icon-class="fullscreen"
      class="fullscreen"
      @click="toggleScreen"
    />
  </div>
</template>

<script>
import sf from 'screenfull'
export default {
  name: 'ScreenFull',
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
