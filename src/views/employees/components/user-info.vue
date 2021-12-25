<template>
  <div class="app-container">
    <!-- 个人信息 -->
    <el-form ref="fm" label-width="100px" :model="userDetail" :rules="rules">
      <!--手机 聘用形式  -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="部门" prop="departmentName">
            <el-input v-model="userDetail.departmentName" />
          </el-form-item>
        </el-col>
      </el-row>
      <!--手机 聘用形式  -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="userDetail.mobile" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 工号 入职时间 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="入职时间" prop="timeOfEntry">
            <el-date-picker
              v-model="userDetail.timeOfEntry"
              type="date"
              class="inputW"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 员工照片 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="员工头像">
            <!-- 放置上传图片 -->
            <UploadImg />
            <!-- <el-image :src="userDetail.staffPhoto"></el-image> -->
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保存个人信息 -->
      <el-row class="inline-info" type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="hSaveUserDetailById">
            保存更新
          </el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { saveUserDetailById } from '@/api/employees'

export default {
  props: {
    // 接收用户详情数据
    userDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      rules: {
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    hSaveUserDetailById () {
      this.$refs.fm.validate(async flag => {
        if (!flag) return
        await saveUserDetailById(this.userDetail)
        this.$message.success('更新成功')
      })
    }
  }
}
</script>
