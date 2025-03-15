// import { JwtMiddleware } from './../middleware/jwt.middleware';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from "./config"
import { RedisModule } from '../core/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from "../entities/car.entity"
import { Driver } from "../entities/driver.entity"
import { User } from "../entities/user.entity"
import { SMSProviders } from "./sms.providers"
@Module({
  imports: [
    JwtModule.register({
      secret: config.SECRET_KEY, // 用于加密 JWT 的密钥，请替换为你自己的密钥
      signOptions: { expiresIn: config.EXPIRES.JWT }, // 过期时间，这里设置为 1 小时
    }),
    RedisModule,
    TypeOrmModule.forFeature([Driver, Car, User]),
  ],
  providers: [
    AuthService,
    ...SMSProviders
  ],
  controllers: [AuthController],
  exports: [AuthService] //为了让导入auth的模块可以使用里面的authservice！
})
export class AuthModule { }
