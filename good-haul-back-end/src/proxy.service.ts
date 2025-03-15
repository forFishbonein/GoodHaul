/*
 * @FilePath: proxy.service.ts
 * @Author: Aron
 * @Date: 2024-03-27 15:58:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-27 16:25:07
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
// proxy.service.ts

import { Injectable } from '@nestjs/common';
import * as http from 'http';

@Injectable()
export class ProxyService {
  async startProxyServer(): Promise<void> {
    const server = http.createServer((cReq: any, cSock: any) => { //前面是请求对象，后面是响应对象！
      // console.log(cSock)
      // console.log(cReq)
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: cReq.url,
        method: cReq.method,
        headers: cReq.headers
      };

      const pReq = http.request(options, (pRes) => {
        cSock.writeHead(pRes.statusCode, pRes.headers);
        pRes.pipe(cSock);
      });

      pReq.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
      });

      cSock.on('error', (e) => {
        console.error(`客户端连接错误: ${e.message}`);
      });

      cSock.on('close', () => {
        console.log(`代理服务器：客户端连接已关闭 ${cReq.url}`);
      });

      cReq.pipe(pReq);
    });

    server.listen(8888, () => {
      console.log('代理服务器运行在端口 8888');
    });
  }
}
