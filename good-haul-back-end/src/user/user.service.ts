import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { PasswordService } from "../core/password/password.service"
import { InvalidCredentialsException } from "../core/exception/myException"
@Injectable()
export class UserService {
  constructor(
    @Inject('AliOSSToken')
    private readonly ossClient: any,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly passwordService: PasswordService,
  ) { }
  async getUserProfileById(id): Promise<any> {
    // let result = await this.profileRepository.findOne({ //TODO 不能这样查，只能用主表来连接来查！typeorm不允许通过外键来查询，因为外键没有定义在实体类，只是自动生成在表里了！
    //   where: {
    //     //@ts-ignore
    //     userId: Number(id)
    //   },
    // });
    let result = await this.userRepository.findOne({
      where: {
        id: id
      },
      relations: ["profile"]
    });
    return result.profile;
  }

  async modifyName(name, id): Promise<any> {
    /**
     * 方法一：
     *使用 userId 查询 User 实体对象
     */
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }, relations: ['profile']
    });
    // 现在你可以访问 user 的 profile 属性，以及 profile 的字段
    user.profile.name = name; // 更新 profile 表中的 name 字段
    // 保存更新后的 User 实体对象
    // let result = await this.userRepository.save(user); //这样是不能修改成功的，还是要专门用profileRepository修改才行！
    let result = await this.profileRepository.save(user.profile);
    //方法二：
    // 使用 createQueryBuilder() 创建一个查询构建器
    // let result = await this.userRepository.createQueryBuilder()
    //   .update()
    //   //@ts-ignore
    //   .set({ 'profile.name': name }) //这个方法不行，因为没有把profile.name显示定义出来！
    //   .where('user.id = :id', { id: id })
    //   .execute()
    return result;
  }

  async modifyGender(gender, id): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }, relations: ['profile']
    });
    // 现在你可以访问 user 的 profile 属性，以及 profile 的字段
    user.profile.gender = gender; // 更新 profile 表中的 name 字段
    // 保存更新后的 User 实体对象
    // let result = await this.userRepository.save(user);
    let result = await this.profileRepository.save(user.profile);
    return result;
  }

  async modifySign(sign, id): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }, relations: ['profile']
    });
    // 现在你可以访问 user 的 profile 属性，以及 profile 的字段
    user.profile.sign = sign; // 更新 profile 表中的 name 字段
    console.log(sign)
    // 保存更新后的 User 实体对象
    // let result = await this.userRepository.save(user);
    let result = await this.profileRepository.save(user.profile);
    return result;
  }
  getContentBeforeQuestionMark(url) {
    const questionMarkIndex = url.indexOf('?');
    if (questionMarkIndex !== -1) {
      return url.substring(0, questionMarkIndex);
    }
    return url;
  }

  async getStsUrlAndModifyAvatar(name: string, id): Promise<any> {
    console.log(name)
    // 生成文件的签名URL
    // name:"examplefile.txt"
    const url = this.ossClient.signatureUrl(name, {
      method: "PUT",
      "Content-Type": "text/plain",
    });
    let link = this.getContentBeforeQuestionMark(url)
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }, relations: ['profile']
    });
    user.profile.avatar = link;
    // console.log(user)
    // await this.userRepository.save(user);
    let result = await this.profileRepository.save(user.profile);
    console.log(url);
    return url;
  }

  async checkIfHavePassword(id): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });
    if (user.password) {
      return true;
    } else {
      return false;
    }
  }

  async modifyPasword(prePassword, newPassword, id): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });
    console.log(prePassword)
    console.log(user.password)
    if (this.passwordService.comparePasswords(prePassword, user.password)) {
      user.password = await this.passwordService.hashPassword(newPassword);
      let result = await this.userRepository.save(user);
      return result;
    } else {
      throw new InvalidCredentialsException("旧密码不正确！");
    }
  }
}
