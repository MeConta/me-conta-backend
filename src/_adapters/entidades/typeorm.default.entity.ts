import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class TypeormDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  dataCriacao: Date;
  @UpdateDateColumn()
  dataAlteracao: Date;
}
