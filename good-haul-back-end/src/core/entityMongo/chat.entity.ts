import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

interface Member {
  _id: string, //用户或者司机的id
  avatar: string, //这个是固定的，直接在前端进行指定
  name: string
}
interface User {
  id: string, //用户id
  phone: string,
  name: string,
  avatar: string,
}
interface Driver {
  id: string, //司机id
  phone: string,
  name: string
}
interface ContentItem {
  _id: string;
  text: string;
  createdAt: string; //当前消息发送的时间
  user: Member //这里是泛指的用户或者司机
}
@Entity()
export class Chat {
  @ObjectIdColumn() id: ObjectId;
  @Column() roomId: string;
  //不是根据订单来对应的，而是一位用户对一位司机，不管之间进行了多少单！但是可以存储一下orderId
  @Column() historyOrderId: Array<string>;
  @Column() doingOrderId: Array<string>;
  @Column() user: User;
  @Column() driver: Driver;
  // @Column() isOpen: number; //判断标准是是否有订单正在进行中（前端判断即可），也就是doingOrderId长度是否大于0
  @Column() content: ContentItem[];
  @Column() lastChatTime: string;
  @Column() chatCreateTime: string;
}