import { ApiQuery } from '@nestjs/swagger';
import { SwaagerApiQueryDto } from '../dtos';

/**
 *
 * @param name Query 이름
 * @param type Query 타입
 * @param description Query 설명
 * @param required Query 필요 유무
 * @returns
 */
export const SwaagerApiQuery = (param: SwaagerApiQueryDto): MethodDecorator & ClassDecorator => {
  const { name, type, description, required } = param;

  return ApiQuery({ name, type, description, required });
};
