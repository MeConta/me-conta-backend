import { DefaultEntity } from '../../../src/default.entity';
import { Column, Entity } from 'typeorm';

@Entity('frente-atuacao')
export class FrenteAtuacao extends DefaultEntity {
  @Column()
  nome: string;

  @Column()
  descricao: string;
}
