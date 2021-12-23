import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// 公共布局组件
import Layout from '@/layout'

// 导入路由规则
// 引入多个动态路由模块
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'

// console.log(1, departmentsRouter)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes 静态路由（不需要权限，就能看的页面）| asyncRoutes 动态路由（需要有权限，才能看的页面）
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const asyncRoutes = [
  departmentsRouter,
  settingRouter,
  employeesRouter,
  permissionRouter,
  approvalsRouter,
  attendancesRouter,
  salarysRouter,
  socialRouter

]

export const constantRoutes = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 不存在的页面，会跳转到这里显示404页面
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 员工导入
  {
    path: '/import',
    component: Layout,
    hidden: true, // 不显示到菜单
    children: [{
      path: '',
      component: () => import('@/views/import')
    }]
  },
  // 首页
  {
    path: '/',
    component: Layout, // 复用公共布局组件
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 工厂函数=》创建路由实例
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // 暂时合并（说明：后期动态路由是要根据用户权限，动态添加的）
  routes: [...constantRoutes, ...asyncRoutes]
})
// 通过工厂函数得到路由实例
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由（后续动态路由会使用）
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
