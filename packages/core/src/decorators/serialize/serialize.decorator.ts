import { SetMetadata } from '@nestjs/common';

import { SERIALIZE_META_KEY } from '../../constants/index.js';
import { SerializeOptions } from '../../interfaces/index.js';

export function Serialize(options: SerializeOptions): MethodDecorator {
  return SetMetadata(SERIALIZE_META_KEY, options);
}
