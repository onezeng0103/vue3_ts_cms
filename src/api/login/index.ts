import request from '@/utils/request'
export const captchaImageApi: () => Promise<any> = () => {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
export const loginApi: (data: any) => Promise<any> = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
