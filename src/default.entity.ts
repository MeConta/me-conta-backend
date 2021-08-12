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
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAlteracao!: Date;

  @DeleteDateColumn()
  dataExclusao?: Date;
}
