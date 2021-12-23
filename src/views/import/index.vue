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
import { formatExcelDate } from '@/utils'
import { importEmployees } from '@/api/employees'
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
    async handleSuccess ({ header, results }) {
      console.log('读取到的excel中的数据：', header, results)
      /**
       * 思路：
       * 1. 因为读取到的results中员工数据属性名是中文，需要转换为英文属性名
       * 2. 如果excel中有时间的话，需要格式化时间
       * 3. 调用后台接口传入处理OK的results数据做上传
       */
      const enResults = this.transformResults(results)
      console.log('转换结果：', enResults)
      await importEmployees(enResults)
      this.$message.success('上传成功')
      // 返回员工列表页面
      this.$router.back()
    },
    // 读取到的results中员工数据属性名是中文，需要转换为英文属性名
    transformResults (results) {
      // 属性名中英对照映射关系
      const userMap = {
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      /**
       * 1. 准备一个存储转换结果的数组
       * 2. 循环results数组，根据userMap中英映射关系，进行装换
       * 3. 返回转换后的结果
       */
      const newResults = []
      results.forEach(item => {
        // 中文属性的item（员工信息）转换成英文的
        const enUser = {}
        // zhKey 是 中文属性名
        for (const zhKey in item) {
          // 根据zhKey结合映射关系获取enKey(英文属性名)
          const enKey = userMap[zhKey]
          if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
            // 因为excel中时间读取多了70年，需要格式化为正确时间
            enUser[enKey] = formatExcelDate(item[zhKey], '-')
          } else {
            // 存储英文属性名和对应的值
            enUser[enKey] = item[zhKey]
          }
        }
        newResults.push(enUser)
      })
      return newResults
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
