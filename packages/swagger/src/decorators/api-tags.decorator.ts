import { ApiTags } from '@nestjs/swagger';
import { SwaagerApiTagsDto } from '../dtos';

/**
 *
 * @param tags Api 제목
 * @returns
 */
export const SwaagerApiTags = (param: SwaagerApiTagsDto): MethodDecorator => {
  const { tags } = param;

  return ApiTags(...tags);
};
