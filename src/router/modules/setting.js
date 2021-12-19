// 公共布局组件
import Layout from '@/layout'
// 导出页面的路由配置规则
export default {
  path: '/setting',
  component: Layout,
  children: [
    {
      path: '',
      name: 'setting', // 后期：权限控制会使用
      component: () => import('@/views/setting'),
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]

}
