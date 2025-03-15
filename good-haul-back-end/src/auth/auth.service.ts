import { Injectable, UnauthorizedException, Inject, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Driver } from '../entities/driver.entity';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from "../core/password/password.service"
import { Redis } from 'ioredis';
import { config } from "./config"
import { InvalidCredentialsException, CodeErrorException } from "../core/exception/myException"
import Dysmsapi, * as $Dysmsapi from '@alicloud/dysmsapi20170525';
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import Console from '@alicloud/tea-console';
import Util from '@alicloud/tea-util';
import Time from '@darabonba/time';
import String from '@alicloud/darabonba-string';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
    @Inject('ALiYunSMSToken')
    private readonly smsClient: Dysmsapi20170525,
  ) { }
  // 司机验证逻辑
  async validateDriver(account: string, password: string): Promise<any> {
    let driver: any = await this.driverRepository.findOne({
      where: {
        account: account
      },
      relations: ["cars"]
    });
    if (!driver) {
      throw new InvalidCredentialsException('账号不存在！'); //账号不存在
    } else {
      // 从 Redis 中获取用户信息
      const user = await this.redisClient.get(`driver:${driver.id}`);
      if (user) {
        throw new InvalidCredentialsException('您已登录，请不要重复登录！'); //已登录
      } else {
        if (account === driver.account && await this.passwordService.comparePasswords(password, driver.password)) {
          await this.driverRepository.update(driver.id, { lastLoginTime: new Date().toString() }); //更新，登录时间！
          const token = this.jwtService.sign({ account: driver.account, sub: driver.id, type: "driver" }); //本质上这里存的account也没啥大用，主要是id！
          // console.log(token)
          // 将用户信息存储到 Redis 中
          /**
           * TODO 在jwt结合redis中，有没有必要把token也存到redis中呢？
           * 在使用 JWT 结合 Redis 进行用户认证时，通常情况下不需要将 JWT 令牌本身存储到 Redis 中。因为 JWT 本身是一种无状态的认证方式，
           * 它的特点是令牌中包含了用户的身份信息以及签名信息，服务端可以通过验证签名来验证令牌的合法性，而不需要在服务端存储令牌本身。
  
            但是，你可以将用户的一些相关信息存储到 Redis 中，以便在需要的时候快速地获取。例如，你可以将用户的权限信息、登录时间、
            最后一次操作时间等存储到 Redis 中，以实现更细粒度的权限控制或其他业务逻辑（因为jwt只存储了id信息，大量的其他信息是在redis里面的！）。
  
            总的来说，将用户的相关信息存储到 Redis 中是有意义的，但将 JWT 令牌本身存储到 Redis 中并不是必须的。
            JWT 本身已经包含了足够的信息来进行身份认证和授权，不需要额外存储到 Redis 中。
           *
           */
          await this.redisClient.setex(`driver:${driver.id}`, config.EXPIRES.REDIS, JSON.stringify(driver));
          // this.redisClient.quit(); //不需要
          delete driver.password //密码不能返回！
          return { token, driver }; // 返回用户信息
        } else {
          throw new InvalidCredentialsException('密码错误！');
        }
      }
    }
  }
  // 司机退出登录逻辑
  async logoutDriver(id): Promise<any> {
    if (id) {
      await this.redisClient.del(`driver:${id}`); //在redis中删除信息
    }
  }

  // 用户验证逻辑（验证码登录）
  async validateUserCode(phone: string, code: string): Promise<any> {
    console.log(phone, code)
    let user: any = await this.userRepository.findOne({
      where: {
        phone: phone
      },
      relations: ["profile"]
    });
    if (!user) {
      // throw new InvalidCredentialsException('账号不存在！');
      //没注册过那就直接注册！
      const userNew = new User();
      userNew.phone = phone;
      userNew.accountCreateTime = new Date().toString();
      userNew.lastLoginTime = new Date().toString();
      // 创建空的 Profile 实体，需要有一个关联的个人信息！
      const newProfile = new Profile();
      userNew.profile = newProfile;
      let result = await this.userRepository.save(userNew); //result就是我们新插入的user对象
      let lastElement = await this.redisClient.lrange(`phone:${phone}`, -1, -1);
      let codeRedis = lastElement[0];
      if (codeRedis) {
        if (code == codeRedis) {
          const token = this.jwtService.sign({ phone: result.phone, sub: result.id, type: "user" });
          await this.redisClient.setex(`user:${result.id}`, config.EXPIRES.REDIS, JSON.stringify(result));
          return { token, result, type: "newRegister" }; // 返回用户信息
        } else if (code != codeRedis) {
          throw new CodeErrorException("验证码错误！");
        }
      } else {
        throw new CodeErrorException("验证码已过期！");
      }
    } else {
      // 从 Redis 中获取用户信息
      const userRedis = await this.redisClient.get(`user:${user.id}`);
      if (userRedis) { //TODO 这里可以不要限制，可以重新登陆，要不然不方便测试和用户
        throw new InvalidCredentialsException('您已登录，请不要重复登录！'); //已登录
      } else {
        // 使用 rpop 命令从列表的末尾取出一个元素（会修改数据库
        // let codeRedis = await this.redisClient.rpop(`phone:${phone}`)
        // 使用 LRANGE 命令查询列表的最后一个元素
        let lastElement = await this.redisClient.lrange(`phone:${phone}`, -1, -1);
        // 获取到了最后一个元素
        let codeRedis = lastElement[0];
        if (codeRedis) {
          // 假设这是一个简单的示例，验证用户名和密码是否匹配
          if (phone === user.phone && code == codeRedis) {
            await this.userRepository.update(user.id, { lastLoginTime: new Date().toString() }); //更新，登录时间！
            const token = this.jwtService.sign({ phone: user.phone, sub: user.id, type: "user" });
            await this.redisClient.setex(`user:${user.id}`, config.EXPIRES.REDIS, JSON.stringify(user));
            // this.redisClient.quit(); //不需要
            delete user.password //密码不能返回！
            return { token, user }; // 返回用户信息
          } else if (code != codeRedis) {
            throw new CodeErrorException("验证码错误！");
          }
        } else {
          throw new CodeErrorException("验证码已过期！");
        }
      }
    }
  }

  // 用户验证逻辑（密码登录）
  async validateUserPassword(phone: string, password: string): Promise<any> {
    let user: any = await this.userRepository.findOne({
      where: {
        phone: phone
      },
      relations: ["profile"]
    });
    if (!user) {
      throw new InvalidCredentialsException('账号不存在！'); //账号不存在
    } else {
      // 从 Redis 中获取用户信息
      const userRedis = await this.redisClient.get(`user:${user.id}`);
      if (userRedis) {
        throw new InvalidCredentialsException('您已登录，请不要重复登录！'); //已登录
      } else {
        // 假设这是一个简单的示例，验证用户名和密码是否匹配
        if (user.password) {
          if (phone === user.phone && await this.passwordService.comparePasswords(password, user.password)) {
            await this.userRepository.update(user.id, { lastLoginTime: new Date().toString() }); //更新，登录时间！
            const token = this.jwtService.sign({ phone: user.phone, sub: user.id, type: "user" });
            await this.redisClient.setex(`user:${user.id}`, config.EXPIRES.REDIS, JSON.stringify(user));
            // this.redisClient.quit(); //不需要
            delete user.password //密码不能返回！
            return { token, user }; // 返回用户信息
          } else {
            throw new InvalidCredentialsException('密码错误！');
          }
        } else {
          throw new InvalidCredentialsException('未设置密码，请使用验证码登录！'); //账号不存在
        }
      }
    }
  }
  // 用户退出登录逻辑
  async logoutUser(id): Promise<any> {
    if (id) {
      await this.redisClient.del(`user:${id}`); //在redis中删除信息
    }
  }

  //根据手机号发送验证码
  async sendSMSCode(phone: string) {
    console.log("手机号：" + phone)
    try {
      // 生成随机的四位数验证码
      const number = Math.floor(1000 + Math.random() * 9000);
      let numberString = number.toString();
      console.log("验证码：" + number)
      // 1.发送短信
      let sendReq = new $Dysmsapi.SendSmsRequest({
        phoneNumbers: phone,
        signName: '好运来',
        templateCode: 'SMS_465408369',
        templateParam: JSON.stringify({ "code": numberString }) //必须是JSON格式，否则报错！
      });
      //sendSms方法：发送前请申请短信签名和短信模板，并确保签名和模板已审核通过。
      let sendResp = await this.smsClient.sendSms(sendReq);
      let code = sendResp.body.code;
      if (!Util.equalString(code, "OK")) {
        Console.log(`错误信息: ${sendResp.body.message}`);
        throw new InternalServerErrorException(); //500
      } else {
        // 开启 Redis 事务
        const transaction = this.redisClient.multi();
        // 将元素添加到列表的末尾（如果没有这个key会自动创建的）
        transaction.rpush(`phone:${phone}`, numberString);
        // 设置键的过期时间为5分钟
        transaction.expire(`phone:${phone}`, config.EXPIRES.CODEREDIS);
        // 执行事务
        await transaction.exec()

        return true;//意味着发送成功
      }

      //TODO 下面这里是测试用，不真实发短信
      // // 开启 Redis 事务
      // const transaction = this.redisClient.multi();
      // // 将元素添加到列表的末尾（如果没有这个key会自动创建的）
      // transaction.rpush(`phone:${phone}`, numberString);
      // // 设置键的过期时间为5分钟
      // transaction.expire(`phone:${phone}`, config.EXPIRES.CODEREDIS);
      // // 执行事务
      // await transaction.exec()
      // return true;//意味着发送成功

      // 下面这些代码先不要了，这个代码没什么实际价值
      // let bizId = sendResp.body.bizId;
      // // 2. 等待 10 秒后查询结果
      // await Util.sleep(10000);
      // // 3.查询结果
      // let phoneNums = String.split(phone, ",", -1);

      // for (let phoneNum of phoneNums) {
      //   let queryReq = new $Dysmsapi.QuerySendDetailsRequest({
      //     phoneNumber: Util.assertAsString(phoneNum),
      //     bizId: bizId,
      //     sendDate: Time.format("yyyyMMdd"),
      //     pageSize: 10,
      //     currentPage: 1,
      //   });
      //   let queryResp = await this.smsClient.querySendDetails(queryReq);
      //   let dtos = queryResp.body.smsSendDetailDTOs.smsSendDetailDTO;
      //   // 打印结果

      //   for (let dto of dtos) {
      //     if (Util.equalString(`${dto.sendStatus}`, "3")) {
      //       Console.log(`${dto.phoneNum} 发送成功，接收时间: ${dto.receiveDate}`);
      //     } else if (Util.equalString(`${dto.sendStatus}`, "2")) {
      //       Console.log(`${dto.phoneNum} 发送失败`);
      //     } else {
      //       Console.log(`${dto.phoneNum} 正在发送中...`);
      //     }

      //   }
      // }
    } catch (error) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      // 错误 message
      console.log(error?.message);
      // 诊断地址
      console.log(error?.data?.Recommend);
      throw new InternalServerErrorException(); //500
    }
  }
}