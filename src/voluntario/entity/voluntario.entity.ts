import { Column, JoinTable, ManyToMany } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { FrenteAtuacao } from '../../frente-atuacao/entities/frente-atuacao.entity';

export abstract class Voluntario extends DefaultEntity {
  @Column()
  especializacao: string;

  @Column()
  descricao: string;

  @Column()
  instituicao: string;

  @Column()
  aprovado: boolean;

  @ManyToMany(() => FrenteAtuacao)
  @JoinTable()
  frentesAtuacao: FrenteAtuacao[];
}
