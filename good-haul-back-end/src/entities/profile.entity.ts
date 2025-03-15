/*
 * @FilePath: profile.entity.ts
 * @Author: Aron
 * @Date: 2024-03-22 21:13:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-27 20:28:14
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Profile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  name: string; //昵称

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  sign: string;

  @OneToOne(() => User, user => user.profile) // 将另一面指定为第二个参数
  user: User;
}