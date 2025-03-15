import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';


interface Latlng {
  lat:number;
  lng:number
}
interface AddressItem{
  latlng:Latlng,
  poiaddress:string,
  poiname:string,
  cityname:string,
  phone:string,
  door:number,
  floor:number
}
interface Address {
  out: AddressItem,
  in: AddressItem
}
@Entity()
export class Moveorder {
  @ObjectIdColumn() id: ObjectId;
  @Column() userId: string;
  @Column() chatId: string;
  @Column() address: Object;
  @Column() carType: string; //这个run订单没有
  @Column() distance: number;
  @Column() peopleNumber: number; //这个run订单没有
  @Column() price: number;
  @Column() remark: string;
  @Column() time: string; //这个run订单没有
  @Column() status: string;
  @Column() driverId: string;
  @Column() carId: number; //mongo里面没有非不非空的要求，不用写！
  @Column() confirmCode: number;
  @Column() createTime: string;
  @Column() updateTime: string;
  @Column() extraPrice: number; //过路费等费用 //这个run订单没有
  @Column() serviceType: string;
  @Column() paidPrice: number; //这个run订单没有
  @Column() finishTime: string; //确认完收货码
  @Column() completePayTime: string; //完成所有支付
  @Column() needRefund: number; //0不需要，1需要
}