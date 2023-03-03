import router, { asyncRoutes } from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: true }) // NProgress Configuration

// 白名单（例外=》不需要token也能访问的页面）
const whiteList = ['/login', '/404']

// (路由器前置守卫)访问页面：添加前门保安
/**
 * to 去哪（访问那个页面）
 * from 从哪来（从哪个页面跳转过来）
 * next:function 放行
 */
router.beforeEach(async (to, from, next) => {
  // start progress bar 显示页面加载进度条
  NProgress.start()
  /**
   * 根据是否有token（证件）
   * 有token =》1. 判断如果是登录页（避免重复登录），直接跳首页 2. 放行
   * 没有token =》判断是否在白名单（例外：登录页、404页）=》 在=》放行 |不在 =》跳回登录页
   */
  if (store.getters.token) {
    // 有token
    if (to.path === '/login') {
      // 跳首页
      next('/')
    } else {
      next()
      // 放行后，获取登录人信息(避免每次跳转重复获取登录人信息)
      if (!store.getters.name) {
        const roles = await store.dispatch('user/getUserAction')
        console.log('roles', roles)
        /**
         * 权限控制：页面访问控制
         * 1. 获取当前登录人页面的访问权限=》menus（身份标识）
         * 2. 根据menus中页面的身份标识，过滤动态路由
         * 3. 调用router实例addRoutes动态添加
         */
        console.log('获取登录人权限点身份标识数据：', roles.menus)
        // canLook 当前登录人可以查看的页面路由规则
        const canLook = asyncRoutes.filter((item) => {
          // 根据遍历的动态路由children中第一个子路由的name判断，是否在roles.menus中=》有就留下
          return roles.menus.includes(item.children[0].name)
        })
        console.log('当前登录人可以看的页面：', canLook)
        // 存储菜单数据
        store.commit('menu/setList', canLook)
        // 动态添加路由规则=》生效
        // router.addRoutes(canLook)
        router.addRoutes([...canLook, { path: '*', redirect: '/404', hidden: true }])
      }
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      // 在白名单
      next()
    } else {
      // 不在白名单
      next('/login')
    }
  }

  // finish progress bar 关闭进度条
  NProgress.done()
})

// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
