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
    <!-- 测试 -->
    <ul>
      <li>{{ count }}</li>
      <li @click="cg">add</li>
      <li>{{ obj }}</li>
      <li @click="changeObj">修改小红年龄</li>
    </ul>
  </div>
</template>

<script>
// 导入更新接口
import { saveUserDetailById } from '@/api/employees'
export default {
  props: {
    // 表单数据
    /**
     * 单向数据流（定义：数据的传递和修改都是单向（不可逆））=》场景：父子通信
     * 注意：
     * 父组件传递给子组件的数据正常来说只能在父组件修改
     * 1. 父传子是简单类型（string、boolean等），只能在父组件修改（子传父）
     * 2. 父传子是复杂类型（object、array等），可以在子组件局部修改，但是不能改地址
     */
    userDetail: {
      type: Object,
      default: () => ({})
    },
    count: {
      type: Number,
      default: 0
    },
    obj: {
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
    cg () {
      this.$emit('change-count')
    },
    changeObj () {
      // 1. 可以局部修改（部分数据）
      // this.obj.age++
      // 2. 修改地址
      this.obj = { age: 10 }
    },
    // 提交：存储用户名
    async updateUser () {
      try {
        await this.$refs.fm.validate()
        await saveUserDetailById(this.userDetail)
        this.$message.success('更新成功')
        // 更新vuex数据
        this.$store.dispatch('user/getUserAction')
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
