import request from '@/utils/request'
/**
 * 支持跨域请求（后台设置支持）
 * @param {object} data:{mobile,password}
 * @returns
 */
export function login (data) {
  // 返回Promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * @description: 获取用户头像（员工详情接口）
 * @param {*} id 用户id
 * @return {*}
 */
export function getUserDetailById (id) {
  return request({
    url: `/sys/user/${id}`
  })
}

