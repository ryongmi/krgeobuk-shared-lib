import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { SwaggerApiPropertyOptions } from '@krgeobuk/swagger/src/interface';

/**
 *
 * @param tags Api 제목 - 필수
 * @returns
 */
export const SwaggerApiProperty = (param: SwaggerApiPropertyOptions): PropertyDecorator => {
  return ApiProperty({ ...param, required: param.required ?? true });
};

/**
 *
 * @param tags Api 제목 - 옵션
 * @returns
 */
export const SwaggerApiPropertyOptional = (param: SwaggerApiPropertyOptions): PropertyDecorator => {
  return ApiPropertyOptional({ ...param, required: param.required ?? false });
};
