import request from '@/utils/request'
// 获取公司部门数据
export function getDepartments () {
  return request({
    url: '/company/department'
  })
}

/**
 * @description: 删除部门
 * @param {*} id 当前点击的操作按钮 所在的项的id
 * @return {*}
 */
export function delDepartments (id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 新增子部门
 * @param {*}
        data {
            name: '', // 部门名称
            code: '', // 部门编码
            manager: '', // 部门管理者
            introduce: '', // 部门介绍
            pid: '' // 1. 顶级部门 =》传空  2. 子部门 =》传父部门的ID
        }
 * @return {*}
 */
export function addDepartments (data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
