import { ApiBody } from '@nestjs/swagger';

import type { SwaggerApiBodyOptions } from '../interface/index.js';

/**
 *
 * @param dto Body에 사용된 dto
 * @param description Body 설명
 * @param required Body 필요 유무
 * @returns
 */
export const SwaggerApiBody = (param: SwaggerApiBodyOptions): MethodDecorator => {
  const { dto: type, description: description = '', required: required = true } = param;

  return ApiBody({ type, description, required });
};
