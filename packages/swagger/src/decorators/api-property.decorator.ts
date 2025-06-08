import { ApiProperty } from '@nestjs/swagger';
import { SwaggerApiPropertyOptions } from '../interface';

/**
 *
 * @param tags Api 제목
 * @returns
 */
export const SwaggerApiProperty = (param: SwaggerApiPropertyOptions): PropertyDecorator => {
  return ApiProperty({ ...param, required: param.required ?? false });
};
