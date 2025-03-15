/*
 * @FilePath: driver.entity.ts
 * @Author: Aron
 * @Date: 2024-03-22 21:16:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-06 00:03:21
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
//特别注意：只要建立实体类，表是可以自动创建的！！！
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Car } from './car.entity';
import { Feedback } from './feedback.entity';
@Entity()
export class Driver {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  /*
    TODO 性能优化：确保在查询涉及到的列上创建了适当的索引，特别是在连接条件、WHERE 子句中经常使用的列上创建索引，可以大大提高查询性能。
    注意不要过度索引，过多的索引会增加写操作的开销，并可能导致性能下降。
  */
  @Index()
  @Column()
  account: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column(
    { default: 1001 } //暂时默认1001单初始
  )
  finishOrderNumber: number;

  @Column({ nullable: true })
  lastLoginTime: String;

  @Column({ nullable: true })
  lastFinishTime: String; //上次完成货运的时间

  @Column()
  accountCreateTime: String;

  @Column({ default: "driver" })
  driverType: String

  @Column({ default: "driver" })
  type: String

  @OneToMany(() => Car, car => car.driver)
  cars: Car[];

  @OneToMany(() => Feedback, feedback => feedback.driver)
  feedbacks: Feedback[];
}