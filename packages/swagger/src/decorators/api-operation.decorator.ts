import { ApiOperation } from '@nestjs/swagger';
import type { SwaggerApiOperationOptions } from '../interface';

/**
 *
 * @param summary Api 설명
 * @returns
 */
export const SwaggerApiOperation = (param: SwaggerApiOperationOptions): MethodDecorator => {
  const { summary: summary = '' } = param;

  return ApiOperation({ summary });
};
