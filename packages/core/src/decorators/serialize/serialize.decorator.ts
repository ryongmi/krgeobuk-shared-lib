import { SetMetadata, UseInterceptors } from '@nestjs/common';

import { SERIALIZE_META_KEY } from '../../constants';
import { SerializerInterceptor } from '../../interceptors';
import { SerializeOptions } from '../../interfaces';

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
