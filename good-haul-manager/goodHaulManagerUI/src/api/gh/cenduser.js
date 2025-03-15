import request from '@/utils/request'

// 查询C端用户管理列表
export function listCenduser(query) {
  return request({
    url: '/gh/cenduser/list',
    method: 'get',
    params: query
  })
}

// 查询C端用户管理详细
export function getCenduser(id) {
  return request({
    url: '/gh/cenduser/' + id,
    method: 'get'
  })
}

// 新增C端用户管理
export function addCenduser(data) {
  return request({
    url: '/gh/cenduser',
    method: 'post',
    data: data
  })
}

// 修改C端用户管理
export function updateCenduser(data) {
  return request({
    url: '/gh/cenduser',
    method: 'put',
    data: data
  })
}

// 删除C端用户管理
export function delCenduser(id) {
  return request({
    url: '/gh/cenduser/' + id,
    method: 'delete'
  })
}
