<template>
  <div class="permission-container">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <el-row type="flex" justify="space-between" align="middle">
            <span>权限管理</span>
            <!-- 1. 增加页面访问权限点 -->
            <el-button type="primary" @click="openAdd(1, '0')">
              添加权限
            </el-button>
          </el-row>
        </div>
        <!-- card body -->
        <el-table border :data="list" row-key="id">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="code" label="标识" />
          <el-table-column prop="description" label="描述" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <!-- 2. 页面下按钮操作权限点 -->
              <el-button
                v-if="row.type === 1"
                type="text"
                @click="openAdd(2, row.id)"
              >
                添加
              </el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text" @click="delPerm(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 新增权限点弹层 -->
    <el-dialog :visible.sync="showDialog" title="弹层标题" @close="close">
      <el-form ref="fm" label-width="100px" :model="formData" :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="text-align: right">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="addPerm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission, delPermission } from '@/api/permisson'
// 导入转换树形结构方法
import { tranformTreeData } from '@/utils'
export default {
  data () {
    return {
      // 权限点列表
      // 权限点数据分类：1. 页面访问权限（父）  2. 页面下功能（按钮）操作权限（子）
      // 后续做权限控制，也是基于以上两种分类权限数据做控制
      list: [],
      showDialog: false,
      // 表单数据
      formData: {
        enVisible: '0', // '1' 开启  '0' 不开启
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型=> 权限类型 1-页面访问 | 2-页面下功能
        pid: '' // 添加到哪个节点下=>'0'代表是页面权限 | '604f7df5f900be1850edb152'代表页面下功能权限
      },
      // 校验规则
      rules: {
        name: [{ required: true, message: '权限点名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限点标识不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 删除权限点
    async delPerm (row) {
      /**
       * 思路：
       * 1. 用户确认
       * 2. 确认后=》如果是页面访问权限，下边有子（不能删除）=》调用接口删除
       * 3. 刷新列表
       */
      try {
        await this.$confirm(`确认删除:${row.name}权限吗？`)
        // 如果是页面访问权限，下边有子（不能删除）
        if (row.children && row.children.length > 0) {
          return this.$message.error('页面权限下有功能点权限，不能删除！')
        }
        await delPermission(row.id)
        this.getList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 提交：新增权限
    async addPerm () {
      try {
        await this.$refs.fm.validate()
        // 校验通过=》调用接口
        await addPermission(this.formData)
        this.getList()
        this.showDialog = false
        this.$message.success(`添加：${this.formData.type === 1 ? '页面访问权限' : '页面下按钮权限'}成功！`)
        console.log('ok')
      } catch (error) {
        console.log(error)
      }
    },
    // type 权限分类   pid 权限父节点 （'0' 页面权限 |  具体ID 页面下按钮权限）
    openAdd (type, pid) {
      this.showDialog = true
      // 打开弹层=》新增的是那种类型的权限点数据
      this.formData.type = type
      this.formData.pid = pid
    },
    // 关闭弹层执行
    close () {
      this.formData = {
        enVisible: '0', // '1' 开启  '0' 不开启
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型=> 权限类型 1-页面访问 | 2-页面下功能
        pid: '' // 添加到哪个节点下=>'0'代表是页面权限 | '604f7df5f900be1850edb152'代表页面下功能权限
      }
      this.$refs.fm.resetFields()
    },
    //  获取权限点列表数据
    async getList () {
      const list = await getPermissionList()
      // console.table(list)
      this.list = tranformTreeData(list)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
