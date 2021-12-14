<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="test">修改test</div>
    <p :style="{ color: stys.menuActiveText }">git练习</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 导入scss中导出的变量
import stys from '@/styles/variables.scss'
console.log('样式：', stys)
export default {
  name: 'Dashboard',
  data () {
    return {
      stys
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
