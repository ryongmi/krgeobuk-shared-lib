import { PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from './timestamp.entity.js';

export abstract class BaseEntityIncrement extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}

export abstract class BaseEntityUUID extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}
