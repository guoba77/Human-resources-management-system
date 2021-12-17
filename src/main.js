import Vue from 'vue'
// 重置浏览器默认样式的css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 集成饿了吗UI组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 全局样式
import '@/styles/index.scss' // global css

import App from './App'
// vuex实例
import store from './store'
// router路由实例
import router from './router'

// 注册图标全局组件（import不带名字，相当于执行这个导入的js）
import '@/icons' // icon
// 执行路由守卫钩子函数
import '@/permission' // permission control

// 导入指令对象
import * as dicts from '@/directives'
console.log('指令对象：', dicts)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

// 批量注册模块中指令
Object.keys(dicts).forEach(key => {
  Vue.directive(key, dicts[key])
})

// // 处理图片加载失败指令注册
// Vue.directive('imgerr', dicts.imgerr)
// // 测试回顾全局指令用法 注意：定义的时候指令名不要加v-
// Vue.directive('fb', dicts.fb)

console.log('环境变量：', process.env)

new Vue({
  el: '#app',
  router, // 所有组件可以通过this.$router(跳转) | this.$route（获取路由参数）
  store, // 所有组件可以通过this.$store
  render: h => h(App)
})
