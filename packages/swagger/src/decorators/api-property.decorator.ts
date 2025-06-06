import { ApiProperty } from '@nestjs/swagger';
import { SwaagerApiPropertyDto } from '../dtos';

/**
 *
 * @param tags Api 제목
 * @returns
 */
export const SwaagerApiProperty = (param: SwaagerApiPropertyDto): PropertyDecorator => {
  return ApiProperty(param);
};
