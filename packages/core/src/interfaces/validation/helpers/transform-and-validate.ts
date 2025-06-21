import { ClassConstructor } from 'class-transformer';
import { ValidatorOptions } from 'class-validator';

export interface TransformValidateOptions<T> {
  cls: ClassConstructor<T>;
  plain: unknown;
  excludeExtraneousValues?: boolean;
  options?: ValidatorOptions;
}
