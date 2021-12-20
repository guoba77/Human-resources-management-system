<template>
  <el-dialog title="新增部门" :visible="showDialog" width="50%" @close="close">
    <!-- 新增部门表单 -->
    <div>新增部门表单</div>
    <!-- 弹层底部放置操作按钮的具名插槽 -->
    <span slot="footer">
      <el-button @click="$emit('close-dialog', false)">取消</el-button>
      <el-button type="primary" @click="addDept">新增</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // 父传子
    // 父组件传过来的变量=》控制弹层是否显示
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 关闭弹层执行
    close () {
      // console.log('弹层关闭了')
      // 通过子传父修改showDialog关闭弹层
      this.$emit('close-dialog', false)
    },
    // 新增部门
    addDept () {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
