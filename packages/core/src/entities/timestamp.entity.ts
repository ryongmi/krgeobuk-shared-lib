import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export abstract class TimestampEntity {
  @CreateDateColumn({ type: "datetime", precision: 6 })
  createdAt!: Date;

  @UpdateDateColumn({ type: "datetime", precision: 6 })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "datetime", precision: 6 })
  deletedAt?: Date | null;
}
