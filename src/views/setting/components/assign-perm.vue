<template>
  <!-- 分配权限的弹层 -->
  <el-dialog
    title="分配权限(一级为路由页面查看权限-二级为按钮操作权限)"
    :visible="showAssignDialog"
    @close="closeAssignDialog"
  >
    <!-- 权限点数据展示 -->
    <el-tree
      ref="tree"
      :data="permList"
      default-expand-all
      :props="{ label: 'name' }"
    ></el-tree>

    <template #footer>
      <el-button @click="closeAssignDialog">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
// 导入转换树形结构方法
import { tranformTreeData } from '@/utils'
export default {
  props: {
    showAssignDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 权限点树形数据
      permList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    //  获取权限点列表数据
    async getList () {
      const list = await getPermissionList()
      // console.table(list)
      this.permList = tranformTreeData(list)
    },
    closeAssignDialog () {
      this.$emit('update:showAssignDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
