<template>
  <div class="permission-container">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <el-row type="flex" justify="space-between" align="middle">
            <span>权限管理</span>
            <el-button type="primary">添加权限</el-button>
          </el-row>
        </div>
        <!-- card body -->
        <el-table border :data="list">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="code" label="标识" />
          <el-table-column prop="description" label="描述" />
          <el-table-column label="操作">
            <template>
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
export default {
  data () {
    return {
      // 权限点列表
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    //  获取权限点列表数据
    async getList () {
      const list = await getPermissionList()
      console.table(list)
      this.list = list
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
