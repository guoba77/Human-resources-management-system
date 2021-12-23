<template>
  <div class="import">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>员工导入</span>
        </div>
        <!-- card body -->
        <UploadExcel
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 1. 校验上传文件的大小、格式等
    beforeUpload (file) {
      console.log('文件对象：', file)
      // 计算机存储单位：1M = 1024KB（千字节）   1KB = 1024B（字节）
      const isLt1M = file.size / 1024 / 1024 < 2
      // 上传excel大小不能超过2M
      if (isLt1M) {
        // 校验成功（必须返回true）
        return true
      }
      // 校验失败
      this.$message({
        message: '上传大小不能超过2M！',
        type: 'warning'
      })
      return false
    },
    // 2. 校验通过之后，通过这个回调函数获取excel中的员工数据了
    /**
     * header excel中表头
     * results 读取的员工的数据（多个）
     */
    handleSuccess ({ header, results }) {
      console.log('读取到的excel中的数据：', header, results)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
