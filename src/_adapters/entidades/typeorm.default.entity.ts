import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class TypeormDefaultEntity {
  @CreateDateColumn()
  @Exclude()
  dataCriacao: Date;

  @UpdateDateColumn()
  @Exclude()
  dataAlteracao: Date;

  @DeleteDateColumn()
  @Exclude()
  dataExclusao: Date;
}
