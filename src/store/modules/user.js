/**
 * 存储登录人信息
 */
import { login } from '@/api/user'
export default {
  // 开启命名空间（模块化）
  namespaced: true,
  // 定义数据变量（全局共享的）（和组件data类似的：私有）=》相同点：响应式的
  state: {
    token: ''
  },
  // 修改state定义的变量（只能通过它修改）=》特点：同步
  mutations: {
    /**
     * 存token
     * @param {*} state 定义数据变量state:object
     * @param {*} token 调用setToken方法传入要存储的token值
     */
    setToken (state, token) {
      state.token = token
    },
    /**
     * 删除token
     * @param {*} state
     */
    delToken (state) {
      state.token = ''
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
    }
  }
}
