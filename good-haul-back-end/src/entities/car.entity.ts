/*
 * @FilePath: car.entity.ts
 * @Author: Aron
 * @Date: 2024-03-22 21:16:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-23 19:51:54
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Driver } from './driver.entity';
@Entity()
export class Car {

  @PrimaryGeneratedColumn()
  id: number;

  // @Column({
  //   default: 0
  // })
  // type: string; //0汽车，1电动车

  @Column({ nullable: true })
  carType: string; //只有汽车才有，Small,Middle

  @Column({ nullable: true })
  brand: string; //品牌

  @Column({ nullable: true })
  code: string; //电动车没有车牌号

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  enrollTime: string; //车辆编入时间

  @ManyToOne(() => Driver, driver => driver.cars)
  driver: Driver;

  // @Column({
  //   default: 1
  // })
  // isLeisure: number; //0不是，1不是 //这个字段也没有必要，因为可能多个单都要用一个车，没法限制下来！
}