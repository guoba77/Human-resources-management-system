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
    upload (params) {
      console.log('开始上传：', params)
      // 自己处理上传逻辑（发请求）=》调用腾讯云提供的（SDK）方法
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
