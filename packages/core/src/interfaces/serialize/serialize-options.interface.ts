import { ClassConstructor } from 'class-transformer';

export interface SerializeOptions<T = unknown> {
  dto?: ClassConstructor<T>;
  message?: string;
}
