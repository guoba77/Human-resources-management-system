import request from '@/utils/request'
/**
 * @description: 获取角色列表=》支持分页
 * @param {*} params:{page, pagesize}
 * @return {*}
 */
export function getRoleList (params) {
  return request({
    url: '/sys/role',
    params
  })
}
