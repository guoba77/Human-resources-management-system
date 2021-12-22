<template>
  <div class="employees">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <!-- 页面title -->
        <template #header>
          <PageTools />
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
