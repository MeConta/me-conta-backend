import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DefaultEntity {
  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAlteracao!: Date;

  @DeleteDateColumn()
  dataExclusao?: Date;
}
