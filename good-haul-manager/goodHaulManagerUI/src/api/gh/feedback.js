/*
 * @FilePath: feedback.js
 * @Author: Aron
 * @Date: 2024-03-31 18:17:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-31 18:18:07
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import request from "@/utils/request";

// 查询反馈管理列表
export function listFeedback(query) {
  return request({
    url: "/gh/feedback/list",
    method: "get",
    params: query,
  });
}

// 查询反馈管理详细
export function getFeedback(id) {
  return request({
    url: "/gh/feedback/" + id,
    method: "get",
  });
}

// 新增反馈管理
export function addFeedback(data) {
  return request({
    url: "/gh/feedback",
    method: "post",
    data: data,
  });
}

// 修改反馈管理
export function updateFeedback(data) {
  return request({
    url: "/gh/feedback",
    method: "put",
    data: data,
  });
}

// 删除反馈管理
export function delFeedback(id) {
  return request({
    url: "/gh/feedback/" + id,
    method: "delete",
  });
}
