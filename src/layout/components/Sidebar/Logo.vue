<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link key="collapse" class="sidebar-logo-link" to="/">
        <!-- 公司logo图片 -->
        <img src="@/assets/common/logo.png" class="sidebar-logo" />
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    // 菜单的折叠展开状态：折叠true | 展开false
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: '人资中台',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  .sidebar-logo-link {
    height: 100%;
    width: 100%;
    // 大图样式
    .sidebar-logo {
      width: 100px;
      vertical-align: middle;
      margin-right: 12px;
    }
  }
  // 小图样式
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
