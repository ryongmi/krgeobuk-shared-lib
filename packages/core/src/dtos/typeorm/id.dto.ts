import { TimestampDto } from '../../dtos';
import {
  IsValidUuidId,
  IsValidAutoIncrementId,
  ExposeAutoIncrementId,
  ExposeUuidId,
} from '../../decorators';
import type {
  AutoIncrementId,
  OptionalAutoIncrementId,
  UuidId,
  OptionalUuidId,
} from '../../interfaces';

export abstract class AutoIncrementIdDto extends TimestampDto implements AutoIncrementId {
  @IsValidAutoIncrementId({ isOptional: false })
  id!: number;
}

export abstract class ExposeAutoIncrementIdDto extends TimestampDto implements AutoIncrementId {
  @ExposeAutoIncrementId()
  id!: number;
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

export abstract class ExposeUuidIdDto extends TimestampDto implements UuidId {
  @ExposeUuidId()
  id!: string;
}

export abstract class OptionalUuidIdDto extends TimestampDto implements OptionalUuidId {
  @IsValidUuidId({ isOptional: true })
  id?: string;
}
