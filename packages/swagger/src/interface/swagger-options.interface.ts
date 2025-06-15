import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface SwaggerOptions {
  app: INestApplication;
  configService: ConfigService<unknown, boolean>;
}
