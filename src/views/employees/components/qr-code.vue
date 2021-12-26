<template>
  <el-dialog title="头像二维码" :visible="showCode" width="30%" @close="close">
    <el-row type="flex" justify="center">
      <canvas ref="ca" />
    </el-row>
  </el-dialog>
</template>

<script>
import qc from 'qrcode'
export default {
  props: {
    showCode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 绘制二维码方法
    // 绘制二维码存储的url（地址）
    async draw (url) {
      // 语法：qc.toCanvas(canvas元素DOM对象, 二维码中存储的信息)
      // this.$nextTick()返回Promise
      // 使用场景：支付（码里存的支付地址）、数据
      await this.$nextTick()
      console.log('vue渲染是异步的：', this.$refs.ca)
      qc.toCanvas(this.$refs.ca, url)
    },
    close () {
      // 通过子传父关闭弹层
      this.$emit('update:showCode', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
