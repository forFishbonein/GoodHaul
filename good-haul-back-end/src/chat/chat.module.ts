import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
// import { SocketModule } from '@nestjs/websockets';
import { ChatGateway } from './chat.gateway';
import { MongoModule } from '../core/mongo/mongo.module';
import { ChatProviders } from './chat.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from "../entities/driver.entity"
import { User } from '../entities/user.entity';

@Module({
  imports: [
    MongoModule,
    TypeOrmModule.forFeature([Driver, User]),
  ],
  controllers: [ChatController],
  providers: [...ChatProviders, ChatService, ChatGateway]
})
export class ChatModule { }
