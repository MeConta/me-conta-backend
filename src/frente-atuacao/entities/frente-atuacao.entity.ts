import { DefaultEntity } from '../../default.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('frente-atuacao')
export class FrenteAtuacao extends DefaultEntity {
  @Column()
  nome: string;

  @Column()
  descricao: string;
}
