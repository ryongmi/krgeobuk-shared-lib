import { ApiQuery } from '@nestjs/swagger';

import type { SwaggerApiQueryOptions } from '../interface/index.js';

/**
 *
 * @param name Query 이름
 * @param type Query 타입
 * @param description Query 설명
 * @param required Query 필요 유무
 * @returns
 */
export const SwaggerApiQuery = (
  param: SwaggerApiQueryOptions
): MethodDecorator & ClassDecorator => {
  const { name, type, description: description = '', required: required = true } = param;

  return ApiQuery({ name, type, description, required });
};
