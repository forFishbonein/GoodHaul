/*
 * @FilePath: config.ts
 * @Author: Aron
 * @Date: 2024-03-18 13:56:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-26 18:24:08
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
// 本地环境配置
export default {
  env: "development",
  title: "开发",
  baseUrl: "", // 项目地址
  baseApi: "http://8.130.52.237:3000", // release发布的aliyun环境（最终要修改为这个）
  // baseApi: "http://192.168.1.86:3000", // 301wifi5
  // baseApi: "http://192.168.1.86:8888", // 301wifi5 代理8888
  // baseApi: "http://192.168.43.127:3000", // 海伦斯热点
  // baseApi: "http://192.168.43.127:8888", // 海伦斯热点 代理8888
  // baseApi: "http://192.168.0.167:3000", // 201
  //这里使用的是ipconfig查出来的ipv4地址，因为android真机需要通过电脑的局域网ip才能请求到本地后端项目，请求localhost不行！
};