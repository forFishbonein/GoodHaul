/*
 * @FilePath: profile.js
 * @Author: Aron
 * @Date: 2024-03-31 18:02:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-31 18:02:20
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import request from "@/utils/request";

// 查询C端用户信息管理列表
export function listProfile(query) {
  return request({
    url: "/gh/profile/list",
    method: "get",
    params: query,
  });
}

// 查询C端用户信息管理详细
export function getProfile(id) {
  return request({
    url: "/gh/profile/" + id,
    method: "get",
  });
}

// 新增C端用户信息管理
export function addProfile(data) {
  return request({
    url: "/gh/profile",
    method: "post",
    data: data,
  });
}

// 修改C端用户信息管理
export function updateProfile(data) {
  return request({
    url: "/gh/profile",
    method: "put",
    data: data,
  });
}

// 删除C端用户信息管理
export function delProfile(id) {
  return request({
    url: "/gh/profile/" + id,
    method: "delete",
  });
}
