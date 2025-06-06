import { ApiOperation } from '@nestjs/swagger';
import { SwaagerApiOperationDto } from '../dtos';

/**
 *
 * @param summary Api 설명
 * @returns
 */
export const SwaagerApiOperation = (param: SwaagerApiOperationDto): MethodDecorator => {
  const { summary } = param;

  return ApiOperation({ summary });
};
