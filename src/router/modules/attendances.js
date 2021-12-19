// 公共布局组件
import Layout from '@/layout'
// 导出页面的路由配置规则
export default {
  path: '/attendances',
  component: Layout,
  children: [
    {
      path: '',
      name: 'attendances', // 后期：权限控制会使用
      component: () => import('@/views/attendances'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]

}
