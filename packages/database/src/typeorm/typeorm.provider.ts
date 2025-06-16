import { type TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function createTypeOrmConfig(entityPaths: string[]): TypeOrmModuleAsyncOptions {
  return {
    useFactory: (configService: ConfigService) => ({
      namingStrategy: new SnakeNamingStrategy(),
      type: 'mysql',
      host: configService.get<string>('db-mysql.host'),
      port: configService.get<number>('db-mysql.port'),
      username: configService.get<string>('db-mysql.username'),
      password: configService.get<string>('db-mysql.password'),
      database: configService.get<string>('db-mysql.name'),
      synchronize: configService.get<boolean>('db-mysql.synchronize'),
      logging: configService.get<boolean>('db-mysql.logging'),
      entities: entityPaths,
      migrations: [configService.get<string>('db-mysql.migrations') || 'dist/migrations/*.js'],
      timezone: configService.get<string>('db-mysql.timezone') || '+09:00',
      charset: configService.get<string>('db-mysql.charset') || 'utf8mb4',
      autoLoadEntities: true,
    }),
    inject: [ConfigService],
  };
}
