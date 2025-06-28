import { TimestampDto } from './timestamp.dto.js';
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

export abstract class AutoIncrementIdDto extends TimestampDto implements AutoIncrementId {
  @IsValidAutoIncrementId({ isOptional: false })
  id!: number;
}

export abstract class ExposeAutoIncrementIdDto
  extends TimestampDto
  implements OptionalAutoIncrementId
{
  @ExposeAutoIncrementId()
  id?: number;
}

export abstract class OptionalAutoIncrementIdDto
  extends TimestampDto
  implements OptionalAutoIncrementId
{
  @IsValidAutoIncrementId({ isOptional: true })
  id?: number;
}

export abstract class UuidIdDto extends TimestampDto implements UuidId {
  @IsValidUuidId({ isOptional: false })
  id!: string;
}

export abstract class ExposeUuidIdDto extends TimestampDto implements OptionalUuidId {
  @ExposeUuidId()
  id?: string;
}

export abstract class OptionalUuidIdDto extends TimestampDto implements OptionalUuidId {
  @IsValidUuidId({ isOptional: true })
  id?: string;
}
