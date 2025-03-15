/*
 * @FilePath: order.js
 * @Author: Aron
 * @Date: 2024-03-31 22:27:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-02 19:28:09
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import request from "@/utils/request";

// 查询C端用户管理列表
export function listOrder(query) {
  return request({
    url: "/gh/order/list",
    method: "get",
    params: query,
  });
}

// 查询C端用户管理详细
export function getOrder(id) {
  return request({
    url: "/gh/order/" + id,
    method: "get",
  });
}

// 新增C端用户管理
export function addOrder(data) {
  return request({
    url: "/gh/order",
    method: "post",
    data: data,
  });
}

// 修改C端用户管理
export function updateOrder(data) {
  return request({
    url: "/gh/order",
    method: "put",
    data: data,
  });
}

// 删除C端用户管理
export function delOrder(id) {
  return request({
    url: "/gh/order/" + id,
    method: "delete",
  });
}
