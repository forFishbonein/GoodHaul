/*
 * @FilePath: order copy.js
 * @Author: Aron
 * @Date: 2024-04-02 19:46:40
 * @LastEditors:
 * @LastEditTime: 2024-04-02 19:46:40
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */

import request from "@/utils/request";

// 查询聊天管理列表
export function listChat(query) {
  return request({
    url: "/gh/chat/list",
    method: "get",
    params: query,
  });
}
