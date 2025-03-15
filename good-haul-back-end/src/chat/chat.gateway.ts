import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MongoRepository } from 'typeorm';
import { Chat } from '../core/entityMongo/chat.entity';
import { Injectable, Inject } from '@nestjs/common';
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    @Inject('ChatRepositoryToken')
    private readonly chatRepository: MongoRepository<Chat>,
  ) { }

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // @SubscribeMessage('chatToServer')
  // handleChatToServer(client: Socket, message: { sender: string, receiver: string, message: string }) {
  //   console.log(`Message from ${message.sender} to ${message.receiver}: ${message.message}`);

  //   // 将消息发送给接收者
  //   client.to(message.receiver).emit('chatToClient', message);
  // }

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket): void {
    this.logger.log(`User joined room: ${roomId}`);
    client.join(roomId); // 将用户加入房间
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket): void {
    this.logger.log(`User left room: ${roomId}`);
    client.leave(roomId); // 将用户离开房间
  }

  @SubscribeMessage('chatToRoom')
  async handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      const { chatId, roomId, message } = data;
      this.logger.log(`Received message in room ${roomId}: ${JSON.stringify(message)},chatId:${chatId}`);
      const chat = await this.chatRepository.findOne(chatId);
      // 将新内容添加到content数组中
      if (chat.hasOwnProperty('content')) {
        chat.content = [message, ...chat.content];
      } else {
        chat.content = [message]
      }
      chat.lastChatTime = new Date().toString();
      this.chatRepository.save(chat);
      console.log("发送消息给roomid：", roomId)
      // 发送消息给同一个房间中的其他用户
      client.to(roomId).emit('chatToRoom', message);
      console.log("发送完毕：", message)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException();
    }
  }
}
