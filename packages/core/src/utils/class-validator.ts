import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { TransformValidateOptions } from '@krgeobuk/core/src/interfaces';

export async function transformAndValidate<T extends object>(
  option: TransformValidateOptions<T>
): Promise<T> {
  const { cls, plain, excludeExtraneousValues = true, options } = option;

  const instance = plainToInstance(cls, plain, { excludeExtraneousValues });
  await validateOrReject(instance, options);
  return instance;
}
