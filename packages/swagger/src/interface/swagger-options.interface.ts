import type { INestApplication } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';

export interface SwaggerOptions {
  app: INestApplication;
  configService: ConfigService<unknown, boolean>;
}
