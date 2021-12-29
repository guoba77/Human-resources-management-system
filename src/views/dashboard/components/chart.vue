<template>
  <div>
    <!-- 渲染图表的盒子=》一定要设置宽高 -->
    <div ref="chartBox" class="chartBox"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted () {
    // 只能在这里初始化绘制
    this.initChart()
  },
  methods: {
    // 初始化图表
    initChart () {
      // 1. 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.chartBox)
      // 2. 绘制图表 => 调用myChart.setOption(图表配置项对象)
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chartBox {
  width: 100%;
  height: 400px;
}
</style>
