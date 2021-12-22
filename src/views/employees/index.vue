<template>
  <div class="employees">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <!-- 页面title -->
        <template #header>
          <!-- 通栏组件 -->
          <PageTools>
            <template #left>
              <span>总计{{ total }}条数据</span>
            </template>
            <template #right>
              <el-button type="primary" size="small">导入excel</el-button>
              <el-button type="primary" size="small">导出excel</el-button>
              <el-button type="primary" size="small">新增员工</el-button>
            </template>
          </PageTools>
        </template>
        <!-- 页面的内容 -->
        <!-- table列表 -->
        <el-table :border="true" :data="list">
          <el-table-column type="index" label="序号" />
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="workNumber" label="工号" />
          <el-table-column prop="formOfEmployment" label="聘用形式" />
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="correctionTime" label="入职时间" />
          <el-table-column label="账户状态">
            <el-switch v-model="qy" />
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
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
          <el-pagination layout="prev, pager, next" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
export default {
  data () {
    return {
      // 根据后台接口需要参数和返回数据
      // 员工列表
      list: [],
      // 分页参数
      query: {
        page: 1, // 当前页
        size: 10 // 每页多少条数据
      },
      // 员工总条数
      total: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取员工列表
    async getList () {
      const { rows, total } = await getEmployeeList(this.query)
      console.log(rows)
      this.list = rows
      this.total = total
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
