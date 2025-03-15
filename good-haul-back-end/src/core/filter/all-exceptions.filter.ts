/*
 * @FilePath: all-exceptions.filter.ts
 * @Author: Aron
 * @Date: 2024-03-24 22:11:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-25 17:12:05
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log("捕获全局异常：", exception?.response?.message)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      // 如果异常是 HTTP 异常，则直接返回异常的响应
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        //@ts-ignore
        message: exception?.response?.message ? exception?.response?.message : null, //如果自己没设置，那么就返回null让前端设置！
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      // 处理其他类型的异常
      return response.status(500).json({
        statusCode: 500,
        message: null,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
