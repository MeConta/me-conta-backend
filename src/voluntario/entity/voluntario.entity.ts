import { Column, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { FrenteAtuacao } from '../../frente-atuacao/entities/frente-atuacao.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

export abstract class Voluntario extends DefaultEntity {
  @Column()
  especializacao: string;

  @Column()
  descricao: string;

  @Column()
  instituicao: string;

  @Column()
  aprovado: boolean;

  @OneToOne(() => Usuario, {
    nullable: false,
  })
  @JoinColumn()
  usuario: Usuario;

  @ManyToMany(() => FrenteAtuacao)
  @JoinTable()
  frentesAtuacao: FrenteAtuacao[];
}
