import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { createConnection, Connection } from "typeorm";
// import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './core/mongo/mongo.module';
import { DriverModule } from './driver/driver.module';
import { User } from "./entities/user.entity"
import { Profile } from "./entities/profile.entity"
import { Car } from "./entities/car.entity"
import { Driver } from "./entities/driver.entity"
// import { OrderService } from "./order/order.service" //不需要注册到app，因为order有自己的模块！
// import { OrderController } from "./order/order.controller"
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './core/password/password.module';
import { RedisModule } from './core/redis/redis.module';
import { JwtMiddleware } from './core/middleware/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AllExceptionsFilter } from './core/filter/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { config } from "./auth/config"
// import { DriverController } from './driver/driver.controller';
// import { UserController } from './user/user.controller';
// import { AuthController } from './auth/auth.controller';
import { OrderController } from './order/order.controller';
import { UserController } from './user/user.controller';
import { DriverController } from './driver/driver.controller';
import { FeedbackController } from './feedback/feedback.controller';
import { ChatController } from './chat/chat.controller';
import { ProxyService } from "./proxy.service"
import { ConnectionOptions } from 'typeorm';
import { FeedbackModule } from './feedback/feedback.module';
import { ChatModule } from './chat/chat.module';
import { OssModule } from './core/oss/oss.module';
const dbConfig: ConnectionOptions = {
  port: 3306,
  type: 'mysql',
  username: 'goodHaul',
  host: '8.130.52.237',
  charset: 'utf8mb4',
  password: 'LmyprieREtcyAdmC',
  database: 'goodhaul',
  synchronize: true, //同步实体到数据库，需要开启
  // autoLoadEntities: true, //免注册实体，否则每个实体都必须要注册（不管用）
  entities: ['dist/entities/**/*.entity{.ts,.js}'], //TODO 注意：entities文件夹里面不能放mongo的对象，否则会被识别然后出错！
  extra: {
    connectionLimit: 20, // 连接池大小，默认为 10
    waitForConnections: true, // 当连接池用尽时，是否等待连接，默认为 true
    queueLimit: 0, // 连接池未满时，请求队列中的最大请求数，默认为 0 表示无限制
  },
};
@Module({
  imports: [TypeOrmModule.forRoot(dbConfig),
    // MongooseModule.forRoot('mongodb://goodHaul:Wtawp5njhCwrbBw3@8.130.52.237:27017/goodHaul'),
    // TypeOrmModule.forFeature([User, Profile, Car, Driver]), //实体必须要注册！！但是只是在本模块用Repository的时候才需要
    UserModule,
    OrderModule,
    MongoModule,
    DriverModule,
    CarModule,
    AuthModule,
    PasswordModule,
    RedisModule,
    JwtModule,
    FeedbackModule,
    ChatModule,
    OssModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ProxyService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      // .exclude( //需要排除所有的登录相关路由！/不管用
      //   // { path: '/auth/**', method: RequestMethod.ALL }, // 排除以 /auth 开头的所有路由
      //   // { path: '/user/**', method: RequestMethod.ALL }, // 排除以 /user 开头的所有路由
      //   // { path: '/driver/**', method: RequestMethod.ALL }, // 排除以 /driver 开头的所有路由
      //   'driver/(.*)',
      //   'user/(.*)',
      // )
      .forRoutes(
        OrderController,
        // { path: '/user/logout', method: RequestMethod.GET }, //登出需要鉴权！
        // { path: '/driver/logout', method: RequestMethod.GET }
        UserController,
        DriverController,
        FeedbackController,
        ChatController
      );
  }
}
