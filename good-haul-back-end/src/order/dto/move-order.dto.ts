/*
 * @FilePath: move-order.dto.ts
 * @Author: Aron
 * @Date: 2024-03-12 19:26:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-19 12:35:25
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
export class MoveorderDto {
  userId: string;
  address: Object;
  carType: string;
  distance: number;
  peopleNumber: number;
  price: number;
  remark: string;
  time: string;
  status: string;
}