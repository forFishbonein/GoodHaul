/*
 * @FilePath: getDistance.js
 * @Author: Aron
 * @Date: 2024-03-17 16:18:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-23 17:30:09
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
// 定义计算距离的函数
export default function getDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // 地球半径，单位：公里
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c; // 距离，单位：公里
  return distance;
}
