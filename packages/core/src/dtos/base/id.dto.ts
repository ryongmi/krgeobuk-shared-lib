import { TimestampDto } from '@krgeobuk/core/src/dtos';
import { IsValidUuidId, IsValidAutoIncrementId } from '@krgeobuk/core/src/decorators';
import {
  AutoIncrementId,
  OptionalAutoIncrementId,
  UuidId,
  OptionalUuidId,
} from '@krgeobuk/core/src/interfaces';

export abstract class AutoIncrementIdDto extends TimestampDto implements AutoIncrementId {
  @IsValidAutoIncrementId({ isOptional: false, isExpose: false })
  id!: number;
}

export abstract class OptionalAutoIncrementIdDto
  extends TimestampDto
  implements OptionalAutoIncrementId
{
  @IsValidAutoIncrementId({ isOptional: true, isExpose: false })
  id?: number;
}

export abstract class UuidIdDto extends TimestampDto implements UuidId {
  @IsValidUuidId({ isOptional: false, isExpose: false })
  id!: string;
}

export abstract class OptionalUuidIdDto extends TimestampDto implements OptionalUuidId {
  @IsValidUuidId({ isOptional: true, isExpose: false })
  id?: string;
}
