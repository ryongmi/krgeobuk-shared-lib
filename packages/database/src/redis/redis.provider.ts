import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';
import { Provider } from '@nestjs/common';

export const createRedisProvider = (token = 'REDIS_CLIENT'): Provider => ({
  provide: token,
  useFactory: async (configService: ConfigService): Promise<Redis> => {
    const options: RedisOptions = {
      host: configService.get<string>('db-redis.host'),
      port: configService.get<number>('db-redis.port') ?? 6379,
      password: configService.get<string>('db-redis.password') || undefined,
      reconnectOnError: (err: Error) => {
        console.log('Redis reconnect error:', err);
        return true;
      },
      connectTimeout: 10000,
    };

    const client = new Redis(options);

    client.on('connect', () => {
      console.log('Redis client connected');
    });

    client.on('error', (err: Error) => {
      console.error('Redis client error:', err);
    });

    return client;
  },
  inject: [ConfigService],
});
