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
              <el-button icon="el-icon-plus" size="small" type="primary">
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
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
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
  </div>
</template>

<script>
import { getRoleList, deleteRole } from '@/api/setting'
export default {
  data () {
    return {
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
