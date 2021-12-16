/**
 * 使用cookie存储token
 */
import Cookies from 'js-cookie'

// 存储的属性名
const TokenKey = 'hr-sass-141'

/**
 * 获取本地存储的token
 * @returns token值
 */
export function getToken () {
  return Cookies.get(TokenKey)
}
/**
 * 存储token到本地cookie
 * @param {*} token
 * @returns
 */
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
/**
 * 删除本地token
 * @returns
 */
export function removeToken () {
  return Cookies.remove(TokenKey)
}
