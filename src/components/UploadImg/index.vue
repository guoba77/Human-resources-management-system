<template>
  <!--
  el-upload上传组件关键属性说明：
  默认使用：通过action和on-success 进行图片上传
  自定义使用：:http-request="fn" 进行图片的自定义上传（云上传）
  1. action 设置上传图片的后台地址
  2. show-file-list 是否显示上传图片列表
  3. before-upload 绑定回调函数，做上传之前的校验
  4. on-success 调用action后台上传接口成功之后，执行这个属性绑定的回调函数
 -->
  <el-upload
    class="avatar-uploader"
    action="#"
    :http-request="upload"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
  >
    <!-- 上传成功之后，做回显 -->
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <!-- 默认显示+号图标 -->
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
// 1. 导入腾讯云cos云sdk构造函数
import Cos from 'cos-js-sdk-v5'
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
// 2. 初始化得到云cos操作图片上传的实例
const cos = new Cos({
  SecretId: 'AKIDNHyR3QTP7mJhUoJERRGvPh0BB2WP9g6M',
  SecretKey: 'HD0znQcaKn5zeplWliS3ZM2RCjAg2BUa'
})
console.log('云cos操作图片上传的实例:', cos)
export default {
  name: 'UploadImg',
  data () {
    return {
      // 上传成功之后存储的图片地址
      imageUrl: ''
    }
  },
  methods: {
    // 自定义上传的回调函数
    // file 图片的文件对象
    upload ({ file }) {
      // console.log('开始上传：', file)
      // 自己处理上传逻辑（发请求）=》调用腾讯云提供的（SDK）方法
      cos.putObject({
        Bucket: 'hr-1255477649', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD', // 存储模式=》标准模式
        Body: file, // 上传文件对象
        // progressData 图片上传进度数据
        onProgress: (progressData) => {
          // 上传完成之前一直执行=》会把图片的上传进度返回给前端=》0.1 0.2... 1
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // 1. err 如果上传失败会返回错误信息（如果上传成功err的值null）
        // 2. data 上传成功服务器返回的图片数据
        // 注意：回调函数要写成箭头函数，才能成功获取组件实例this
        if (!err) {
          // 上传成功了
          console.log('上传成功：', data)
          this.imageUrl = `https://${data.Location}`
        }
      })
    },
    // 上传之前对图片大小和格式做校验
    beforeAvatarUpload (file) {
      console.log('开始上传之前校验：', file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
