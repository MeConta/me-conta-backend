import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
