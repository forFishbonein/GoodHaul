// redis.module.ts
import IORedis from 'ioredis';
export const redisProviders = [
  {
    provide: 'REDIS_CLIENT',
    useFactory: () => {
      return new IORedis({
        host: '8.130.52.237',
        port: 6379,
        // 如果 Redis 设置了密码，可以在这里设置密码
        password: '183183',
        // 设置连接池参数
        connectionName: 'goodHaulRedis', // 连接名称（可选）
        retryStrategy: (times) => Math.min(times * 50, 2000), // 重试策略函数
        enableOfflineQueue: true, // 启用离线队列
        autoResubscribe: true, // 自动重新订阅
        keepAlive: 1000, // TCP keepalive（毫秒）
        lazyConnect: false, // 延迟连接
        enableReadyCheck: true, // 启用 ready check
        maxRetriesPerRequest: 3, // 每个请求的最大重试次数
      });
    },
  },
]
