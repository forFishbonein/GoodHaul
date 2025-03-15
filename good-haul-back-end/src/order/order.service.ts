
import { Injectable, Inject } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Moveorder } from '../core/entityMongo/move-order.entity';
import { MoveorderDto } from './dto/move-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../entities/driver.entity';
import { Rider } from '../entities/rider.entity';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
import { Chat } from '../core/entityMongo/chat.entity';
@Injectable()
export class OrderService {
  constructor(
    // Token要对应 //这是基于Token的依赖注入方法，依赖注入的方式有很多！
    @Inject('MoveOrderRepositoryToken')
    private readonly moveOrderRepository: MongoRepository<Moveorder>,
    @Inject('ChatRepositoryToken')
    private readonly chatRepository: MongoRepository<Chat>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  //TODO 用户端
  // 数据库的操作交给service来提供
  async getAllMoveOrder(): Promise<Moveorder[]> {
    let result = await this.moveOrderRepository.find();
    // console.log(result);
    return result;
  }
  async getAllMoveOrderByUserId(id): Promise<Moveorder[]> {
    let result = await this.moveOrderRepository.find({
      where: {
        userId: id,
      }
    });
    return result;
  }
  async getMoveOrderById(id: string): Promise<any> {
    //@ts-ignore
    let result = await this.moveOrderRepository.findOne(id);

    let userInfo = await this.userRepository.findOne({
      where: {
        id: result.userId
      },
      relations: ["profile"]
    });
    let profile = userInfo.profile
    //@ts-ignore
    result.userName = profile.name ? profile.name : "无"
    let driverInfo = await this.driverRepository.findOne({
      where: {
        id: result.driverId
      }
    });
    //@ts-ignore
    result.driverInfo = driverInfo;
    return result;
  }
  async createOneMoveOrder(moveOrder: MoveorderDto): Promise<any> {
    let onject = {
      ...moveOrder,
      createTime: new Date().toString(),
      updateTime: new Date().toString(),
      serviceType: "move"
    }
    let result = await this.moveOrderRepository.insertOne(onject);
    return result;
  }
  async payMoveOrderDeposit(id: string, paidPrice: number): Promise<any> {
    // let objId = new ObjectId(id); //不能构造ObjectId，也不需要构造，用string进行更新即可！！！
    let result = await this.moveOrderRepository.update(id, { status: "wait-receive", paidPrice: paidPrice, updateTime: new Date().toString() });;
    return result;
  }
  async cancelMoveOrder(id: string): Promise<any> {
    //@ts-ignore
    let status: string = (await this.moveOrderRepository.findOne(id)).status;
    if (status == "wait-paydeposit" || status == "wait-receive") {
      let result = await this.moveOrderRepository.update(id, { status: "canceled", needRefund: 1, updateTime: new Date().toString() });;
      return result;
    } else if (status == "on-way") {//如果司机在路上，那么就不退款了！
      let result = await this.moveOrderRepository.update(id, { status: "canceled", needRefund: 0, updateTime: new Date().toString() });;
      return result;
    } else {
      return null;
    }
  }
  async payMoveOrderRemain(id: string): Promise<any> {
    //@ts-ignore
    let order = (await this.moveOrderRepository.findOne(id));
    let status = order.status;
    let price = order.price;
    let extraPrice = order.extraPrice ? order.extraPrice : 0;
    if (status == "wait-payremain") {
      let result2: any = await this.moveOrderRepository.update(id, { status: "finished", paidPrice: price + extraPrice, completePayTime: new Date().toString(), updateTime: new Date().toString() });
      //这里主要为了的功能，就是美团的，订单已完成，不能继续发送消息
      //TODO 这里还需要去除chat表里面doingOrderId里面的当前orderId
      //order与chat是多对一的关系（一个chat可以针对于多个order
      // console.log("result", order.chatId)
      // console.log("result", order)
      // console.log("result", order.id.toString())
      // console.log("result", typeof order.id.toString())
      if (order) { //TODO 如果之前针对此订单开启了聊天，那么我们就要把那个用户与司机的聊天里面的doingList里面的当前orderid删除！表示此订单已经结束！
        //@ts-ignore
        const chat = await this.chatRepository.findOne(order.chatId); //mongo的findOne就只这样给一个id就行了，不用写where！
        // console.log("chat", chat)
        // if (chat) {
        //@ts-ignore
        chat.doingOrderId = chat.doingOrderId.filter(value => {
          console.log(value, order.id.toString())
          return value != order.id.toString();
        });
        await this.chatRepository.save(chat);
        // }
      }
      return result2;
    } else {
      return null
    }
  }


  //TODO 司机端
  async getGrabableOrder(id: string, type: string): Promise<any> {
    console.log("driverId:" + id)
    if (type == "driver") {
      let driver: any = await this.driverRepository.findOne({ //现在必须加where属性，不然就报错，可能是bug
        where: {
          id: id
        },
        relations: ["cars"]
      });
      let cars = driver?.cars;
      // console.log(driver)
      let carTypes = [...new Set(driver?.cars?.map((e) => {
        return e.carType;
      }))]; //去重。因为一个司机一个类型的车也可能会有多辆，但是一般不会！
      console.log(carTypes)
      // 获取当前时间
      // const currentTime = new Date();
      // 计算2个小时前的时间
      // const oneAndHalfHourAgo = new Date(currentTime.getTime() - (200 * 60 * 60 * 1000)); // 理论上来说任何时间的单我们都应该可以接，所以这里没有必要进行限制
      // 执行查询
      const result = await this.moveOrderRepository.find({
        where: {
          serviceType: "move",
          // time距离当前时间2小时以内
          // time: {
          //   $gte: oneAndHalfHourAgo.toString(), // 将时间转换为字符串（因为time是用字符串形式来存储的，其实本质上最好还是应该用时间戳来存）
          //   $lte: currentTime.toString() // 将时间转换为字符串
          // },
          // time: {
          //   $gte: oneAndHalfHourAgo, // 大于等于2小时前的时间
          //   $lte: currentTime // 小于等于当前时间
          // }
          carType: {
            $in: carTypes //订单要求的车型需要符合司机能够驾驶的车型
          },
          status: "wait-receive" //只能是等待接单类型的才能被接单
        }
      });
      // console.log(result);
      return [result, cars];
    } else if (type == "rider") {
      let rider: any = await this.riderRepository.findOne({ //现在必须加where属性，不然就报错，可能是bug
        where: {
          id: id
        }
      });
      let isLeisure = rider.isLeisure;
      if (isLeisure) {
        // 执行查询
        const result = await this.moveOrderRepository.find({
          where: {
            serviceType: "run"
          }
        });
        console.log(result);
        return result;
      } else {
        return null;
      }
    }
  }

  async getOrderListByDriverId(id: string): Promise<any> {
    // console.log(id)
    // console.log(typeof id) //TODO 注意：查询的时候传递的id类型一定要是正确的，前后端传递的都是string，一般都是需要类型转换的！
    const result = await this.moveOrderRepository.find({
      where: {
        driverId: id,
      }
    });
    // console.log(result);
    return result;
  }

  async receiveOneOrder(orderId: string, driverId: string, carId: number, type: string): Promise<any> {
    // console.log(typeof driverId)
    // console.log(typeof carId)
    // console.log(orderId, driverId, carId, type)
    //@ts-ignore
    let status: string = (await this.moveOrderRepository.findOne(orderId)).status;
    if (status == "wait-receive") {
      if (type == "rider") {
        let result = await this.moveOrderRepository.update(orderId, { status: "on-way", driverId: driverId, updateTime: new Date().toString() });
        return result;
      } else if (type == "driver") {
        //TODO 注意：存储的时候传递的id类型最好也要转换一下，确保要是正确的，否则可能会失败！
        //这里update方法，不存在的属性也会直接创建的，不是非要存在的属性才行！
        let result = await this.moveOrderRepository.update(orderId, { status: "on-way", driverId: driverId, carId: Number(carId), updateTime: new Date().toString() });;
        return result;
      }
    } else if (status == "on-way") {
      return null;
    } else if (status == "canceled") {
      return null;
    }
  }

  async confirmArrive(id: string): Promise<any> {
    console.log(id)
    //@ts-ignore
    let status: string = (await this.moveOrderRepository.findOne(id)).status;
    if (status == "on-way") {
      let result = await this.moveOrderRepository.update(id, { status: "load-transport", updateTime: new Date().toString() });;
      return result;
    } else {
      return null;
    }
  }

  async generateCode(id: string, price: number): Promise<any> {
    console.log(id)
    //@ts-ignore
    let result = (await this.moveOrderRepository.findOne(id));
    let status = result.status;
    let confirmCode = result.confirmCode;
    if (status == "load-transport" && !confirmCode) { //没有收货码才生成！
      let code = Math.floor(Math.random() * 9000) + 1000;
      console.log("收货码：" + code)
      console.log("额外费用：" + price)
      let result = await this.moveOrderRepository.update(id, { extraPrice: price, confirmCode: code, updateTime: new Date().toString() });
      return result;
    } else {
      return null;
    }
  }

  async confirmFinishOrder(id: string, code: string): Promise<any> {
    console.log(id)
    //@ts-ignore
    let result = (await this.moveOrderRepository.findOne(id));
    let status = result.status;
    let confirmCode = result.confirmCode;
    let driverId = result.driverId;
    if (status == "load-transport" && confirmCode == Number(code)) {
      const driver = await this.driverRepository.findOne({
        where: {
          id: driverId
        }
      });
      await this.driverRepository.update(driverId, { finishOrderNumber: Number(driver.finishOrderNumber) + 1, lastFinishTime: new Date().toString() }); //更新，完成货运时间
      let result = await this.moveOrderRepository.update(id, { status: "wait-payremain", finishTime: new Date().toString(), updateTime: new Date().toString() });
      return result;
    } else if (confirmCode != Number(code)) {
      return null;
    } else {
      return null;
    }
  }
}
