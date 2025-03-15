import { Module } from '@nestjs/common';
import { MongoModule } from '../core/mongo/mongo.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderProviders } from './order.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from "../entities/driver.entity"
import { Car } from "../entities/car.entity"
import { Rider } from "../entities/rider.entity"
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
@Module({
  imports: [
    MongoModule,
    /**
     * 如果要在本模块使用如下代码：
     *@InjectRepository(Driver)
      private readonly driverRepository: Repository<Driver>
      那么就必须在本模块注册：TypeOrmModule.forFeature([Driver])
      光在app模块里面注册不行的，只能在那个模块起作用！！！
     */
    TypeOrmModule.forFeature([Driver, Car, Rider, Profile, User]),
  ], // 这里导入进来
  controllers: [OrderController],
  providers: [...OrderProviders, OrderService],
})
export class OrderModule { }
