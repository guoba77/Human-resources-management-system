/**
 * 全局混入可复用组件选项
 * vue2中组件script部分默认导出的对象中的属性叫选项式API=》例如：data methods 生命周期钩子函数等（vue3 composition API（组合式API））
 * 说明：混入对象可以包含任意组件选项
 * 使用步骤：
 * 1. 定义混入对象：{data, methods,...}
 * 2. 到入口main.js中通过=》Vue.mixin(混入对象)
 */
// store（js） === this.$store(组件) =》都是获取的vuex的实例
import store from '@/store'

export default {
  data () {
    return {
      hiMixin: 'hello mixin!'
    }
  },
  methods: {
    /**
     * 需求：控制页面下按钮权限
     * 步骤：
     * 1. 获取当前登录人的按钮权限（code身份标识）=》vuex中存储points
     * 2. 根据points数组中是否存在某个code身份标识=》决定按钮是否可见
     */
    // point 按钮身份标识
    canClick (point) {
      const { user } = store.state.user
      // 核心：point在不在当前登录人的身份标识points数组中=》在=》返回true
      // 退出登录报错：// vue.runtime.esm.js?2b0e:619 [Vue warn]: Error in render: "TypeError: Cannot read properties of undefined (reading 'points')"
      // ?操作符使用场景：用来处理对象读取层级比较深（大于1层）的异常情况
      // 解决：在上一层数据属性名后加个?
      return user.roles?.points.includes(point)
    },
    // 自定义日志方法
    /**
     *
     * @param {*} txt 打印输出文字
     * @param {*} bg 日志的背景色
     */
    log (txt, bg) {
      console.log(`%c 打印：`, `width:100px;height:20px;padding:5px 0;padding-right:5px;border-radius:5px;background:${bg || '#42b983'};color:#fff;`)
      console.log(txt)
    }
  }
}
