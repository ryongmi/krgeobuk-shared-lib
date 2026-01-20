import {
  IsValidUuidId,
  IsValidAutoIncrementId,
  ExposeAutoIncrementId,
  ExposeUuidId,
} from '../../decorators/index.js';
import type {
  AutoIncrementId,
  OptionalAutoIncrementId,
  UuidId,
  OptionalUuidId,
} from '../../interfaces/index.js';

import { TimestampDto } from './timestamp.dto.js';

export abstract class AutoIncrementIdDto extends TimestampDto implements AutoIncrementId {
  @IsValidAutoIncrementId()
  id!: number;
}

export abstract class OptionalAutoIncrementIdDto
  extends TimestampDto
  implements OptionalAutoIncrementId
{
  @IsValidAutoIncrementId({ isOptional: true })
  id?: number;
}

export abstract class ExposeAutoIncrementIdDto extends TimestampDto implements AutoIncrementId {
  @ExposeAutoIncrementId()
  id!: number;
}

export abstract class ExposeOptionalAutoIncrementIdDto
  extends TimestampDto
  implements OptionalAutoIncrementId
{
  @ExposeAutoIncrementId()
  id?: number;
}

export abstract class UuidIdDto extends TimestampDto implements UuidId {
  @IsValidUuidId()
  id!: string;
}

export abstract class OptionalUuidIdDto extends TimestampDto implements OptionalUuidId {
  @IsValidUuidId({ isOptional: true })
  id?: string;
}

export abstract class ExposeUuidIdDto extends TimestampDto implements UuidId {
  @ExposeUuidId()
  id!: string;
}

export abstract class ExposeOptionalUuidIdDto extends TimestampDto implements OptionalUuidId {
  @ExposeUuidId()
  id?: string;
}
