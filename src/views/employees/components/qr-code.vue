<template>
  <el-dialog title="头像二维码" :visible="showCode" width="30%" @close="close">
    <el-row type="flex" justify="center">
      <canvas />
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showCode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      // 通过子传父关闭弹层
      this.$emit('update:showCode', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
