import {
  IsValidCreatedAt,
  IsValidUpdatedAt,
  IsValidDeletedAt,
  ExposeCreatedAt,
  ExposeUpdatedAt,
  ExposeDeletedAt,
} from '@krgeobuk/core/src/decorators';
import type { Timestamp } from '@krgeobuk/core/src/interfaces';

export abstract class TimestampDto implements Timestamp {
  @IsValidCreatedAt({ isOptional: true })
  createdAt?: Date;

  @IsValidUpdatedAt({ isOptional: true })
  updatedAt?: Date;

  @IsValidDeletedAt({ isOptional: true })
  deletedAt?: Date | null;
}

export abstract class ExposeTimestampDto implements Timestamp {
  @ExposeCreatedAt()
  createdAt!: Date;

  @ExposeUpdatedAt()
  updatedAt!: Date;

  @ExposeDeletedAt()
  deletedAt!: Date | null;
}
