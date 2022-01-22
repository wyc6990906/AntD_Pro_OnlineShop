import request from '@/utils/request'

//获取统计面板数据
export function getDashboardData() {
  return request('/admin/index')
}
