import { Column, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { FrenteAtuacao } from '../../frente-atuacao/entities/frente-atuacao.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

export abstract class Voluntario extends DefaultEntity {
  @Column({
    nullable: true,
  })
  especializacao: string;

  @Column({
    nullable: true,
  })
  crp?: string;

  @Column()
  descricao: string;

  @Column()
  instituicao: string;

  @Column({
    nullable: true,
  })
  aprovado: boolean;

  @OneToOne(() => Usuario, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  usuario: Usuario;

  @ManyToMany(() => FrenteAtuacao, {
    eager: true,
  })
  @JoinTable()
  frentesAtuacao: FrenteAtuacao[];
}
