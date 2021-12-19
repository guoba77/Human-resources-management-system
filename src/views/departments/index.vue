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
              <span>江苏传智播客教育科技股份有限公司</span>
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
                      <el-dropdown-item>添加子部门</el-dropdown-item>
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
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                        <el-dropdown-item>编辑部门</el-dropdown-item>
                        <el-dropdown-item>删除部门</el-dropdown-item>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 公司部门数据（树形结构）
      treeData: [
        {
          name: '总裁办',
          children: [
            {
              name: '秘书处',
              children: [
                {
                  name: '前台'
                }
              ]
            },
            {
              name: '行政部'
            }
          ]
        },
        {
          name: '开发部',
          children: [
            {
              name: '前端开发'
            },
            {
              name: '后台开发'
            }
          ]
        }
      ],
      // 需求：后台返回的数据部门名叫name
      defaultProps: {
        children: 'children',
        label: 'name' // 指定渲染使用的部门属性名叫name
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
