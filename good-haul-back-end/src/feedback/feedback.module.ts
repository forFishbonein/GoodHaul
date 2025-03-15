import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from "../entities/driver.entity"
import { Rider } from "../entities/rider.entity"
import { User } from '../entities/user.entity';
import { Feedback } from '../entities/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, Rider, User, Feedback]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService]
})
export class FeedbackModule { }
