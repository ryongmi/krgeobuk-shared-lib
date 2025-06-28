import { Timestamp } from './timestamp.interface.js';

export interface AutoIncrementId extends Timestamp {
  id: number;
}

export interface OptionalAutoIncrementId extends Timestamp {
  id?: number;
}

export interface UuidId extends Timestamp {
  id: string;
}

export interface OptionalUuidId extends Timestamp {
  id?: string;
}
