<template>
  <el-dialog title="新增部门" :visible="showDialog" width="50%" @close="close">
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
      <el-button type="primary" @click="addDept">新增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    // 父传子
    // 父组件传过来的变量=》控制弹层是否显示
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
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
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] }
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
    },
    // 新增部门
    async addDept () {
      try {
        await this.$refs.fm.validate()
        // 校验通过
      } catch (error) {
        console.log('校验失败', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
