<template>
  <div class="employees">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <!-- 页面title -->
        <template #header>
          <!-- 通栏组件 -->
          <PageTools>
            <template #left>
              <span>总计100条数据</span>
            </template>
            <template #right>
              <el-button type="primary" size="small">导入excel</el-button>
              <el-button type="primary" size="small">导出excel</el-button>
              <el-button type="primary" size="small">新增员工</el-button>
            </template>
          </PageTools>
        </template>
        <!-- 页面的内容 -->
        <div>内容</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.myfn()
  }
}
</script>

<style lang="scss" scoped>
</style>
