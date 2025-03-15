/*
 * @FilePath: rider.js
 * @Author: Aron
 * @Date: 2024-03-31 18:32:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-31 18:32:24
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import request from "@/utils/request";

// 查询B端骑手管理列表
export function listRider(query) {
  return request({
    url: "/gh/rider/list",
    method: "get",
    params: query,
  });
}

// 查询B端骑手管理详细
export function getRider(id) {
  return request({
    url: "/gh/rider/" + id,
    method: "get",
  });
}

// 新增B端骑手管理
export function addRider(data) {
  return request({
    url: "/gh/rider",
    method: "post",
    data: data,
  });
}

// 修改B端骑手管理
export function updateRider(data) {
  return request({
    url: "/gh/rider",
    method: "put",
    data: data,
  });
}

// 删除B端骑手管理
export function delRider(id) {
  return request({
    url: "/gh/rider/" + id,
    method: "delete",
  });
}
