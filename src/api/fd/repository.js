import request from '@/utils/request'

export function pageRepository(data) {
  return request({
    url: '/api/fd/repository/page',
    method: 'post',
    data
  })
}