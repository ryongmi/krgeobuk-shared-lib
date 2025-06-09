import {
  IsValidCreatedAt,
  IsValidUpdatedAt,
  IsValidDeletedAt,
} from '@krgeobuk/core/src/decorators';
import { Timestamp } from '@krgeobuk/core/src/interfaces';

export abstract class TimestampDto implements Timestamp {
  @IsValidCreatedAt({ isOptional: true, isExpose: true })
  createdAt?: Date;

  @IsValidUpdatedAt({ isOptional: true, isExpose: true })
  updatedAt?: Date;

  @IsValidDeletedAt({ isOptional: true, isExpose: false })
  deletedAt?: Date | null;
}
