/*
 * @FilePath: jwt.middleware.ts
 * @Author: Aron
 * @Date: 2024-03-24 18:09:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-28 17:40:44
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
// jwt.middleware.ts
import { Injectable, NestMiddleware, Inject, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';
import { config } from "../../auth/config"
import { TokenExpirationException, NotLoginException } from "../exception/myException"

//TODO 注意：这里有一个重大的意义，就是·后端鉴权·，不能说传个订单号过来我们就把订单给取消了，这样对于系统和用户来说非常不安全！！！
//TODO 必须得是一个登录的且我们有记录的用户，才能让这个请求继续，否则就拦截，当然要排除所有登录注册和获得短信验证码的接口！
//TODO 注意：这里鉴权主要指的是鉴别有没有在我们这个平台登录，token对不对！
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
    private readonly jwtService: JwtService,
  ) { }

  async use(req: any, res: any, next: () => void) {
    console.log("开始鉴权：", req.originalUrl)
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        //TODO 现在解码必须写secret属性！
        const decoded = this.jwtService.verify(token, { secret: config.SECRET_KEY }); //解码token，得到用户信息，尤其是id！
        if (!decoded) {
          throw new UnauthorizedException();//这是401，这里抛出了就不会走下面的catch了！
        }
        // //判断token是否过期的逻辑
        // 注意：是否过期会在verify的时候自动判断，没必要自己写！
        // const expirationTime = decoded.exp * 1000;
        // const currentTime = Date.now();
        // if (currentTime > expirationTime) {
        //   await this.redisClient.del(`user:${decoded.sub}`); //在redis中删除信息
        //   throw new TokenExpirationException("登录已过期，请重新登陆！"); //登录过期，这里抛出了就不会走下面的catch了！
        // }
        // console.log(decoded)
        // 从 Redis 中获取用户信息
        let user: string;
        if (decoded.type == "driver") {
          user = await this.redisClient.get(`driver:${decoded.sub}`);
        } else if (decoded.type == "user") {
          user = await this.redisClient.get(`user:${decoded.sub}`);
        }
        if (user) {
          req.user = JSON.parse(user);
          // 将用户信息存储到请求对象中，不管是driver还是user都会被保存为user属性！自己取对应属性即可！
          console.log("鉴权通过：", req.originalUrl)
          next();
        } else {
          throw new TokenExpirationException("token无效，请重新登陆！");
        }
      } catch (error) {
        console.log("JWT invalid or user not found in Redis", error)
        // JWT 无效或 Redis 获取用户信息失败
        // throw new InternalServerErrorException(); //这是系统错误500
        throw new TokenExpirationException("登录已过期，请重新登陆！");
      }
    }
    else {
      console.log("鉴权不通过：", req.originalUrl)
      throw new NotLoginException("未登录，请先登陆！"); //TODO 用后端结合全局axios来主导前端的鉴权！更统一更全面！方便管理和开发！
    }
    //  else {
    //   console.log('Token not provided'); //我们要做到鉴权，所以没有token的就是权限不通过，不能next！
    //   next();
    // }
  }
}
