import { SetMetadata, UseInterceptors } from '@nestjs/common';

import { SERIALIZE_META_KEY } from '../../constants/index.js';
import { SerializerInterceptor } from '../../interceptors/index.js';
import { SerializeOptions } from '../../interfaces/index.js';

export function Serialize(options: SerializeOptions): MethodDecorator {
  // return function (target: object, key: string | symbol, descriptor: PropertyDescriptor) {
  //   SetMetadata(SERIALIZE_META_KEY, options)(target, key, descriptor);
  //   UseInterceptors(SerializerInterceptor)(target, key, descriptor);
  // };

  const setMeta = SetMetadata(SERIALIZE_META_KEY, options);
  const useInterceptor = UseInterceptors(SerializerInterceptor);

  return function (target: object, key: string | symbol, descriptor: PropertyDescriptor) {
    setMeta(target, key, descriptor);
    useInterceptor(target, key, descriptor);
  };
}
