
import { ChatService } from './chat.service';
import { Controller, Get, Post, Body, Param, Query, Req } from '@nestjs/common';
@Controller('chat')
export class ChatController {
  //checkIfHaveChat, createOneChat, getChatContentByChatId, getChatList
  //注入依赖关系
  constructor(private chatService: ChatService) { }
  @Post("/if")
  async checkIfHaveChat(@Body() params, @Req() req: any): Promise<any> {
    try {
      let userId = req.user.id;
      let chatId = await this.chatService.checkIfHaveChat(params.driverId, userId, params.orderId);
      if (chatId) {
        return {
          code: 0, data: {
            chatId: chatId
          }
        };
      } else {
        return {
          code: 0, data: {
            chatId: null
          }
        };
      }

    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }
  @Post("/create")
  async createOneChat(@Body() params, @Req() req: any): Promise<any> {
    try {
      let userId = req.user.id;
      let chatContent = await this.chatService.createOneChat(params.driverId, userId, params.orderId);
      return {
        code: 0, data: {
          chatContent: chatContent
        }
      };
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }

  @Get("/content/:id")
  async getChatContentByChatId(@Param('id') id): Promise<any> {
    try {
      let chatContent = await this.chatService.getChatContentByChatId(id);
      return {
        code: 0, data: {
          chatContent: chatContent
        }
      };
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }

  @Get("/list")
  async getChatList(@Req() req: any): Promise<any> {
    try {
      let userId = req.user.id;
      let type = req.user.type;
      let chatList = await this.chatService.getChatList(userId, type);
      if (chatList && chatList.length) {
        return {
          code: 0,
          data: {
            chatList: chatList
          }
        };
      } else {
        return {
          code: 0,
          data: {
            chatList: []
          }
        };
      }

    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }
}
