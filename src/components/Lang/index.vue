<template>
  <el-dropdown trigger="hover" @command="changeLanguage">
    <div>
      <!-- 图标组件 -->
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </div>
    <!-- 下拉菜单 -->
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="'zh' === $i18n.locale">
        中文
      </el-dropdown-item>
      <el-dropdown-item command="en" :disabled="'en' === $i18n.locale">
        en
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// 导入操作cookie插件
import ck from 'js-cookie'
export default {
  name: 'Lang',
  methods: {
    // lang 是对应菜单command绑定的值
    changeLanguage (lang) {
      this.log(this.$i18n)
      // 使用国际化插件实例：$i18n动态修改locale的值
      this.$i18n.locale = lang // 设置给本地的i18n插件
      // 存储国际化切换的状态=》中文zh | 英文en
      ck.set('lang', lang)
      this.setExpire()
      this.$message.success('切换多语言成功')
    },
    // 学习js-cookie设置过期时间
    setExpire () {
      /**
       * 1. 默认过期时间是session会话形式，浏览器关闭就没了
       * 2. 设置过期时间=》第三个参数传入：{expires:天数 | 日期对象}
       */
      // 3小时后过期
      const ep = new Date(Date.now() + 3 * 60 * 60 * 1000)
      ck.set('text141', 123, { expires: ep })
    }
  }
}
</script>
