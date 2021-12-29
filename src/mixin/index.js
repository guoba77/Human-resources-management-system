/**
 * 全局混入可复用组件选项
 * vue2中组件script部分默认导出的对象中的属性叫选项式API=》例如：data methods 生命周期钩子函数等（vue3 composition API（组合式API））
 * 说明：混入对象可以包含任意组件选项
 */

export default {
  data () {
    return {
      hiMixin: 'hello mixin!'
    }
  },
  created () {
    console.log('我是全局混入的created钩子函数')
  }
}
