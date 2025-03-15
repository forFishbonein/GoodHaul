/*
 * @FilePath: mongo.providers.ts
 * @Author: Aron
 * @Date: 2024-03-19 00:31:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-30 16:45:18
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { createConnection } from 'typeorm';
export const mongoProviders = [
  {
    // Token可以自己设定
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await createConnection({
        type: 'mongodb',
        host: '8.130.52.237',
        port: 27017,
        database: 'goodHaul',
        username: 'goodHaul', // 指定用户名
        password: 'Wtawp5njhCwrbBw3', // 指定密码
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], //TODO 注意这个目录放置结构，entityMongo文件夹只能在其上一层！
      })
  },
];
