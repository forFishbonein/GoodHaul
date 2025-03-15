import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProxyService } from './proxy.service';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const proxyService = app.get(ProxyService);
  // await proxyService.startProxyServer(); //这里代理服务器不知道有没有具体作用，暂时先这样用！
  // 允许来自所有来源的跨域请求，必须要配置！
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors();
  await app.listen(3000);
  console.log('nest服务器运行在端口 3000');
}
bootstrap();
