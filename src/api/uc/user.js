import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/api/uc/user/get_current',
    method: 'post'
  })
}