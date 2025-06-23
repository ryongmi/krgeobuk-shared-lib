import { Module, type DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createRedisProvider } from './redis.provider.js';

@Module({})
export class SharedRedisModule {
  static register(token = 'REDIS_CLIENT'): DynamicModule {
    const provider = createRedisProvider(token);
    return {
      module: SharedRedisModule,
      imports: [ConfigModule],
      providers: [provider],
      exports: [token], // <-- 토큰 문자열로 변경
    };
  }
}
