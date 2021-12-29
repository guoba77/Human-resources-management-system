/**
 * vue插件：注册全局公共echarts方法
 */
// 全量引入
// import * as echarts from 'echarts'
// 按需引入
import * as echarts from 'echarts/core'
import { TooltipComponent } from 'echarts/components'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([TooltipComponent, RadarChart, CanvasRenderer])

export default {
  install (Vue) {
    // 挂载echarts到所有组件的原型链上
    Vue.prototype.echarts = echarts
  }
}
