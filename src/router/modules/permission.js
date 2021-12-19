// 公共布局组件
import Layout from '@/layout'
// 导出页面的路由配置规则
export default {
  path: '/permission',
  component: Layout,
  children: [
    {
      path: '',
      name: 'permission', // 后期：权限控制会使用
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'dashboard' }
    }
  ]

}
