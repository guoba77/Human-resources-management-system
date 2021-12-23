<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card>
        <!-- 标签页组件 -->
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 账户设置 -->
            <LoginSet :user-detail="userDetail" />
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 个人详情=> 头像上传（上云） -->
            <UserInfo :user-detail="userDetail" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import LoginSet from './components/login-setting.vue'
import UserInfo from './components/user-info.vue'
import { getUserDetailById } from '@/api/user'
export default {
  components: {
    LoginSet,
    UserInfo
  },
  data () {
    return {
      // 员工详情数据
      userDetail: {}
    }
  },
  created () {
    this.getUserDetail()
  },
  methods: {
    // 获取员工详情数据
    async getUserDetail () {
      console.log('动态路由参数：', this.$route.params)
      const userDetail = await getUserDetailById(this.$route.params.id)
      console.log('员工详情：', userDetail)
      this.userDetail = userDetail
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
