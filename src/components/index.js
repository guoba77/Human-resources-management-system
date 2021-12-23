/**
 * 使用vue插件形式注册全局组件
 * vue插件写法：{install(Vue){}} => 插件需要安装才能使用？=》去入口main.js 使用Vue.use(插件)
 * 插件作用：注册全局组件、方法、过滤器、指令
 */
// 导入要全局注册的组件
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'

// 1. 准备数组=》存放被注册的组件
const cps = [PageTools, UploadExcel]
console.log(1, cps)
//
// 导出插件
export default {
  // Vue框架的构造函数
  install (Vue) {
    console.log('插件执行了：', Vue)
    // 注册全局组件
    // Vue.component('PageTools', PageTools)
    // Vue.component('UploadExcel', UploadExcel)
    cps.forEach(cp => {
      // cp.name 作为注册组件的标签名
      Vue.component(cp.name, cp)
    })
    // 注册全局方法=>挂载到vue实例的原型链上了
    // Vue.prototype.myfn = () => {
    //   console.log(123)
    // }
  }
}
