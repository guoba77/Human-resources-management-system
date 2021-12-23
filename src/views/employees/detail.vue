<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card>
        <!-- 标签页组件 -->
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <LoginSet />
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <UserInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import LoginSet from './components/login-setting.vue'
import UserInfo from './components/user-info.vue'
export default {
  components: {
    LoginSet,
    UserInfo
  }
}
</script>

<style lang="scss" scoped>
</style>
