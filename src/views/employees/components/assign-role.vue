<template>
  <el-dialog
    class="assign-role"
    title="分配角色"
    :visible="showRoleDialog"
    @close="close"
  >
    <!-- 多选框：roleIds选中的角色ID的数组 -->
    <el-checkbox-group v-model="roleIds">
      <!-- 多选的选项 label 存值 -->
      <el-checkbox v-for="role in roleList" :key="role.id" :label="role.id">{{
        role.name
      }}</el-checkbox>
      <!-- <el-checkbox label="113">开发者</el-checkbox>
      <el-checkbox label="115">人事</el-checkbox> -->
    </el-checkbox-group>
    <template #footer>
      <el-button type="primary" size="small">确定</el-button>
      <el-button size="small" @click="$emit('update:showRoleDialog')">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
export default {
  name: 'Ar',
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 角色列表
      roleList: [],
      // 选中的角色ID的数组
      roleIds: []
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    // 查询用户之前分配过的角色=》回显
    // 用户id
    async getUserRoles (id) {
      const { roleIds } = await getUserDetailById(id)
      // 回显
      this.roleIds = roleIds
    },
    // 获取角色列表
    async getRoleList () {
      const { rows } = await getRoleList({
        page: 1, // 页码
        pagesize: 1000 // 每页多少条数据
      })
      console.log('角色列表：', rows)
      this.roleList = rows
    },
    // 通过子传父控制弹出层显示和隐藏
    close () {
      this.$emit('update:showRoleDialog')
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-checkbox {
  margin-bottom: 15px;
}
</style>
