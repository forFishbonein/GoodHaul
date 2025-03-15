/*
 * @FilePath: chat.providers.ts
 * @Author: Aron
 * @Date: 2024-03-29 15:15:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-29 18:30:16
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
/*
 * @FilePath: order.providers.ts
 * @Author: Aron
 * @Date: 2024-03-19 00:52:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-25 20:35:25
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { Connection, getMongoRepository } from 'typeorm';
import { Chat } from '../core/entityMongo/chat.entity';
import { Moveorder } from '../core/entityMongo/move-order.entity';

//这个就相当于整个模块的数据库连接池，一个连接对象工厂，通过提供token的方式进行依赖注入
export const ChatProviders = [
  {
    // Token可以自己设定
    provide: 'ChatRepositoryToken',
    // entity定义的数据实体
    useFactory: (connection: Connection) => connection.getMongoRepository(Chat),
    inject: ['DbConnectionToken'],
  },
  {
    // Token可以自己设定
    provide: 'MoveOrderRepositoryToken',
    // entity定义的数据实体
    useFactory: (connection: Connection) => connection.getMongoRepository(Moveorder),
    inject: ['DbConnectionToken'],
  },
];