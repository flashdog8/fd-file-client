import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/logon/login_by_user_code',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/auth/logon/logout',
    method: 'post'
  })
}

export function getCaptcha(data) {
  return request({
    url: '/api/auth/captcha/get',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/api/auth/logon/register_by_user_code',
    method: 'post',
    data
  })
}

export function changePwd(data) {
  return request({
    url: '/api/auth/pwd/change',
    method: 'post',
    data
  })
}
