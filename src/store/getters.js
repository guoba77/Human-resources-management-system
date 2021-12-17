/**
 * 快捷访问=》子模块的数据
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // 当前登录人头像
  avatar: state => state.user.user.staffPhoto,
  // 当前登录人用户名
  name: state => state.user.user.username
}
export default getters
