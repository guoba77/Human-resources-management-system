<template>
  <div class="app-container">
    <!-- 放置表单 -->
    <el-form ref="fm" :model="userDetail" :rules="rules" label-width="60px">
      <el-form-item label="姓名:" prop="username">
        <el-input v-model="userDetail.username" style="width: 300px" />
      </el-form-item>
      <el-form-item label="密码:">
        <el-input
          v-model="userDetail.password"
          type="password"
          disabled
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateUser">更新</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入更新接口
import { saveUserDetailById } from '@/api/employees'
export default {
  props: {
    // 表单数据
    userDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      rules: {
        username: [{ required: true, min: 2, max: 10, message: '用户名必填！', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 提交：存储用户名
    async updateUser () {
      try {
        await this.$refs.fm.validate()
        await saveUserDetailById(this.userDetail)
        this.$message.success('更新成功')
        // 返回员工列表
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
