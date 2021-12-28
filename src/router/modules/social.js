// 公共布局组件
import Layout from '@/layout'
// 导出页面的路由配置规则
export default {
  path: '/social',
  component: Layout,
  children: [
    {
      path: '',
      name: 'social_securitys', // 后期：权限控制会使用
      component: () => import('@/views/social'),
      meta: { title: '社保', icon: 'table' }
    }
  ]

}
