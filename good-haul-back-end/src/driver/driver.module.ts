import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { AuthModule } from "../auth/auth.module"
import { Driver } from '../entities/driver.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Driver])
  ],
  controllers: [DriverController],
  providers: [DriverService]
})
export class DriverModule { }
