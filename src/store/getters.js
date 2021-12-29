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
  name: state => state.user.user.username,
  // 公司
  company: state => state.user.user.company,
  // 部门
  dept: state => state.user.user.departmentName,
  // 工号
  workNumber: state => state.user.user.workNumber

}
export default getters
