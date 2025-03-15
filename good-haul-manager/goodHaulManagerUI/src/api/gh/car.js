/*
 * @FilePath: car.js
 * @Author: Aron
 * @Date: 2024-03-31 18:29:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-31 18:30:03
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import request from "@/utils/request";

// 查询司机车辆管理列表
export function listCar(query) {
  return request({
    url: "/gh/car/list",
    method: "get",
    params: query,
  });
}

// 查询司机车辆管理详细
export function getCar(id) {
  return request({
    url: "/gh/car/" + id,
    method: "get",
  });
}

// 新增司机车辆管理
export function addCar(data) {
  return request({
    url: "/gh/car",
    method: "post",
    data: data,
  });
}

// 修改司机车辆管理
export function updateCar(data) {
  return request({
    url: "/gh/car",
    method: "put",
    data: data,
  });
}

// 删除司机车辆管理
export function delCar(id) {
  return request({
    url: "/gh/car/" + id,
    method: "delete",
  });
}
