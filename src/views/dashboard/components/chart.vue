<template>
  <div>
    <!-- 渲染图表的盒子=》一定要设置宽高 -->
    <div ref="chartBox" class="chartBox"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    // 只能在这里初始化绘制
    this.initChart()
  },
  destroyed () {
    // 组件销毁清除定时器
    clearInterval(this.timer)
  },
  methods: {
    // 初始化图表
    initChart () {
      // 1. 基于准备好的dom，初始化echarts实例
      // 直接通过this.属性名 存值=》存储echarts实例（不是响应式的，data中定义的是响应式）
      console.log('组件实例：', this)
      this.myChart = this.echarts.init(this.$refs.chartBox)
      // 2. 绘制图表 => 调用myChart.setOption(图表配置项对象option：不同图表配置)
      // opt =》 代表不同图表的配置项
      this.opt = {
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
      // myChart.setOption(this.opt)
      // 存储定时器ID
      this.timer = setInterval(() => {
        // 每隔2s调用修改数据方法=》刷新图标
        this.changeData()
      }, 2000)
    },
    changeData () {
      const data = []
      for (let index = 0; index < 5; index++) {
        // per  当前人
        const per = { value: [], name: `李${index}` }
        for (let j = 0; j < 6; j++) {
          per.value.push(Math.floor(Math.random() * 100 + 1))
        }
        data.push(per)
      }
      // 绘制图表
      this.opt.series[0].data = data
      // 刷新图标
      this.myChart.setOption(this.opt)
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
