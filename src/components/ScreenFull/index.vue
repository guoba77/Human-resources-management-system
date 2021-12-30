<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- svg-icon组件=》渲染svg图标
    用法：icon-class="svg图片名字"
    -->
    <svg-icon icon-class="fullscreen" class="fullscreen" />
  </div>
</template>

<script>
export default {
  name: 'ScreenFull'
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
