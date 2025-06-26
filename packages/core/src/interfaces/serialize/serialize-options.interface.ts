import { ClassConstructor } from 'class-transformer';

export interface SerializeOptions<T = unknown> {
  code?: string;
  message?: string;
  dto?: ClassConstructor<T>;
}
