import { Profile } from './../entities/profile.entity';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Chat } from '../core/entityMongo/chat.entity';
import { Moveorder } from '../core/entityMongo/move-order.entity';
const { v4: uuidv4 } = require('uuid');
import { User } from '../entities/user.entity';
import { Driver } from '../entities/driver.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ChatService {
  constructor(
    @Inject('MoveOrderRepositoryToken')
    private readonly moveOrderRepository: MongoRepository<Moveorder>,
    @Inject('ChatRepositoryToken')
    private readonly chatRepository: MongoRepository<Chat>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) { }
  //检查用户和司机之间是否有过聊天：如果有，那么看看doinglist里面有没有当前聊天，如果没有那就加里面
  async checkIfHaveChat(driverId: string, userId: string, orderId: string): Promise<any> {
    console.log(driverId)
    console.log(userId)
    let result = await this.chatRepository.findOne(
      {
        where: {
          // user: { id: userId },
          // driver: { id: driverId }
          'user.id': { $eq: userId },
          'driver.id': { $eq: driverId }
        }
      }
    );
    console.log("已有的聊天:", result)
    if (result) {
      if (!(result.doingOrderId.includes(orderId))) { //TODO 如果之前针对此订单开启了聊天，那么我们就要把那个用户与司机的聊天里面的doingList里面的当前orderid删除！表示此订单已经结束！
        result.historyOrderId = [...result.historyOrderId, orderId.toString()] //记录orderId
        result.doingOrderId = [...result.doingOrderId, orderId.toString()]
        await this.chatRepository.save(result);
        await this.moveOrderRepository.update(orderId, { chatId: String(result.id) }); //记录chatId
      }
      return result.id
    } else {
      return null;
    }
  }
  //创建聊天的时候要给order加chatId，还要查一下driver的phone name，user的phone name也要加入里面，否则查起来不方便！
  async createOneChat(driverId: string, userId: string, orderId: string): Promise<any> {
    let user = await this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: ['profile']
    });
    let driver = await this.driverRepository.findOne({
      where: {
        id: driverId
      }
    });

    const uuid = uuidv4();
    let object = {
      roomId: uuid,
      historyOrderId: [orderId],
      doingOrderId: [orderId],
      user: {
        id: user.id,
        phone: user.phone,
        name: user.profile.name,
        avatar: user.profile.avatar,
      },
      driver: {
        id: driver.id,
        phone: driver.phone,
        name: driver.name
      },
      content: [],
      chatCreateTime: new Date().toString(),
    }
    let result: any = await this.chatRepository.insertOne(object);
    await this.moveOrderRepository.update(orderId, { chatId: String(result.insertedId) }); //记录chatId，注意是insertedId不是insertId
    let chat = await this.chatRepository.findOne(result.insertedId); //注意是insertedId不是insertId
    console.log(chat)
    return chat;
  }

  //根据id查询内容
  async getChatContentByChatId(id: string): Promise<any> {
    //@ts-ignore
    let result = await this.chatRepository.findOne(id);
    // console.log(result) //不要打开，东西太多了！
    return result;
  }

  //根据用户id查询列表
  async getChatList(id: string, type: string): Promise<any> {
    // console.log(id)
    if (type == "user") {
      //@ts-ignore
      let result = await this.chatRepository.find({
        where: {
          'user.id': { $eq: id },
        }
      });
      for (let i = 0; i < result.length; i++) {
        let driver = await this.driverRepository.findOne({
          where: {
            id: result[i].driver.id
          }
        });
        result[i].driver.name = driver.name;
        result[i].driver.phone = driver.phone;
      }
      return result;
    } else if (type == "driver") {
      //@ts-ignore
      let result = await this.chatRepository.find({
        where: {
          'driver.id': { $eq: id },
        }
      });
      // console.log("result", result)
      for (let i = 0; i < result.length; i++) {
        let user = await this.userRepository.findOne({
          where: {
            id: result[i].user.id
          }, relations: ['profile']
        });
        result[i].user.name = user.profile.name;
        result[i].user.phone = user.phone;
        result[i].user.avatar = user.profile.avatar;
      }
      return result;
    }
  }
}
