import request from '@/utils/request'
/**
 *
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

export function getInfo (token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
