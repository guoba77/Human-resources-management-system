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
                v-if="canClick('DR')"
                type="primary"
                size="small"
                @click="$router.push('/import')"
              >
                导入excel
              </el-button>
              <el-button
                :loading="downloadLoading"
                type="primary"
                size="small"
                @click="exportData"
              >
                导出excel
              </el-button>
              <el-button
                v-if="canClick('p-em-add')"
                type="primary"
                size="small"
                @click="showDialog = true"
              >
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
          <!-- 显示员工头像 -->
          <el-table-column label="头像">
            <template #default="{ row }">
              <el-image
                class="photo"
                :src="row.staffPhoto"
                fit="cover"
                @click="openCode(row.staffPhoto)"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="workNumber" label="工号" />
          <el-table-column label="聘用形式">
            <template #default="{ row }">
              {{ formatFormOfEmployment(row.formOfEmployment) }}
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" />
          <!-- sortable 开启手动排序 -->
          <el-table-column sortable prop="timeOfEntry" label="入职时间" />
          <el-table-column label="账户状态">
            <el-switch v-model="qy" />
          </el-table-column>
          <!-- 列规定 fixed属性 -->
          <el-table-column label="操作" fixed="right" width="280">
            <template #default="{ row }">
              <el-button
                v-if="canClick('p-em-look')"
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
              >
                查看
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="openAssingRole(row.id)"
              >
                分配角色
              </el-button>
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
    <!-- 员工头像二维码 -->
    <QrCode ref="qr" :show-code.sync="showCode" />
    <!-- 给员工分配角色 -->
    <AssignRole ref="ar" :show-role-dialog.sync="showRoleDialog" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
// 导入数据字典
import diction from '@/api/constant/employees'

import AddEmploy from './components/add-employee.vue'

// 员工头像二维码弹层
import QrCode from './components/qr-code.vue'
// 导入给员工分配角色弹层
import AssignRole from './components/assign-role.vue'

export default {
  components: {
    AddEmploy,
    QrCode,
    AssignRole
  },
  data () {
    return {
      showRoleDialog: false,
      showCode: false,
      downloadLoading: false,
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
    // 打开分配角色弹层
    openAssingRole (id) {
      this.showRoleDialog = true
      // 调用子组件方法getUserRoles查询用户分配过的角色数据
      this.$refs.ar.getUserRoles(id)
    },
    // 打开头像二维码弹层
    openCode (url) {
      // 1. 打开弹层
      this.showCode = true
      // 2. 调用子组件中draw方法绘制二维码
      this.$refs.qr.draw(url)
    },
    // 导出某一页员工数据为Excel下载保存到本地电脑
    async exportData () {
      // 开启loading=》开始导出
      this.downloadLoading = true
      // 异步导入模块语法：import('js模块的路径') =》返回Promise对象
      const excel = await import('@/utils/Export2Excel')
      console.log('模块导入的方法：', excel)
      // 准备：导出的excel表头和数据(注意顺序)
      const { header, secondArray } = this.provideData()
      console.log('员工数据处理成二维数组：', secondArray)
      // const header = ['姓名', '性别', '工资']
      // const data = [
      //   // 第一条数据
      //   ['刘备', '男', 30000],
      //   // 第二条数据
      //   ['关羽', '男', 20000],
      //   // 第三条数据
      //   ['张飞', '男', 10000]
      // ]
      excel.export_json_to_excel({
        header, // 导出excel数据表头（数组）
        data: secondArray, // 导出具体数据（二维数组）
        filename: `第${this.query.page}页员工数据`, // 导出文件名
        autoWidth: true, // cell宽度是否自适应
        bookType: 'xlsx' // 导出文件格式
      })
      // 关闭loading=》导出结束
      this.downloadLoading = false
    },
    // 提供导出excel表头和数据的方法
    provideData () {
      // 指定导出员工数据的映射关系
      const exportMap = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '工号': 'workNumber',
        '转正日期': 'correctionTime',
        '部门': 'departmentName'
      }
      // 表头
      const header = Object.keys(exportMap)
      // 指定导出的属性名
      const filterKeys = Object.values(exportMap)
      // 要导出的数据是谁？=》this.list(某一页员工数据)=》处理成二维数据
      /**
       * 1. 准备一个空数组
       * 2. 循环员工列表list，只是把值存到二维数组中
       * 3. 返回处理完的二维数组
       */
      //  const secondArray = [[1588888888,'管理员','2021-6-1',1, '007','2021-6-1','总裁办'], ...]
      const secondArray = []
      this.list.forEach(item => {
        // item => 转换成[1588888888,'管理员','2021-6-1',1, '007','2021-6-1','总裁办']
        const userInfo = []
        // 循环员工信息对象=》根据filterKeys决定导出的数据字段
        for (const key in item) {
          if (filterKeys.includes(key)) {
            // 在映射关系中=》说明是需要导出的属性
            if (key === 'formOfEmployment') {
              // 对聘用形式1和2做格式化
              userInfo.push(this.formatFormOfEmployment(item[key]))
            } else {
              userInfo.push(item[key])
            }
          }
        }
        secondArray.push(userInfo)
      })

      return { header, secondArray }
    },
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
.photo {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
</style>
