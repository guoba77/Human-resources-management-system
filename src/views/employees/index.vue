<template>
  <div class="employees">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <!-- 页面title -->
        <template #header>
          <!-- 通栏组件 -->
          <PageTools>
            <template #left>
              <span>总计{{ total }}条数据</span>
            </template>
            <template #right>
              <el-button
                type="primary"
                size="small"
                @click="$router.push('/import')"
              >
                导入excel
              </el-button>
              <el-button type="primary" size="small">导出excel</el-button>
              <el-button type="primary" size="small" @click="showDialog = true">
                新增员工
              </el-button>
            </template>
          </PageTools>
        </template>
        <!-- 页面的内容 -->
        <!-- table列表 -->
        <el-table
          :border="true"
          :data="list"
          :default-sort="{ prop: 'workNumber', order: 'ascending' }"
        >
          <el-table-column type="index" label="序号" />
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="workNumber" label="工号" />
          <el-table-column label="聘用形式">
            <template #default="{ row }">
              {{ formatFormOfEmployment(row.formOfEmployment) }}
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" />
          <!-- sortable 开启手动排序 -->
          <el-table-column sortable prop="correctionTime" label="入职时间" />
          <el-table-column label="账户状态">
            <el-switch v-model="qy" />
          </el-table-column>
          <!-- 列规定 fixed属性 -->
          <el-table-column label="操作" fixed="right" width="280">
            <template #default="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small" @click="delEmploy(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            background
            :total="total"
            :current-page="query.page"
            :page-size="query.size"
            :page-sizes="[10, 2, 5]"
            layout="prev, pager, next, sizes"
            @current-change="changePage"
            @size-change="changeSize"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 新增员工弹层 -->
    <!-- <AddEmploy :show-dialog="showDialog" @close-dialog="showDialog = $event" />
     -->
    <!--
       父传子.sync 作用：可以同步修改绑定的变量值
       .sync语法糖：
       1. 父传子=》:props.sync
       2. 子传父=> 子组件中事件名=》update:props
      -->
    <AddEmploy :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
// 导入数据字典
import diction from '@/api/constant/employees'

import AddEmploy from './components/add-employee.vue'

export default {
  components: {
    AddEmploy
  },
  data () {
    return {
      showDialog: false,
      // 根据后台接口需要参数和返回数据
      qy: true,
      // 员工列表
      list: [],
      // 分页参数
      query: {
        page: 1, // 当前页
        size: 10 // 每页多少条数据
      },
      // 员工总条数
      total: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 删除员工
    async delEmploy (row) {
      // console.log(row)
      /**
       * 1. 用户确认
       * 2. 确认之后=》调用接口删除
       * 3. 刷新列表
       * 4. 提示
       */
      try {
        await this.$confirm(`确认删除：${row.username}吗？`)
        // 确定
        await delEmployee(row.id)
        // 处理最后一页数据全部删完后列表页码正确，但数据显示错误问题（刷新列表使用的是上次的页码）
        // 解决：重新计算页码 => 总页码 = （数据总条数-1） / 每页条数
        const newPage = Math.ceil((this.total - 1) / this.query.size)
        if (this.query.page > newPage) {
          // 纠正页码
          this.query.page = newPage
        }
        this.getList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 根据数据字典查询对应数字代表的含义（码值）
    // type: 1 正式  2 非正式
    formatFormOfEmployment (type) {
      // console.log('数据字典：', diction)
      /**
       * 思路：
       * 1. 生成映射关系map:{1:'正式',2:'非正式'}
       * 2. 根据map获取对应码值
       */
      const map = {}
      diction.hireType.forEach(item => {
        map[item.id] = item.value
      })
      // 返回根据map获取到的码值，给模板渲染
      return map[type]
    },
    // 获取员工列表
    async getList () {
      const { rows, total } = await getEmployeeList(this.query)
      console.log(rows)
      this.list = rows
      this.total = total
    },
    // 切换页码
    changePage (page) {
      // console.log(page)
      // 根据新页码请求数据=》刷列表
      /**
       * 1. 更新页码
       * 2. 刷列表
       */
      this.query.page = page
      this.getList()
    },
    // 切换每页多少条数据
    changeSize (size) {
      // console.log(size)
      /**
       * 1. 更新每页条数
       * 2. 刷列表
       */
      this.query.size = size
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
