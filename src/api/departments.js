import request from '@/utils/request'
// 获取公司部门数据
export function getDepartments () {
  return request({
    url: '/company/department'
  })
}
