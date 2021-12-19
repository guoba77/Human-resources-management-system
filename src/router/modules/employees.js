// 公共布局组件
import Layout from '@/layout'
// 导出页面的路由配置规则
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees', // 后期：权限控制会使用
      component: () => import('@/views/employees'),
      meta: { title: '员工管理', icon: 'dashboard' }
    }
  ]

}
