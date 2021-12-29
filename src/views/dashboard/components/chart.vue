<template>
  <div>
    <!-- 渲染图表的盒子=》一定要设置宽高 -->
    <div ref="chartBox" class="chartBox"></div>
  </div>
</template>

<script>
// 全量引入
// import * as echarts from 'echarts'
// 按需引入
import * as echarts from 'echarts/core'
import { TooltipComponent } from 'echarts/components'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([TooltipComponent, RadarChart, CanvasRenderer])

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
      // 2. 绘制图表 => 调用myChart.setOption(图表配置项对象option：不同图表配置)
      // opt =》 代表不同图表的配置项
      const opt = {
        // 鼠标经过提示
        tooltip: {},
        // 雷达图专用配置
        radar: {
          // 配置雷达图数据指标（维度）
          indicator: [
            { name: '工作效率', max: 100 },
            { name: '考勤', max: 100 },
            { name: '积极性', max: 100 },
            { name: '帮助同事', max: 100 },
            { name: '自主学习', max: 100 },
            { name: '正确率', max: 100 }
          ]
        },
        // 设置图表数据
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [10, 1, 100, 5, 100, 0],
                name: '张三'
              },
              {
                value: [50, 50, 50, 50, 50, 10],
                name: '李四'
              }
            ]
          }
        ]
      }
      myChart.setOption(opt)
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
