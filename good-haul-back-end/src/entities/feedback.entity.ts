//特别注意：只要建立实体类，表是可以自动创建的！！！
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Driver } from './driver.entity';
import { Rider } from './rider.entity';
@Entity()
export class Feedback {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: String;

  // @Column()
  // userId: string;

  // @Column()
  // driverId: string;

  @Column()
  userPhone: string;

  @Column()
  content: String;

  @Column()
  feedbackTime: string;

  @Column({ default: "wait-handle" })
  status: string; //wait-handle,handling,handled

  @Column({ nullable: true })
  handleResult: String;

  @Column({ nullable: true })
  handleStaff: String;

  @Column({ nullable: true })
  finishTime: string;

  //这边是主表，会多一个relation id，连接附表的主键ip
  @ManyToOne(() => Driver, driver => driver.feedbacks, { nullable: true })
  driver: Driver;

  @ManyToOne(() => Rider, rider => rider.feedbacks, { nullable: true })
  rider: Rider;

  @ManyToOne(() => User, user => user.feedbacks)
  user: User;
}