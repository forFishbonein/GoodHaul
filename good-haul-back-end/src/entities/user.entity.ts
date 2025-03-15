/*
 * @FilePath: user.entity.ts
 * @Author: Aron
 * @Date: 2024-03-22 21:12:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-21 23:57:03
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Index, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Feedback } from './feedback.entity';
@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid') //TODO 因为要涉及两种角色的聊天，所以他们的id一定不能重复，不然没有办法区分角色！！！
  id: string;

  /*
    确保在查询涉及到的列上创建了适当的索引，特别是在连接条件、WHERE 子句中经常使用的列上创建索引，可以大大提高查询性能。
    注意不要过度索引，过多的索引会增加写操作的开销，并可能导致性能下降。
  */
  @Index()
  @Column({
    length: 11,
  })
  phone: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  lastLoginTime: String;

  @Column({ nullable: true })
  passwordUpdateTime: String;

  @Column({ nullable: true })
  accountCreateTime: String;

  @Column({ default: "user" }) //这里没啥用，主要是为了区分
  type: String

  //因为有JoinColumn，所以这边是主表，会多一个relation id，连接附表的主键ip
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Feedback, feedback => feedback.user)
  feedbacks: Feedback[];
}

/*
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Hobby {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.hobbys)
  user: User;
}
*/