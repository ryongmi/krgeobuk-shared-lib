import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiTagsOptions } from '../interface/index.js';

/**
 *
 * @param tags Api 제목
 * @returns
 */
export const SwaggerApiTags = (param: SwaggerApiTagsOptions): ClassDecorator => {
  const { tags: tags = [] } = param;

  return ApiTags(...tags);
};
