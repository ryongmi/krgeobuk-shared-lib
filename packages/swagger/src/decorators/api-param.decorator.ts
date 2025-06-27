import { ApiParam } from '@nestjs/swagger';
import type { SwaggerApiParamOptions } from '../interface/index.js';

/**
 *
 * @param name 경로 파라미터 이름
 * @param type Param 타입
 * @param description Param 설명
 * @param required 필수 여부 (기본 true)
 * @param example 예시 값
 * @returns
 */
export const SwaggerApiParam = (param: SwaggerApiParamOptions): MethodDecorator => {
  const {
    name,
    type,
    description: description = '',
    required: required = true,
    example: example = '',
  } = param;

  return ApiParam({ name, type, description, required, example });
};
