import { constantRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    // 菜单数据 = 静态路由规则 + 动态路由规则（当前登录人可以看的=》过滤的结果）
    list: []
  },
  mutations: {
    /**
     *
     * @param {*} state
     * @param {*} canLook 当前登录人可以访问页面的路由规则
     */
    setList (state, canLook) {
      state.list = [...constantRoutes, ...canLook]
    }
  }
}
