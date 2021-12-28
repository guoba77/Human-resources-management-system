<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <!-- 标签页组件 -->
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="padding: 10px 0">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
              >
                新增角色
              </el-button>
            </el-row>
            <!-- 表格 =》角色列表 -->
            <el-table :data="list">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button
                    size="small"
                    type="success"
                    @click="openAssingPerm(row.id)"
                  >
                    分配权限
                  </el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                  >
                    编辑
                  </el-button>
                  <el-button size="small" type="danger" @click="delRole(row)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                :current-page="query.page"
                :page-size="query.pagesize"
                :total="query.total"
                layout="prev,pager,next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="其它功能">
            <h2>其它功能</h2>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 新增|编辑角色 -->
    <el-dialog
      :title="roleForm.id ? '编辑角色' : '新增角色'"
      :visible.sync="showDialog"
      width="50%"
      @close="close"
    >
      <!-- 表单结构 -->
      <el-form ref="fm" :model="roleForm" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="addRole">{{
          roleForm.id ? "编辑角色" : "新增角色"
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 给角色分配权限 -->
    <AssignPerm :show-assign-dialog.sync="showAssignDialog" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, addRole, getRoleDetail, updateRole } from '@/api/setting'
import AssignPerm from './components/assign-perm.vue'
export default {
  components: {
    AssignPerm
  },
  data () {
    return {
      showAssignDialog: false,
      showDialog: false,
      // 角色表单数据
      roleForm: {
        name: '',
        description: ''
      },
      // 角色表单校验规则
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '角色名称长度2-10', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      // 角色列表
      list: [],
      // 分页查询参数
      query: {
        page: 1, // 页码
        pagesize: 2, // 每页多少条数据
        total: 0 // 数据总条数
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 打开给角色分配权限弹层
    // id 角色ID
    openAssingPerm (id) {
      console.log(id)
      this.showAssignDialog = true
    },
    // 关闭弹层
    close () {
      // 清空表单数据
      this.roleForm = {
        name: '',
        description: ''
      }
      // 移除校验
      this.$refs.fm.resetFields()
    },
    // 编辑角色
    async editRole (id) {
      const res = await getRoleDetail(id)
      console.log(res)
      this.roleForm = res
      this.showDialog = true
    },
    // 新增角色
    async addRole () {
      /**
       * 思路：
       * 1. 表单整体校验
       * 2. 校验通过后=》调用接口新增|编辑
       * 3. 刷新列表
       * 4. 关闭弹层
       * 5. 提示
       */
      try {
        await this.$refs.fm.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        // 重置页面为第一页
        this.query.page = 1
        this.getList()
        this.showDialog = false
        this.$message.success('操作成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 删除角色
    /**
     * role 当前删除角色数据
     */
    async delRole (role) {
      // console.log(role)
      /**
       * 思路：
       * 1. 用户确认
       * 2. 确认之后，调用接口删除
       * 3. 刷新列表
       * 4. 提示消息
       */
      try {
        await this.$confirm(`确认删除${role.name}这个角色吗？`)
        //  点击确认
        await deleteRole(role.id)
        this.getList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 获取角色列表
    async getList () {
      const { rows, total } = await getRoleList(this.query)
      console.log(rows)
      this.query.total = total
      this.list = rows
    },
    // 切换分页
    /**
     * page 当前页码
     */
    changePage (page) {
      console.log(page)
      // 更新页码
      this.query.page = page
      // 刷新列表
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
