import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class DefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @Exclude()
  dataCriacao!: Date;

  @UpdateDateColumn()
  @Exclude()
  dataAlteracao!: Date;

  @DeleteDateColumn()
  @Exclude()
  dataExclusao?: Date;

  constructor(partial: Partial<DefaultEntity>) {
    Object.assign(this, partial);
  }
}
