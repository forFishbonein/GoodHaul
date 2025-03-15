import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from "../auth/auth.module"
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { OssModule } from '../core/oss/oss.module';
@Module({
  imports: [
    OssModule,
    AuthModule,
    TypeOrmModule.forFeature([User, Profile])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
