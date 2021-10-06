import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TypeormDefaultEntity {
  @CreateDateColumn()
  dataCriacao: Date;
  @UpdateDateColumn()
  dataAlteracao: Date;
}
