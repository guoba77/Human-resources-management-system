import Vue from 'vue' // 引入Vue
import VueI18n from 'vue-i18n' // 引入国际化的插件包
// 饿了吗组件库提供的语言包=> 翻译组件库内部的文字
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包

Vue.use(VueI18n) // 全局注册国际化包

// 创建国际化插件的实例
const i18n = new VueI18n({
  /**
   * 指定语言类型:
   * 1. zh表示中文=》读取中文语言包=》网页显示中文
   * 2. en表示英文=>读取英文语言包=》网页显示英文
   */
  locale: 'en',
  // 将elementUI语言包加入到插件语言数据里
  // 这里是：放语言包
  messages: {
    // 英文环境下的语言数据
    en: {
      ...elementEN
    },
    // 中文环境下的语言数据
    zh: {
      ...elementZH
    }
  }
})
// 导出多语实例
export default i18n