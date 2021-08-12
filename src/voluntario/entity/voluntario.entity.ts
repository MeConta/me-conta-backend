import { Column } from 'typeorm';
import { DefaultEntity } from '../../default.entity';

export abstract class Voluntario extends DefaultEntity {
  @Column()
  especializacao: string;

  @Column()
  descricao: string;

  @Column()
  instituicao: string;

  @Column()
  aprovado: boolean;
}
