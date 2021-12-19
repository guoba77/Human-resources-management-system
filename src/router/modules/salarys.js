// 公共布局组件
import Layout from '@/layout'
// 导出页面的路由配置规则
export default {
  path: '/salarys',
  component: Layout,
  children: [
    {
      path: '',
      name: 'salarys', // 后期：权限控制会使用
      component: () => import('@/views/salarys'),
      meta: { title: '工资', icon: 'dashboard' }
    }
  ]

}
