<template>
  <!-- 菜单 -->
  <div :class="{ 'has-logo': showLogo }">
    <!-- logo -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 菜单 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in list"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  // 一般依赖data或者其它数据，产生一个新数据
  // 特点：依赖数据变化了，才会重新执行（自带缓存，性能好）

  /**
   * 计算属性computed和监听属性watch区别：
   * 1. 计算属性computed=>计算得到一个新的变量渲染使用=》渲染
   * 2. 监听属性watch=》被监听数据变化了，执行回调函数=》干事
   */
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    // 计算获取菜单数据array
    // 语法：mapState('模块名', ['模块中定义的变量1','模块中定义的变量2',...])
    ...mapState('menu', ['list']),
    // routes () {
    //   // this.$router.options.routes 不能获取动态添加的路由规则=》造成动态添加路由的菜单不显示
    //   console.log('获取路由所有配置规则：', this.$router.options.routes)
    //   // return this.$router.options.routes
    //   console.log('store实例：', this.$store)
    //   return this.$store.state.menu.list
    // },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
