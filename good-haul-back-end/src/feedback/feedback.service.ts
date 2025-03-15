import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../entities/driver.entity';
import { Rider } from '../entities/rider.entity';
import { User } from '../entities/user.entity';
import { Feedback } from './../entities/feedback.entity';
@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) { }
  // 数据库的操作交给service来提供
  async createOneFeedback(orderId: string, userId: string, driverId: string, userPhone: string, content: string): Promise<any> {
    //没注册过那就直接注册！
    const feedback = new Feedback();
    let user: any = await this.userRepository.findOne({
      where: {
        id: userId
      },
    });
    let driver: any = await this.driverRepository.findOne({
      where: {
        id: driverId
      },
    });
    feedback.orderId = orderId;
    feedback.userPhone = userPhone;
    feedback.content = content;
    feedback.feedbackTime = new Date().toString();
    feedback.user = user;
    feedback.driver = driver;
    let result = await this.feedbackRepository.save(feedback); //result就是我们新插入的feedback对象
    return result;
  }
}
