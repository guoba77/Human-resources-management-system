// 公共布局组件
import Layout from '@/layout'
// 导出页面的路由配置规则
export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      path: '',
      name: 'departments', // 后期：权限控制会使用
      component: () => import('@/views/departments'),
      meta: { title: '组织架构', icon: 'dashboard' }
    }
  ]

}
