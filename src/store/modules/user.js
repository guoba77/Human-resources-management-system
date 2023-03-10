/**
 * 存储登录人信息
 */
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 导入持计划方法
import * as auth from '@/utils/auth'
// console.log('导入auth模块所有方法：', auth)
import { resetRouter } from '@/router'

export default {
  // 开启命名空间（模块化）
  namespaced: true,
  // 定义数据变量（全局共享的）（和组件data类似的：私有）=》相同点：响应式的
  state: {
    // 默认从本地获取一次token（获取上一次存储的token）
    token: auth.getToken() || '',
    // 当前登录人信息(结合后台返回数据的类型)
    user: {}
  },
  // 修改state定义的变量（只能通过它修改）=》特点：同步
  mutations: {
    /**
     * 存token
     * @param {*} state 定义数据变量state:object
     * @param {*} token 调用setToken方法传入要存储的token值
     */
    setToken (state, token) {
      // 内存和硬盘都存一份
      state.token = token
      auth.setToken(token)
    },
    /**
     * 删除token
     * @param {*} state
     */
    delToken (state) {
      state.token = ''
      auth.removeToken()
    },
    /**
     *
     * @param {*} state
     * @param {*} user 调用setUser传入的用户信息数据
     */
    setUser (state, user) {
      state.user = user
    },
    /**
     * 清空登录人信息
     * @param {*} state
     */
    delUser (state) {
      state.user = {}
    }
  },
  // 获取后台数据的方法 =》特点：异步
  actions: {
    /**
     *
     * @param {*} ctx:object {commit}
     * @param {*} loginForm 登录表单数据 {mobile,password}
     */
    async getTokenAction ({ commit }, loginForm) {
      // console.log('登录：', ctx, loginForm)
      // 1. 调用登录接口获取token
      const res = await login(loginForm)
      console.log(res)
      // 2. 调用mutations方法setToken存储
      commit('setToken', res)
    },
    async getUserAction ({ commit }) {
      // 1. 获取登录人信息
      const user = await getUserInfo()
      // 2. 获取登录人头像
      const photo = await getUserDetailById(user.userId)
      console.log('登录人信息：', user, photo)
      commit('setUser', { ...user, ...photo })
      // 返回数据=》外边调用，可以通过.then或者await获取
      // return 的值相当于resolve(值)
      return user.roles
    },
    /**
     * 退出登录=》删除token和登录人user信息
     * @param {} param0
     */
    logoutAction ({ commit }) {
      commit('delToken')
      commit('delUser')
      // 1. 重置路由，避免缓存
      resetRouter()
      // 2. 清除菜单数据，只留下静态路由的数据
      // 说明：跨模块调用=》第三个参数必须传入{ root: true }
      commit('menu/setList', [], { root: true })
    }
  }
}
