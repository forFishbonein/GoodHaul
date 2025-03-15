/*
 * @FilePath: driver.js
 * @Author: Aron
 * @Date: 2024-03-31 18:25:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-31 18:25:41
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import request from "@/utils/request";

// 查询B端司机管理列表
export function listDriver(query) {
  return request({
    url: "/gh/driver/list",
    method: "get",
    params: query,
  });
}

// 查询B端司机管理详细
export function getDriver(id) {
  return request({
    url: "/gh/driver/" + id,
    method: "get",
  });
}

// 新增B端司机管理
export function addDriver(data) {
  return request({
    url: "/gh/driver",
    method: "post",
    data: data,
  });
}

// 修改B端司机管理
export function updateDriver(data) {
  return request({
    url: "/gh/driver",
    method: "put",
    data: data,
  });
}

// 删除B端司机管理
export function delDriver(id) {
  return request({
    url: "/gh/driver/" + id,
    method: "delete",
  });
}
