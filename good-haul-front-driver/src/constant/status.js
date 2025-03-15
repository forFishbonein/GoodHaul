/*
 * @FilePath: status.js
 * @Author: Aron
 * @Date: 2024-03-20 21:22:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-23 23:57:50
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
export let orderStatus = {
  'wait-paydeposit': '待支付订金',
  'wait-receive': '等待接单',
  'on-way': '司机正在赶来',
  'load-transport': '正在装载运输',
  'wait-payremain': '待支付尾款',
  finished: '已结束',
  canceled: '已取消',
};

export let orderStatusDriver = {
  'on-way': '正在路上',
  'load-transport': '正在装载运输',
  'wait-payremain': '已结束',
  finished: '已结束',
  canceled: '已被取消',
};