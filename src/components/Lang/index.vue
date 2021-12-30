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
export default {
  name: 'Lang',
  methods: {
    // lang 是对应菜单command绑定的值
    changeLanguage (lang) {
      this.log(this.$i18n)
      // 使用国际化插件实例：$i18n动态修改locale的值
      this.$i18n.locale = lang // 设置给本地的i18n插件
      this.$message.success('切换多语言成功')
    }
  }
}
</script>
