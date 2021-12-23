<template>
  <!-- sync修饰可以同步修改数据 -->
  <el-dialog title="新增员工" :visible="showDialog" @close="close">
    <!-- 表单 -->
    <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <!-- 下拉选项： label 下拉显示名  value 存储的值 -->
          <el-option
            v-for="item in employList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="showDept = true"
        />
        <!-- 需求：部门输入框获取焦点的时候，显示部门列表（可以选择） -->
        <el-row v-show="showDept" class="selDept">
          <!-- 关闭按钮 -->
          <i class="el-icon-circle-close" @click="showDept = false"></i>
          <el-tree
            :data="treeData"
            default-expand-all
            :props="{ label: 'name' }"
            @node-click="selDept"
          ></el-tree>
        </el-row>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-button @click="$emit('update:showDialog')">取消</el-button>
      <el-button type="primary" @click="addEmploy">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import diction from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
import { getDepartments } from '@/api/departments'
// 导入树形转换方法
import { tranformTreeData, parseTime } from '@/utils'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDept: false,
      // 部门列表数据
      treeData: [],
      // 聘用形式列表
      employList: diction.hireType,
      // 表单数据
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        timeOfEntry: '', // 入职时间
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        correctionTime: '' // 转正时间
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.getTreeData()
  },
  methods: {
    // 提交：新增员工
    async addEmploy () {
      try {
        await this.$refs.addForm.validate()
        // 校验通过
        console.log('校验通过')
        /**
         * 思路：
         * 1. 格式化入职时间和转正事件
         * 2. 调用接口新增员工
         * 3. 刷新列表
         * 4. 关闭弹层和提示
         */
        this.formData.timeOfEntry = parseTime(this.formData.timeOfEntry, '{y}-{m}-{d}')
        this.formData.correctionTime = parseTime(this.formData.correctionTime, '{y}-{m}-{d}')
        await addEmployee(this.formData)
        // 刷新列表=》1. 子传父  2. this.$parent => 获取父组件实例（可以调用实例上的方法）
        console.log('父组件实例：', this.$parent)
        this.$parent.getList()
        this.$emit('update:showDialog')
        this.$message.success('新增成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 选择部门
    selDept (dept) {
      console.log('当前选择的部门：', dept)
      // 1. 显示选择的部门名称到部门输入框中
      this.formData.departmentName = dept.name
      // 2. 关闭部门选择
      this.showDept = false
    },
    // 获取部门数据
    async getTreeData () {
      const { depts } = await getDepartments()
      // console.log(tranformTreeData(depts))
      this.treeData = tranformTreeData(depts)
    },
    // 关闭弹层执行
    close () {
      this.$emit('update:showDialog')
      // 重置表单校验和数据
      this.$refs.addForm.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.selDept {
  width: 280px;
  border: 1px solid #eee;
  position: relative;
  .el-icon-circle-close {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 10;
    font-size: 18px;
    color: #666;
    cursor: pointer;
  }
}
</style>
