import { ApiBearerAuth } from '@nestjs/swagger';
import { SWAGGER_AUTH_NAME } from '../constants/index.js';

/**
 * Swagger 인증 헤더 설정 데코레이터
 * - 기본 인증 스키마: Bearer + access-token
 */
export const SwaggerApiBearerAuth = (): MethodDecorator => {
  return ApiBearerAuth(SWAGGER_AUTH_NAME);
};
