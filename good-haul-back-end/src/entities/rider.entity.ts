import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Feedback } from './feedback.entity';
@Entity()
export class Rider {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  account: string;

  @Column()
  password: string;

  @Column()
  name: String;

  @Column()
  phone: String;

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

  @Column({
    default: 1
  })
  isLeisure: number; //0不是空闲的，1是空闲的

  @Column({ default: "rider" })
  driverType: String

  @Column({ default: "driver" })
  type: String

  @Column({ nullable: true })
  brand: string; //电动车品牌

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  enrollTime: string; //车辆编入时间

  @OneToMany(() => Feedback, feedback => feedback.rider)
  feedbacks: Feedback[];
}