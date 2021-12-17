<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div v-fb class="test">修改test</div>
    <p :style="{ color: stys.menuActiveText }">git练习</p>
    <!-- 使用自定义指令 -->
    <input v-fb="color" type="text" />
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
      stys,
      color: 'green'
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
