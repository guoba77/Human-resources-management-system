// 公共布局组件
import Layout from '@/layout'
// 导出页面的路由配置规则
export default {
  path: '/departments',
  component: Layout,
  // hidden: true, // 不在菜单显示
  children: [
    {
      path: '',
      name: 'departments', // 后期：权限控制会使用
      component: () => import('@/views/departments'),
      // title 菜单显示名  icon 菜单左侧图标=》对应的是icons/svg目录下svg图片的名字（不带.svg后缀）
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]

}
