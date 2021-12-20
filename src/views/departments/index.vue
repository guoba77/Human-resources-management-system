<template>
  <div class="departments">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <!-- 页面title -->
        <!-- <div slot="header">
          <span>组织架构</span>
        </div> -->
        <template #header>
          <!-- 用一个行列布局 -->
          <el-row>
            <el-col :span="20">
              <span>{{ company.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <el-col>负责人</el-col>
                <!-- 下拉菜单 element -->
                <el-col>
                  <el-dropdown>
                    <span> 操作<i class="el-icon-arrow-down" /> </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="openAddDept()">
                        添加顶级部门
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
        <!-- 页面的内容
        default-expand-all 默认展开所有节点
        -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <!--
            1. 默认插槽形式=》自定义每个节点的html结构
            2. 作用域插槽=》通过data获取节点数据
            注意：自定义结构只能有一个根元素
           -->
          <template #default="{ data }">
            <el-row style="width: 100%">
              <el-col :span="20">
                <span>{{ data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ data.manager || "--" }}</el-col>
                  <el-col>
                    <!-- 下拉菜单 element -->
                    <el-dropdown>
                      <span> 操作<i class="el-icon-arrow-down" /> </span>
                      <!-- 下拉菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="openAddDept(data)">
                          添加子部门
                        </el-dropdown-item>
                        <el-dropdown-item>编辑部门</el-dropdown-item>
                        <el-dropdown-item @click.native="delDept(data)">
                          删除部门
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 弹层放到根元素结束之前 -->
    <AddDept
      :show-dialog="showDialog"
      :parent-dept="parentDept"
      @close-dialog="showDialog = $event"
      @refresh-dept="getTreeData"
    />
  </div>
</template>

<script>
import { getDepartments, delDepartments } from '@/api/departments'
// 导入树形转换方法
import { tranformTreeData } from '@/utils'
// 导入新增部门弹层
import AddDept from './components/add-dept.vue'
/**
 * 开发页面流程：
 * 1. 在api目录封装当前页面后台接口方法
 * 2. 导入需要使用的后台接口方法
 * 3. data中定义存储后台数据的变量
 * 4. 在methods中定义获取后台数据的方法
 * 5. 在created/mounted钩子函数中发请求获取数据并存储到data变量中
 * 6. 在template中绑定变量或事件（功能交互）
 */
export default {
  components: {
    AddDept
  },
  data () {
    return {
      showDialog: false,
      // 公司部门数据（树形结构）
      treeData: [],
      company: { name: '' }, // 公司信息
      // 需求：后台返回的数据部门名叫name
      defaultProps: {
        children: 'children',
        label: 'name' // 指定渲染使用的部门属性名叫name
      },
      parentDept: null
    }
  },
  created () {
    this.getTreeData()
  },
  methods: {
    // 打开新增部门弹层方法
    // parentDept 添加子部门的父部门数据 =》说明：顶级部门没有父，所以parentDept是undefined
    openAddDept (parentDept) {
      // 1. 存储子部门的父部门
      this.parentDept = parentDept
      // 2. 打开弹层
      this.showDialog = true
    },
    // 获取部门数据
    async getTreeData () {
      const { depts, companyName } = await getDepartments()
      console.table(depts)
      // console.log(tranformTreeData(depts))
      this.treeData = tranformTreeData(depts)
      this.company.name = companyName
    },
    // curDept 当前要删除的部门数据
    async delDept (curDept) {
      // console.log('删除的部门：', curDept)
      /**
       * 删除思路：
       * 1. 用户确认
       * 2. 确认之后=》判断是否是父部门=》是=》不能删除
       * 3. 如果没有子就可以调用接口删除
       * 4. 重新获取部门数据
       */
      try {
        await this.$confirm(`确认删除:${curDept.name}吗`)
        // 点击确定走到这里
        if (curDept.children && curDept.children.length > 0) {
          // 是父部门
          return this.$message.error('不能直接删除父部门')
        }
        // 删除逻辑
        await delDepartments(curDept.id)
        // 刷新列表
        this.getTreeData()
        this.$message.success('删除成功')
      } catch (error) {
        // 点击取消或代码写错了
        // this.$message.error(error)
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 深度作用选择符：less 使用 /deep/   |  scss使用 ::v-deep
::v-deep .el-tree-node__content {
  margin: 3px 0;
  font-size: 14px;
}
</style>
