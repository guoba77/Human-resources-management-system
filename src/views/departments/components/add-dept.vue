<template>
  <el-dialog
    :title="form.id ? '编辑部门' : '新增部门'"
    :visible="showDialog"
    width="50%"
    @close="close"
  >
    <!-- 新增部门表单 -->
    <el-form ref="fm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="form.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="form.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="form.manager"
          style="width: 80%"
          placeholder="请选择"
        >
          <!-- lable 选项显示什么  | value 存什么值 -->
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="form.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- 弹层底部放置操作按钮的具名插槽 -->
    <span slot="footer">
      <el-button @click="$emit('close-dialog', false)">取消</el-button>
      <el-button type="primary" @click="addDept">{{
        form.id ? "修改" : "新增"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple } from '@/api/employees'
import { addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
export default {
  props: {
    // 父传子
    // 父组件传过来的变量=》控制弹层是否显示
    showDialog: {
      type: Boolean,
      default: false
    },
    // 父部门数据=》复杂类型数据，要通过函数返回默认值
    parentDept: {
      type: Object,
      default: () => ({})
      // default: () =>{
      //   return {}
      // }
    },
    //  所有部门数据
    allDepts: {
      type: Array,
      default: () => []
    }
  },
  data () {
    // 需求：新增部门，用户填写的编码要全局唯一
    /**
     * value 当前校验的表单值
     * cb 控制校验是否通过：cb() 通过 | cb(new Error('错误提示信息'))
     */
    const validCode = (rule, value, cb) => {
      let flag
      if (this.form.id) {
        // 编辑=>排除自身
        flag = this.allDepts.some(item => item.code === value && value !== this.parentDept.code)
      } else {
        // 新增
        flag = this.allDepts.some(item => item.code === value)
      }
      if (flag) {
        // 重复
        cb(new Error('部门编码重复了！'))
      }
      // 通过
      cb()
    }
    return {
      // 部门负责人列表
      peoples: [],
      // 表单数据
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 表单校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: validCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.getPeoples()
  },
  methods: {
    // 获取编辑部门详情数据=》回填数据
    async getDeptDetil (id) {
      const detail = await getDepartDetail(id)
      // 回填数据
      this.form = detail
    },
    // 获取部门负责人列表
    async getPeoples () {
      const peoples = await getEmployeeSimple()
      console.log(peoples)
      this.peoples = peoples
    },
    // 关闭弹层执行
    close () {
      // console.log('弹层关闭了')
      // 通过子传父修改showDialog关闭弹层
      this.$emit('close-dialog', false)
      // 这里手动清除的目的，是为实现编辑功能做准备
      this.form = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // 清除校验残留
      this.$refs.fm.resetFields()
    },
    // 新增部门
    async addDept () {
      try {
        await this.$refs.fm.validate()
        // 校验通过
        // 1. 调用接口新增|编辑
        // pid: '' // 1. 顶级部门 =》传空  2. 子部门 =》传父部门的ID
        if (this.form.id) {
          // 编辑
          await updateDepartments(this.form)
        } else {
          // 新增
          await addDepartments({ ...this.form, pid: this.parentDept.id || '' })
        }
        // 2. 新增成功获取最新数据=》刷新组织架构列表
        this.$emit('refresh-dept')
        // 3. 关闭弹层
        this.$emit('close-dialog', false)
        this.$message.success('操作成功')
      } catch (error) {
        console.log('校验失败', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
